import {connectToDatabase} from '../lib/mongodb'

export default async function GetMenu(username) {
    try {
        let { db } = await connectToDatabase()
        let menu = await db
            .collection('menu')
            .find({"user" : username}) 
            .sort({ _id: -1 })
            .toArray()
        return menu[0]
    } catch (error) {
        return Response.json(error)
    }
}