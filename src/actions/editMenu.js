'use server'

import {connectToDatabase} from '../lib/mongodb'
import { revalidatePath } from "next/cache"

export default async function EditMenu(menu) {
    try {
        let { db } = await connectToDatabase()
        await db.collection('menu').updateOne({user: menu.user}, {$set:{categories: menu.categories}}, {upsert: true})
        revalidatePath('/admin/[user]', 'page')
        return {message: 'updated'}
    } catch (error) {
        console.log(error)
        return {message: 'error'}
        
    }
}