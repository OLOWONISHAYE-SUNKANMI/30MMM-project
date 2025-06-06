import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

// The prisma is imported from @/db, which is a singleton: a single instance of PrismaClient
// This ensures that we don't create multiple connections to the database, which can lead to performance issues.

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { discountCode } = body;

    if (!discountCode) {
      return NextResponse.json(
        { error: "Discount code is required" },
        { status: 400 },
      );
    }

    // Log discount code attempt (would go to monitoring system in production)
    console.log(`Discount code validation attempt: ${discountCode}`);

    // Find the discount code in the database using Prisma
    const codeEntry = await prisma.discountCode.findUnique({
      where: {
        code: discountCode.toUpperCase(),
      },
    });

    // Check if code exists
    if (!codeEntry) {
      console.log(`Invalid discount code attempted: ${discountCode}`);
      return NextResponse.json(
        { valid: false, message: "Invalid discount code" },
        { status: 200 },
      );
    }

    // Check if code has reached usage limit
    if (codeEntry.usage_limit <= 0) {
      console.log(`Discount code ${discountCode} has reached usage limit`);
      return NextResponse.json(
        {
          valid: false,
          message: "This discount code has reached its usage limit",
        },
        { status: 200 },
      );
    }

    // Check if code has expired
    const now = new Date();
    const expirationDate = new Date(codeEntry.expiration_date);

    if (now > expirationDate) {
      console.log(`Discount code ${discountCode} has expired`);
      return NextResponse.json(
        { valid: false, message: "This discount code has expired" },
        { status: 200 },
      );
    }

    // If all checks pass, update the code usage in the databse
    await prisma.discountCode.update({
      where: {
        id: codeEntry.id,
      },
      data: {
        usage_limit: codeEntry.usage_limit - 1,
        current_usage_count: codeEntry.current_usage_count + 1,
      },
    });

    console.log(`Successfully applied discount code: ${discountCode}`);

    // Return the widget ID and discount percentage for the valid code
    return NextResponse.json({
      valid: true,
      widgetId: codeEntry.widget_id,
      discountPercentage: codeEntry.discount_type,
      message: `Success! ${codeEntry.discount_type} discount applied.`,
    });
  } catch (error) {
    console.error("Error validating discount code:", error);
    return NextResponse.json(
      { error: "Failed to validate discount code" },
      { status: 500 },
    );
  } finally {
    // Always disconnect from the database to prevent connection leaks
    await prisma.$disconnect();
  }
}
