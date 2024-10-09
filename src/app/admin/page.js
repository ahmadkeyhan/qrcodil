import { currentUser } from '@clerk/nextjs/server'
import { RedirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function Page() {
    const user = await currentUser()
    
    if (!user) return (<RedirectToSignIn />)
    else redirect(`/admin/${user.username}`)

}
