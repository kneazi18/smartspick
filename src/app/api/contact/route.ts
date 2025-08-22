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
      process.env.NEXT_PUBLIC_SITE_URL || '',
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
      ) || requestOrigin.includes('localhost');

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

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
    
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}