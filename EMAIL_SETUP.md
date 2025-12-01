# Email Setup Guide - Anvictol Contact Form

## Summary of Changes

I've set up a complete email system for your contact form. Here's what was implemented:

### 1. **Updated Contact Form** (`components/contact-form.jsx`)

- Changed recipient email to: `ajumobiisaac96@gmail.com`
- Added form validation
- Integrated with backend API for email sending
- Clear error handling and loading states

### 2. **Email API Route** (`app/api/send-email/route.js`)

- Uses **Nodemailer** with Gmail SMTP
- Sends two emails:
  - **Admin notification** to your configured email (ajumobiisaac96@gmail.com)
  - **User confirmation** to the person who submitted the form
- Professional HTML email templates with branding
- Includes user's message echo-back for confirmation

### 3. **Dependencies Installed**

- `nodemailer` - Server-side email sending

## ⚠️ CRITICAL: Setup Instructions

To get emails working, you MUST configure your Gmail account:

### Step 1: Enable 2-Factor Authentication

1. Go to https://myaccount.google.com/security
2. Click on "2-Step Verification"
3. Follow the steps to enable it

### Step 2: Generate an App Password

1. Go back to https://myaccount.google.com/security
2. Look for "App passwords" (appears only after 2FA is enabled)
3. Select "Mail" and "Windows Computer"
4. Google will generate a 16-character password
5. **Copy this password**

### Step 3: Configure Your Environment

1. Edit `.env.local` in your project root:

   ```
   EMAIL_USER=ajumobiisaac96@gmail.com
   EMAIL_PASSWORD=your_16_character_app_password_here
   ```

2. **Replace `your_16_character_app_password_here`** with the actual password from Step 2

### Step 4: Test It

1. Run your development server: `npm run dev`
2. Fill out the contact form
3. Submit the form
4. Check your email (ajumobiisaac96@gmail.com) for the submission

## Email Features

✅ **Admin Receives:**

- Sender's name, email, and message
- Professional HTML formatted email
- Reply-To field set to sender's email (easy to reply)

✅ **User Receives:**

- Confirmation that message was received
- Echo of their message back to them
- 24-hour response time commitment
- Contact phone number for urgent matters

✅ **Error Handling:**

- Clear error messages if configuration is missing
- Validation of all form fields
- Loading state while sending

## Troubleshooting

**Issue:** "Failed to send email. Please ensure EMAIL_PASSWORD is set in environment variables."

- **Solution:** Make sure `.env.local` exists and EMAIL_PASSWORD is set correctly

**Issue:** Gmail still blocks the connection

- **Solution:** Go to https://myaccount.google.com/apppasswords and make sure you're generating the password correctly

**Issue:** Password keeps failing

- **Solution:** Make sure you're using the 16-character App Password, NOT your regular Gmail password

## File Locations

- Contact Form: `/components/contact-form.jsx`
- Email API: `/app/api/send-email/route.js`
- Config: `/.env.local`

That's it! Your email system is ready to go once you add the App Password to `.env.local` 🎉
