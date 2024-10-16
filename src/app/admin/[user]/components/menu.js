'use client'

import { useState } from 'react'
import {Category} from './category'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import EditMenu from '../../../../actions/editMenu'
import * as mdIcons from 'react-icons/md'

export function Menu({user,menu}) {
    const [loading,setLoading] = useState(false)
    const [defaultMenu,setMenu] = useState(menu)

    const addCategory = async (event) => {
      setLoading(true)
      let form = document.getElementById('addCategory')
      event.preventDefault()
      let temp = defaultMenu
      temp.categories.push({title: event.target[0].value, subtitle: event.target[1].value, items: []})
      setMenu(temp)
      await EditMenu(defaultMenu).then((data) => {
        form.reset()
        setLoading(false)
      })
    }

    const onCatReorder = async (result) => {
      setLoading(true)
      const {destination, source, draggableId} = result
      if (!destination) return
      if (destination.droppableId === source.droppableId && destination.index === source.index) return
      let temp = defaultMenu
      let cat = temp.categories[draggableId.slice(9)*1]
      temp.categories.splice(source.index,1)
      temp.categories.splice(destination.index,0,cat)
      setMenu(temp)
      await EditMenu(defaultMenu).then((data) => {
        console.log(data)
        setLoading(false)
      })
    }

    return (
        <div className="flex items-center flex-col">
          <DragDropContext onDragEnd={onCatReorder}>
              <Droppable droppableId='droppableMenu'>
                {(provided) => (
                  <ul className='w-full'
                    ref={provided.innerRef} 
                    {...provided.droppableProps}>
                    {defaultMenu.categories.map((category, index) => {
                      return <Category user={user} cat={category} index={index} key={index} />
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          <form id='addCategory' className='text-fuchsia-100 flex flex-col justify-center gap-2 bg-neutral-900 p-4 rounded-3xl w-full' onSubmit={addCategory}>
            <h3 className='text-fuchsia-500 font-bold text-xl'>گروه جدید</h3>
            <div className='flex flex-row w-full justify-between items-center gap-2'>
              <label htmlFor='title'>عنوان</label>
              <input className='rounded-full px-2 py-1 text-neutral-950 w-full' name='title' />
            </div>
            <div className='flex flex-row w-full justify-between items-center gap-2'>
              <label htmlFor='subtitle'>توضیح</label>
              <input className='rounded-full px-2 py-1 text-neutral-950' name='subtitle' />
              <button disabled={loading} className="text-fuchsia-500 bg-neutral-800 transition-colors duration-200 hover:text-neutral-950 hover:bg-fuchsia-500 p-2 rounded-full" type='submit'>
              {loading? <mdIcons.MdStop /> : <mdIcons.MdAdd />}
              </button>
            </div>
          </form>
        </div>
    )
}