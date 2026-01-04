// components/email-template.tsx
import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Preview,
	Section,
	Text,
	Hr,
} from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
	message: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ message }) => {
	return (
		<Html>
			<Head />
			<Preview>Notification from Edunation</Preview>
			<Body style={main}>
				<Container style={container}>
					<Section style={header}>
						<Heading style={heading}>Edunation</Heading>
					</Section>
					<Section style={content}>
						<Text style={text}>{message}</Text>
					</Section>
					<Hr style={hr} />
					<Section style={footer}>
						<Text style={footerText}>
							This is an automated email from Edunation.
						</Text>
						<Text style={footerText}>
							Please do not reply to this email.
						</Text>
						<Text style={footerText}>
							&copy; {new Date().getFullYear()} Edunation. All
							rights reserved.
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};

// Styles
const main = {
	backgroundColor: "#f6f9fc",
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
	padding: "20px",
};

const container = {
	backgroundColor: "#ffffff",
	margin: "0 auto",
	maxWidth: "600px",
	borderRadius: "8px",
	overflow: "hidden",
	boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const header = {
	background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
	padding: "30px",
	textAlign: "center" as const,
};

const heading = {
	color: "#ffffff",
	fontSize: "24px",
	fontWeight: "600",
	margin: "0",
};

const content = {
	padding: "40px 30px",
};

const text = {
	fontSize: "16px",
	lineHeight: "1.8",
	color: "#333333",
	margin: "0 0 20px 0",
};

const hr = {
	borderColor: "#e9ecef",
	margin: "0",
};

const footer = {
	backgroundColor: "#f8f9fa",
	padding: "20px 30px",
	textAlign: "center" as const,
};

const footerText = {
	fontSize: "12px",
	color: "#6c757d",
	margin: "5px 0",
};
