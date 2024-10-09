'use client'

import {heads} from './headers'
import { useState,useEffect } from 'react'

import PostMenu from '../../../../actions/postMenu'

export function Form({user, oldMenu}) {
    const [loading,setLoading] = useState(false)
    // console.log(oldMenu)
    const [menu, setMenu] = useState(oldMenu)
    // const postMenu = async (body) => {
    //   // console.log(body)
    //     setLoading(true)
    //     const post = await fetch(`http://localhost:3000/api/admin/?username=${user}`, {
    //       method: 'POST',
    //       body: JSON.stringify(body),
    //       headers: heads(),
    //       next: {revalidate: 5}
    //     })
    //     setLoading(false)
    //     return post.json()
    //   }
    const addCategory = async (event) => {
      event.preventDefault()
        setMenu({
            user: user,
            categories: [...oldMenu.categories, {title: event.target[0].value, subtitle: event.target[1].value, items: []}]
        })
        // // console.log(menu)
        // postMenu(menu)
        await PostMenu(menu)

    }

    const addItem = (event) => {
        // event.preventDefault()
        // console.log(event.target[0].name)
        // var catIndex = menu.categories.indexOf('coffees')
        menu.categories.map((cat) => {
          if (cat.title === event.target[0].name) {
            cat.items.push(event.target[0].value)
            console.log(cat)
          }
        })
        // postMenu(menu)
        // console.log(menu.categories)
    }

    // useEffect(() => {
    //   postMenu(menu)
    // },[menu])

    return (
        <div className="flex gap-4 items-center flex-col sm:flex-row">
            <ul>
                {oldMenu.categories.map((category, index) => {
                    return (
                      <li key={index} className=' mb-4'>
                        <h2 className='text-xl text-orange-400 font-bold'>{category.title}</h2>
                        <h3 className='text-orange-200'>{category.subtitle}</h3>
                        <ul>
                          {category.items?.map((item, index) => {
                            return (
                              <li key={index} className=' text-xs'>
                                {item}
                              </li>
                            )
                          })}
                        </ul>
                        <form className='text-orange-200 flex flex-col justify-center items-center' onSubmit={addItem}>
                            <div>
                                <label htmlFor={category.title}>new Item</label>
                                <input className='' name={category.title} />
                            </div>
                            <button disabled={loading} className="text-orange-400 disabled:text-white" type='submit'>
                                {loading? 'loading' : 'submit'}
                            </button>
                        </form>
                      </li>
                    )
                })}
            </ul>
        <form className='text-orange-200 flex flex-col justify-center items-center' onSubmit={addCategory}>
            <div>
                <label htmlFor='title'>title</label>
                <input className='' name='title' />
            </div>
            <div>
                <label htmlFor='subtitle'>subtitle</label>
                <input className='' name='subtitle' />
            </div>
            <button disabled={loading} className="text-orange-400 disabled:text-white" type='submit'>
                {loading? 'loading' : 'submit'}
            </button>
        </form>
        </div>
    )
}