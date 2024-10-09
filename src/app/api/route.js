import { connectToDatabase } from "../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        let { db } = await connectToDatabase()
        let menu = await db
            .collection('menu')
            .find({}) 
            .sort({ _id: -1 })
            .toArray()
        return Response.json(menu)
    } catch (error) {
        return NextResponse.json(error)
    }
}
