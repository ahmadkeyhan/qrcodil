import { connectToDatabase } from "../../../lib/mongodb";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req) {
    const url = req.nextUrl.searchParams
    const username = url.get('username')
    try {
        let { db } = await connectToDatabase()
        let menu = await db
            .collection('menu')
            .find({"user" : username}) 
            .sort({ _id: -1 })
            .toArray()
        return Response.json(menu)
    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function POST(req) {
    const url = req.nextUrl.searchParams
    const username = url.get('username')
    const user = await currentUser()
    if (!user || username != user.username) {
        return Response.json('Unauthorized', { status: 401 })
    }
    try {
        let { db } = await connectToDatabase()
        let  menu = await req.json()
        // menu = JSON.parse(menu)
        await db.collection('menu').updateOne({user: menu.user}, {$set:{categories: menu.categories}}, {upsert: true})
        console.log('updated')
        return Response.json('menu updated', { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
        
    }
    
}

// export default async function handler(req) {
//     switch (req.method) {
//         case 'GET' : {
//             return GET(req)
//         }
//         case 'POST' : {
//             return POST(req)
//         }
//     }
// }