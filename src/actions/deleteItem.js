'use server'

import {connectToDatabase} from '../lib/mongodb'
import { revalidatePath } from "next/cache"

export default async function DeleteItem(user,index,idx) {
    try {
        let { db } = await connectToDatabase()
        let data = await db
            .collection('menu')
            .find({"user" : user}) 
            .sort({ _id: -1 })
            .toArray()
        let menu = JSON.parse(JSON.stringify(data[0]))
        // let menu = JSON.parse(req)
        menu.categories[index].items.splice(idx,1)
        await db.collection('menu').updateOne({user: menu.user}, {$set:{categories: menu.categories}}, {upsert: true})
        revalidatePath('/admin/[user]', 'page')
        return {message: 'updated'}
    } catch (error) {
        console.log(error)
        return {message: 'error'}
        
    }
}