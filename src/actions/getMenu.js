import {connectToDatabase} from '../lib/mongodb'

export default async function GetMenu(username) {
    try {
        let { db } = await connectToDatabase()
        let data = await db
            .collection('menu')
            .find({"user" : username}) 
            .sort({ _id: -1 })
            .toArray()
        let menu = JSON.parse(JSON.stringify(data[0]))
        return menu
    } catch (error) {
        return Response.json(error)
    }
}