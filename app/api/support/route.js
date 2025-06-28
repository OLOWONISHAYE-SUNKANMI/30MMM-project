// File: /app/api/support/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();
    const { issueType, description } = body;

    // Validate the required fields
    if (!description || description.trim() === "") {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 },
      );
    }

    if (!issueType) {
      return NextResponse.json(
        { error: "Issue type is required" },
        { status: 400 },
      );
    }

    // check for env variables for sending email
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Missing email configuration");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter configuration
    await transporter.verify();

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Gmail requires the 'from' to match the authenticated user
      to: process.env.EMAIL_TO,
      subject: "CLEAN: Help Form",
      text: `
            New support request received:
            Issue Type: ${issueType}
        `,
      html: `
          <h1>New Help Form Submission</h1>
          <p><strong>IssueType:</strong> ${issueType}</p>
          <p><strong>Date:</strong> ${new Date(Date.now()).toDateString()}</p>
          <p><strong>Description:</strong> ${description}</p>
        `,
    };

    // send the email
    await transporter.sendMail(mailOptions);

    // Log the request (could be replaced with proper logging in production)
    console.log("Support request received:", { issueType, description });

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Support request submitted successfully",
      // ticketId: ticket.id, // Uncomment if you're creating a ticket
    });
  } catch (error) {
    console.error("Error processing support request:", error);

    // Return error response
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 },
    );
  }
}

// Optional: Handle other HTTP methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
