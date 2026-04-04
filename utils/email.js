const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

/**
 * Send a thank you email to a student/organisation after recruitment requisition
 * @param {string} to - Recipient email
 * @param {string} name - Name of the contact person or organisation
 */
exports.sendRecruitmentThankYou = async (to, name) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: to,
        subject: 'Thank You for Your Recruitment Requisition - Altron Academy',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="color: #e11d48; margin-bottom: 5px;">ALTRON ACADEMY</h1>
                    <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #666; margin-top: 0;">Safety & Security Systems Training</p>
                </div>
                
                <p>Dear <strong>${name}</strong>,</p>
                
                <p>Thank you for submitting your recruitment requisition to Altron Academy. We have received your requirements for skilled professionals in Safety & Security Systems.</p>
                
                <p>Our placement team is already reviewing your request. We will carefully shortlist candidates who match your specific needs and contact you shortly to arrange the interview process.</p>
                
                <div style="background-color: #fff1f2; border: 1px solid #fecdd3; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h4 style="margin-top: 0; color: #9f1239;">Important Next Step:</h4>
                    <p style="margin-bottom: 0;">Kindly prepare the requisition information on your <strong>Company Letter Head</strong> with Seal & Signature and email a softcopy to: <a href="mailto:professional@altroneducation.com" style="color: #e11d48; font-weight: bold; text-decoration: none;">professional@altroneducation.com</a></p>
                </div>
                
                <p>If you have any urgent queries, feel free to contact our hotline at <a href="tel:+919841014328" style="color: #e11d48; text-decoration: none; font-weight: bold;">+91 98410 14328</a>.</p>
                
                <p>Best Regards,<br>
                <strong>Placement Cell</strong><br>
                Altron Academy</p>
                
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                
                <p style="font-size: 11px; color: #999; text-align: center;">
                    ALTRON INSTITUTE OF SAFETY & SECURITY TECHNOLOGY<br>
                    Chennai, India.
                </p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Thank you email sent to: ${to}`);
        return true;
    } catch (error) {
        console.error('Error sending recruitment thank you email:', error);
        return false;
    }
};

/**
 * Send a thank you email to a person/organisation after franchise inquiry
 * @param {string} to - Recipient email
 * @param {string} name - Name of the contact person
 */
exports.sendFranchiseThankYou = async (to, name) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: to,
        subject: 'Thank You for Your Franchise Inquiry - Altron Academy',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="color: #e11d48; margin-bottom: 5px;">ALTRON ACADEMY</h1>
                    <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #666; margin-top: 0;">Safety & Security Systems Training</p>
                </div>
                
                <p>Dear <strong>${name}</strong>,</p>
                
                <p>Thank you for your interest in partnering with Altron Academy. We have received your inquiry regarding starting your own academy/franchise.</p>
                
                <p>Our business development team is excited to explore this opportunity with you. We are currently reviewing your details and will get in touch with you shortly to discuss the next steps and provide you with more information about our franchise model.</p>
                
                <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <h4 style="margin-top: 0; color: #0369a1;">What to Expect Next:</h4>
                    <p style="margin-bottom: 0;">One of our franchise consultants will reach out to you via call or email within the next 24-48 hours for an initial discussion.</p>
                </div>
                
                <p>If you have any immediate questions, please feel free to contact our franchise support desk at <a href="tel:+919841014328" style="color: #e11d48; text-decoration: none; font-weight: bold;">+91 98410 14328</a>.</p>
                
                <p>Best Regards,<br>
                <strong>Business Development Team</strong><br>
                Altron Academy</p>
                
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                
                <p style="font-size: 11px; color: #999; text-align: center;">
                    ALTRON INSTITUTE OF SAFETY & SECURITY TECHNOLOGY<br>
                    Chennai, India.
                </p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Franchise thank you email sent to: ${to}`);
        return true;
    } catch (error) {
        console.error('Error sending franchise thank you email:', error);
        return false;
    }
};
