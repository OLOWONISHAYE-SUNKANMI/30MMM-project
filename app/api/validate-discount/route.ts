import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";

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

    // Log discount code attempt
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

    // Parse the discount percentage from the discount_type field
    const discountType = codeEntry.discount_type.toString().toUpperCase();
    let discountPercentage;
    let discountMessage;

    switch (discountType) {
      case "25OFF":
        discountPercentage = 25;
        discountMessage = "25% discount applied";
        break;
      case "50OFF":
        discountPercentage = 50;
        discountMessage = "50% discount applied";
        break;
      case "75OFF":
        discountPercentage = 75;
        discountMessage = "75% discount applied";
        break;
      case "FREE":
        discountPercentage = 100;
        discountMessage = "100% discount applied - It's FREE!";
        break;
      default:
        console.error(`Unknown discount_type: ${discountType}`);
        return NextResponse.json(
          { valid: false, message: "Invalid discount configuration" },
          { status: 200 },
        );
    }

    // If all checks pass, update the code usage in the database
    await prisma.discountCode.update({
      where: {
        id: codeEntry.id,
      },
      data: {
        usage_limit: codeEntry.usage_limit - 1,
        current_usage_count: codeEntry.current_usage_count + 1,
      },
    });

    console.log(
      `Successfully applied discount code: ${discountCode} (${discountPercentage}% off)`,
    );

    // Return the widget ID and discount percentage for the valid code
    return NextResponse.json({
      valid: true,
      widgetId: codeEntry.widget_id,
      discountPercentage: discountPercentage,
      discountType: discountType,
      message: `Success! ${discountMessage}`,
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
