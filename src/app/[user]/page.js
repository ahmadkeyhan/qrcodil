import { headers } from 'next/headers'
// export const dynamic = 'force-dynamic'

// export async function generateStaticParams() {
//     const menus = await fetch('http://localhost:3000/api', {headers: headers()}).then((res) => res.json())
//     console.log(menus)
//     return menus.map((menu) => ({
//         user: menu.user
//     }))
// }

export default async function Page({params}) {
  const getMenu = async () => {
    const res = await fetch(`http://localhost:3000/api/admin/?username=${params.user}`, {
      headers: headers()
    })
    return res.json()
  }
  const menu = await getMenu()  
  console.log(menu) 
  if (menu) {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <ul>
              {menu[0].items.map((item) => {
                return (<li>{item}</li>)
              })}
            </ul>
          </div>
        </main>
      </div>
    );
  }
    


}
