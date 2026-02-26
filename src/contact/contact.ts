// src/controllers/classContactController.ts
import { Request, Response, NextFunction } from 'express';
import { Resend } from 'resend';

const RESEND_API_KEY='re_XwjNRoo1_gyVPt66wQef41cVRhX7MTMLV'
const resend = new Resend(RESEND_API_KEY); 

async function sendResendOtpMain(fullName:string,businessName:string,country:string,phoneNumber:string,
  email:string,reason:string,statement:string): Promise<void> {
  try {
    await resend.emails.send({
      from: 'admin@infobeatlive.com',
      to: 'infobeatlive@gmail.com',
      subject:`New Message From ${fullName}`,
      html: `
       <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Message From ${fullName}</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 0;
      }
      .container {
        background-color: #ffffff;
        max-width: 600px;
        margin: 30px auto;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 0 10px rgba(0,0,0,0.05);
      }
      .header {
        background-color: #599334;
        color: #ffffff;
        padding: 30px;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .body {
        padding: 30px;
        color: #333333;
        line-height: 1.6;
      }
      .footer {
        background-color: #f1f1f1;
        text-align: center;
        padding: 15px;
        font-size: 13px;
        color: #888;
      }
      .button {
        display: inline-block;
        margin-top: 20px;
        background-color: #599334;
        color: #ffffff !important;
        padding: 12px 25px;
        text-decoration: none;
        border-radius: 5px;
      }
      .signature {
        margin-top: 25px;
        font-style: italic;
        color: #555;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>The Contact Reason: ${reason}</h1>
      </div>
      <div class="body">

        <p>Here is the client details,</p>

        <p>Full Name: ${fullName}</p>
        <p>Business Name: ${businessName}</p>
        <p>Country: ${country}</p>
        <p>Phone Number: ${phoneNumber}</p>
        <p>Email: ${email}</p>
        <p>Reason: ${reason}</p>
        <p>Message: ${statement}</p>

        <a href="https://www.infobeatlive.com" class="button">Visit Our Website</a>
        <p class="signature">Warm regards,<br />
        The Infobeatlive Team</p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} InfoBeatLive Agency. All rights reserved.<br/>
        <a href="https://www.infobeatlive.com">InfoBeatLive</a>
      </div>
    </div>
  </body>
  </html>`,});
    console.log(`Resend: OTP email sent to ${email}`);
  } catch (error) {
    console.error('Resend email error:', error);
    throw new Error('Failed to send OTP via Resend');
  }
}

export class ClassContactController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const contactData = req.body; 
      await sendResendOtpMain(contactData.fullName, contactData.businessName, contactData.country,
      contactData.phoneNumber, contactData.email, contactData.reason, contactData.statement);
      res.status(201).json({  success:true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success:false, error:'Failed to create contact message.' });
    }
  }}

export default new ClassContactController();