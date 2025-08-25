import nodemailer from 'nodemailer';

export async function GET() {
    return new Response(JSON.stringify({ message: 'Contact API is working' }), { status: 200 });
}

export async function POST(request: Request) {
    try {
        // Basic origin validation (commented out for now)
        // const origin = request.headers.get('origin') || request.headers.get('referer');
        // if (origin && !origin.includes('smartspicks.com')) {
        //     return new Response(JSON.stringify({ error: 'Access denied' }), { status: 403 });
        // }

        if (request.method !== 'POST') {
            return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
        }

        const { name, email, subject, message } = await request.json();

        // Validate required fields
        if (!name) {
            return new Response(JSON.stringify({ message: 'Name is required' }), { status: 400 });
        }
        if (!email) {
            return new Response(JSON.stringify({ message: 'Email is required' }), { status: 400 });
        }
        if (!subject) {
            return new Response(JSON.stringify({ message: 'Subject is required' }), { status: 400 });
        }
        if (!message) {
            return new Response(JSON.stringify({ message: 'Message is required' }), { status: 400 });
        }

        // Create transporter using Gmail SMTP
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'smartspicks@gmail.com',
                pass: 'udzz ebqe kvbn hozi',
            },
        });

        // Email body
        const mailBody = `
            Contact Form: SmartsPicks
            Website: https://smartspicks.com

            Name: ${name}
            Email: ${email}
            Subject: ${subject}

            Message:
            ${message}
        `;

        // Send email
        await transporter.sendMail({
            from: 'smartspicks@gmail.com',
            to: 'smartspicks@gmail.com',
            subject: `Contact Form: ${subject}`,
            text: mailBody,
        });

        return new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 });

    } catch (error: any) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ error: 'Error sending email' }), { status: 500 });
    }
}