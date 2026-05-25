import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const PRICING_DOC = doc(db, "pricing", "data");

export async function GET() {
  try {
    const snapshot = await getDoc(PRICING_DOC);
    if (!snapshot.exists()) {
      return NextResponse.json(
        { error: "Pricing data not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(snapshot.data());
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read pricing data" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    await setDoc(PRICING_DOC, data);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update pricing data" },
      { status: 500 },
    );
  }
}
