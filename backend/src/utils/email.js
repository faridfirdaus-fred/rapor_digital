import nodemailer from 'nodemailer';

// Email configuration
const EMAIL_HOST = process.env.EMAIL_HOST || 'smtp.gmail.com';
const EMAIL_PORT = process.env.EMAIL_PORT || 587;
const EMAIL_USER = process.env.EMAIL_USER || '';
const EMAIL_PASS = process.env.EMAIL_PASS || '';
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@rapordigital.com';

// Create transporter
const createTransporter = () => {
  // For development, use ethereal email (test email service)
  if (!EMAIL_USER || !EMAIL_PASS) {
    console.warn('⚠️  Email credentials not configured. Using test mode.');
    return null;
  }

  return nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: false,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
};

export const sendResetPasswordEmail = async (email, resetToken) => {
  const transporter = createTransporter();

  // If no transporter (test mode), just log
  if (!transporter) {
    console.log('\n📧 Reset Password Email (Test Mode)');
    console.log('To:', email);
    console.log('Reset Token:', resetToken);
    console.log('Reset Link:', `http://localhost:5174/reset-password?token=${resetToken}`);
    console.log('\nCopy token ini untuk reset password:\n', resetToken);
    return { success: true, message: 'Email would be sent (test mode)', token: resetToken };
  }

  const resetUrl = `http://localhost:5174/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: EMAIL_FROM,
    to: email,
    subject: 'Reset Password - Rapor Digital',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: #2563eb; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎓 Rapor Digital</h1>
              <p>Reset Password Request</p>
            </div>
            <div class="content">
              <h2>Hello!</h2>
              <p>You requested to reset your password. Click the button below to reset it:</p>
              <a href="${resetUrl}" class="button">Reset Password</a>
              <p>Or copy and paste this link in your browser:</p>
              <p style="background: white; padding: 10px; border-radius: 5px; word-break: break-all;">${resetUrl}</p>
              <p><strong>This link will expire in 1 hour.</strong></p>
              <p>If you didn't request this, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>© 2025 Rapor Digital. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Reset Password - Rapor Digital
      
      You requested to reset your password.
      
      Click this link to reset your password:
      ${resetUrl}
      
      This link will expire in 1 hour.
      
      If you didn't request this, please ignore this email.
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Reset password email sent' };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send reset password email');
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const transporter = createTransporter();

  if (!transporter) {
    console.log('\n📧 Welcome Email (Test Mode)');
    console.log('To:', email);
    console.log('Name:', name);
    return { success: true, message: 'Email would be sent (test mode)' };
  }

  const mailOptions = {
    from: EMAIL_FROM,
    to: email,
    subject: 'Welcome to Rapor Digital!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎓 Rapor Digital</h1>
              <p>Welcome Aboard!</p>
            </div>
            <div class="content">
              <h2>Hello ${name}!</h2>
              <p>Welcome to Rapor Digital - your modern school report management system.</p>
              <p>You can now login and start managing your classes, students, and grades.</p>
              <p><strong>What you can do:</strong></p>
              <ul>
                <li>📚 Manage multiple classes</li>
                <li>👥 Track student information</li>
                <li>📊 Input and manage grades</li>
                <li>🏆 View student rankings</li>
              </ul>
              <p>If you have any questions, feel free to reach out to us.</p>
            </div>
            <div class="footer">
              <p>© 2025 Rapor Digital. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Welcome to Rapor Digital!
      
      Hello ${name}!
      
      Welcome to Rapor Digital - your modern school report management system.
      
      You can now login and start managing your classes, students, and grades.
      
      What you can do:
      - Manage multiple classes
      - Track student information
      - Input and manage grades
      - View student rankings
      
      If you have any questions, feel free to reach out to us.
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Welcome email sent' };
  } catch (error) {
    console.error('Error sending email:', error);
    // Don't throw error for welcome email, just log it
    return { success: false, message: 'Failed to send welcome email' };
  }
};
