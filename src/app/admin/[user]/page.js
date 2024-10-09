import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import Qr from './components/qrcode'
import {Form} from './components/form'

export default async function Page({params}) {
    const user = await currentUser()
    
    if (!user) {
      return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <div className="flex gap-4 items-center flex-col sm:flex-row">
              not signed in!
            </div>
          </main>
        </div>
      );
    }
    else if (params.user === user.username) {

      const getMenu = async () => {
        const res = await fetch(`http://localhost:3000/api/admin/?username=${params.user}`, {
          headers: headers()
        })
        return res.json()
      }
      const menu = await getMenu()

      if (menu) {
        return (
          <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 gap-16 sm: font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
              <div className="flex gap-4 items-center flex-col sm:flex-row">
                <ul>
                  {menu[0].categories.map((category) => {
                    return (
                      <li className=' mb-4'>
                        <h2 className='text-xl text-orange-400 font-bold'>{category.title}</h2>
                        <h3 className='text-orange-200'>{category.subtitle}</h3>
                        <ul>
                          {category.items?.map((item) => {
                            return (
                              <li className=' text-xs'>
                                {item}
                              </li>
                            )
                          })}
                        </ul>
                      </li>
                    )
                  })}
                </ul>
                <Form user={params.user} oldMenu={menu[0]} />
              </div>
              <Qr user={params.user} />
            </main>
          </div>
        );
      }
    } 

    else redirect(`/admin/${user.username}`)

}
