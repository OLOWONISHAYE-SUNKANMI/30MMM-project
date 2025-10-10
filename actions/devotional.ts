"use server";

import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function getDevotionalById(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db("devotionalData");

    const devotional = await db
      .collection("devotions")
      .findOne({ _id: new ObjectId(id) });

    if (!devotional) {
      return { success: false, error: "Devotional not found" };
    }

    return {
      success: true,
      devotional: JSON.parse(JSON.stringify(devotional)),
    };
  } catch (error) {
    console.error("Error fetching devotional:", error);
    return { success: false, error: error.message };
  }
}
