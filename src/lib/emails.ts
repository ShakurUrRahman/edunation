import nodemailer from "nodemailer";
import { EmailTemplate } from "@/components/email-template";
import { render } from "@react-email/render";

type EmailInfo = {
	to: string;
	subject: string;
	message: string;
};

export async function sendEmails(emailInfo: EmailInfo[]) {
	if (!emailInfo?.length) return [];

	const transporter = nodemailer.createTransport({
		host: "smtp-relay.brevo.com",
		port: 587,
		secure: false,
		auth: {
			user: process.env.BREVO_SMTP_USER!,
			pass: process.env.BREVO_SMTP_KEY!,
		},
	});

	return Promise.allSettled(
		emailInfo.map((data) => {
			// ✅ correct validation
			if (!data.to || !data.subject || !data.message) {
				return Promise.reject(
					new Error(`Invalid email payload: ${JSON.stringify(data)}`)
				);
			}

			const to = data.to;
			const subject = data.subject;
			const message = data.message;

			// ✅ ALWAYS return sendMail
			const sendInfo = transporter.sendMail({
				from: "EduNation <shakururrahman@gmail.com>",
				to: to,
				subject: subject,
				html: message,
			});

			return sendInfo;
		})
	);
}
