'use client'
import Router from 'next/router'
import {heads} from './headers'

export function Form({user, oldMenu}) {
    const postMenu = async (body) => {
        console.log(body)
        const post = await fetch(`http://localhost:3000/api/admin/?username=${user}`, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: heads(),
          next: {revalidate: 5}
        })
        return post.json()
      }
    const addCategory = (event) => {
        event.preventDefault()
        // console.log(event.target[0].value)
        postMenu({
            user: user,
            categories: [...oldMenu.categories, {title: event.target[0].value, subtitle: event.target[1].value}]
        })
        Router.reload()
      }
    return (
        <form className="text-black" onSubmit={addCategory}>
                  <div>
                    <label htmlFor='title' />
                    <input name='title' />
                  </div>
                  <div>
                    <label htmlFor='subtitle' />
                    <input name='subtitle' />
                  </div>
                  <button className="text-orange-400" type='submit'>submit</button>
                </form>
    )
}