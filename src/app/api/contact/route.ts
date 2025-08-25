import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}

// Rate limiting storage (in production, use Redis or database)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 3; // Max 3 requests per IP per 15 minutes

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown';
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userRequests = rateLimitMap.get(ip) || [];
  
  // Remove expired requests
  const validRequests = userRequests.filter((timestamp: number) => now - timestamp < RATE_LIMIT_WINDOW);
  
  if (validRequests.length >= MAX_REQUESTS) {
    return true;
  }
  
  // Add current request
  validRequests.push(now);
  rateLimitMap.set(ip, validRequests);
  
  return false;
}

function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: urls
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request);
    console.log(`Contact form request from IP: ${clientIP}`);
    
    // In development, be more lenient with rate limiting
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    // Check rate limiting (more lenient in development)
    if (!isDevelopment && isRateLimited(clientIP)) {
      console.log(`Rate limited IP: ${clientIP}`);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Validate origin (more lenient in development)
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');
    console.log(`Request origin: ${origin}, referer: ${referer}`);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'https://localhost:3000',
      'https://smartspicks.com',
      'https://www.smartspicks.com',
      process.env.NEXT_PUBLIC_SITE_URL || '',
      process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    ].filter(Boolean);

    // In development, be more lenient with origin validation
    if (!isDevelopment) {
      if (!origin && !referer) {
        console.log('Blocked: No origin or referer header');
        return NextResponse.json(
          { error: 'Invalid request origin' },
          { status: 403 }
        );
      }

      const requestOrigin = origin || referer || '';
      const isAllowedOrigin = allowedOrigins.some(allowed => 
        requestOrigin.startsWith(allowed)
      ) || requestOrigin.includes('localhost') 
        || requestOrigin.includes('smartspicks.com')
        || requestOrigin.includes('vercel.app')
        || requestOrigin.includes('netlify.app');

      if (!isAllowedOrigin) {
        console.log(`Blocked request from origin: ${requestOrigin}`);
        return NextResponse.json(
          { error: 'Invalid request origin' },
          { status: 403 }
        );
      }
    }

    const body: ContactFormData = await request.json();
    const { name, email, subject, message, honeypot } = body;
    console.log('Form data received:', { name, email, subject, message: message.substring(0, 50) + '...' });

    // Check honeypot field (should be empty for humans)
    if (honeypot && honeypot.trim() !== '') {
      console.log('Blocked: Honeypot filled');
      return NextResponse.json(
        { error: 'Invalid submission' },
        { status: 403 }
      );
    }

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log('Blocked: Missing required fields');
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      console.log('Blocked: Invalid email format');
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedMessage = sanitizeInput(message);

    // Additional validation after sanitization
    if (!sanitizedName || !sanitizedEmail || !sanitizedSubject || !sanitizedMessage) {
      console.log('Blocked: Invalid input after sanitization');
      return NextResponse.json(
        { error: 'Invalid input detected' },
        { status: 400 }
      );
    }

    // Check for suspicious content (only in production)
    if (!isDevelopment) {
      const suspiciousPatterns = [
        /viagra/i, /cialis/i, /pharmacy/i, /casino/i, /lottery/i,
        /bitcoin/i, /crypto/i, /investment/i, /loan/i, /debt/i,
        /click here/i, /urgent/i, /congratulations/i, /winner/i,
        /<script/i, /javascript:/i, /onclick/i, /onerror/i
      ];

      const fullText = `${sanitizedName} ${sanitizedEmail} ${sanitizedSubject} ${sanitizedMessage}`.toLowerCase();
      const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(fullText));

      if (isSuspicious) {
        console.log(`Blocked suspicious content from IP: ${clientIP}`);
        return NextResponse.json(
          { error: 'Message blocked due to suspicious content' },
          { status: 403 }
        );
      }
    }

    console.log('All validations passed, attempting to send email...');
    
    // Check environment variables
    const emailUser = "smartspicks@gmail.com";
    const emailPass = "udzz ebqe kvbn hozi";
    
    if (!emailUser || !emailPass) {
      console.error('Missing email configuration:', {
        EMAIL_USER: emailUser ? 'set' : 'missing',
        EMAIL_PASS: emailPass ? 'set' : 'missing'
      });
      return NextResponse.json(
        { error: 'Email service not configured. Please contact support.' },
        { status: 500 }
      );
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail email
        pass: process.env.EMAIL_PASS, // Your Gmail app password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Email content using sanitized data
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'smartspicks@gmail.com',
      subject: `Contact Form: ${sanitizedSubject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Subject:</strong> ${sanitizedSubject}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><strong>Security Info:</strong></p>
        <p>IP: ${clientIP}</p>
        <p>Origin: ${origin || referer || 'unknown'}</p>
        <p><em>This email was sent from the SmartsPicks contact form</em></p>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${sanitizedName}
        Email: ${sanitizedEmail}
        Subject: ${sanitizedSubject}
        
        Message:
        ${sanitizedMessage}
        
        Security Info:
        IP: ${clientIP}
        Origin: ${origin || referer || 'unknown'}
        
        This email was sent from the SmartsPicks contact form
      `,
    };

    // Send email with retry logic
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully via SMTP');
      return NextResponse.json({ success: true, message: 'Email sent successfully' });
    } catch (smtpError) {
      console.error('SMTP failed, trying fallback method...', smtpError);
      
      // Fallback: Save to file or database (for debugging)
      const fallbackData = {
        timestamp: new Date().toISOString(),
        name: sanitizedName,
        email: sanitizedEmail,
        subject: sanitizedSubject,
        message: sanitizedMessage,
        ip: clientIP,
        origin: origin || referer || 'unknown'
      };
      
      console.log('FALLBACK: Contact form data:', fallbackData);
      
      // You could save to database here or use a webhook service
      // For now, we'll log and throw the original error
      throw smtpError;
    }
    
  } catch (error) {
    console.error('Error sending email:', error);
    
    // More detailed error logging for debugging
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    // Check if it's a specific SMTP/auth error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    let userMessage = 'Failed to send message. Please try again.';
    
    if (errorMessage.includes('auth') || errorMessage.includes('login')) {
      console.error('SMTP Authentication failed - check EMAIL_USER and EMAIL_PASS');
      userMessage = 'Email service configuration error. Please contact support.';
    } else if (errorMessage.includes('connect') || errorMessage.includes('timeout')) {
      console.error('SMTP connection failed - network issue');
      userMessage = 'Network error. Please try again in a few minutes.';
    }
    
    return NextResponse.json(
      { 
        error: userMessage,
        debug: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}