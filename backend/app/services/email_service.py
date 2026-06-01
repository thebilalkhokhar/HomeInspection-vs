import os
from email.message import EmailMessage
from typing import Optional

import aiosmtplib
from pydantic import EmailStr

from app.schemas.quote import QuoteCreate


SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "noreply@homeinspection.com")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
MAIL_FROM = os.getenv("MAIL_FROM", SMTP_USER)
MAIL_FROM_NAME = os.getenv("MAIL_FROM_NAME", "Home Inspection Platform")


def generate_quote_html(quote_data: QuoteCreate, quote_id: Optional[str] = None) -> str:
    """Generate a cleanly formatted HTML email for quote notification."""
    quote_id_text = f"Quote ID: {quote_id}<br>" if quote_id else ""
    services_html = "<ul>" + "".join(f"<li>{service}</li>" for service in quote_data.requested_services) + "</ul>"
    
    html = f"""
    <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
                    📋 New Quote Submission
                </h2>
                
                <h3 style="color: #34495e; margin-top: 20px;">Client Information</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px; font-weight: bold; width: 40%;">Name:</td>
                        <td style="padding: 8px;">{quote_data.client_name}</td>
                    </tr>
                    <tr style="background-color: #ecf0f1;">
                        <td style="padding: 8px; font-weight: bold;">Email:</td>
                        <td style="padding: 8px;"><a href="mailto:{quote_data.client_email}">{quote_data.client_email}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; font-weight: bold;">Phone:</td>
                        <td style="padding: 8px;"><a href="tel:{quote_data.client_phone}">{quote_data.client_phone}</a></td>
                    </tr>
                </table>
                
                <h3 style="color: #34495e; margin-top: 20px;">Property Information</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px; font-weight: bold; width: 40%;">Address:</td>
                        <td style="padding: 8px;">{quote_data.property_address}, {quote_data.property_zip}</td>
                    </tr>
                    <tr style="background-color: #ecf0f1;">
                        <td style="padding: 8px; font-weight: bold;">Square Footage:</td>
                        <td style="padding: 8px;">{quote_data.square_footage:,} sq ft</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; font-weight: bold;">Age Range:</td>
                        <td style="padding: 8px;">{quote_data.property_age_range}</td>
                    </tr>
                </table>
                
                <h3 style="color: #34495e; margin-top: 20px;">Requested Services</h3>
                {services_html}
                
                {f'<h3 style="color: #34495e; margin-top: 20px;">Quote Reference</h3><p>{quote_id_text}</p>' if quote_id else ''}
                
                <p style="margin-top: 30px; font-size: 12px; color: #95a5a6;">
                    This is an automated message. Please do not reply to this email.
                </p>
            </div>
        </body>
    </html>
    """
    return html


async def send_quote_notification(
    quote_data: QuoteCreate,
    recipient_email: EmailStr,
    quote_id: Optional[str] = None,
) -> bool:
    try:
        html_content = generate_quote_html(quote_data, quote_id)

        message = EmailMessage()
        message["Subject"] = f"New Quote Submission - {quote_data.client_name}"
        message["From"] = f"{MAIL_FROM_NAME} <{MAIL_FROM}>"
        message["To"] = str(recipient_email)
        message.set_content("A new quote submission was received.")
        message.add_alternative(html_content, subtype="html")

        await aiosmtplib.send(
            message,
            hostname=SMTP_HOST,
            port=SMTP_PORT,
            username=SMTP_USER,
            password=SMTP_PASSWORD,
            start_tls=True,
        )
        return True
    except Exception as e:
        print(f"Error sending email notification: {str(e)}")
        return False
