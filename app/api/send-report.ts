import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { title, county, details, images, documents } = req.body;

    try {
        // Configure Nodemailer
        let transporter = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST,
            port: parseInt(process.env.NODEMAILER_PORT || "587", 10),
            secure: process.env.NODEMAILER_SECURE === "true", // true for 465, false for other ports
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            },
        });

        // Email content
        let mailOptions = {
            from: `"Report Submission" <${process.env.EMAIL_FROM}>`,
            to: process.env.EMAIL_TO,
            subject: `New Report Submission: ${title}`,
            text: `Project Title: ${title}\nCounty: ${county}\nDetails: ${details}`,
            attachments: [
                images && {
                    filename: images.name,
                    path: images.path,
                },
                documents && {
                    filename: documents.name,
                    path: documents.path,
                },
            ].filter(Boolean),
        };

        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: "Report sent successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error sending report", error });
    }
}
