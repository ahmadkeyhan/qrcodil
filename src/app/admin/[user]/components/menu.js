'use client'

import { useState } from 'react'
import {Category} from './category'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import EditMenu from '../../../../actions/editMenu'

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
        <div className="flex items-center flex-col sm:flex-row">
          <DragDropContext onDragEnd={onCatReorder}>
              <Droppable droppableId='droppableMenu'>
                {(provided) => (
                  <ul ref={provided.innerRef} {...provided.droppableProps}>
                    {defaultMenu.categories.map((category, index) => {
                      return <Category user={user} cat={category} index={index} key={index} />
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          <form id='addCategory' className='text-lime-300 flex flex-col justify-center items-center' onSubmit={addCategory}>
            <div>
                <label htmlFor='title'>title</label>
                <input className='' name='title' />
            </div>
            <div>
                <label htmlFor='subtitle'>subtitle</label>
                <input className='' name='subtitle' />
            </div>
            <button disabled={loading} className="text-lime-500 disabled:text-white" type='submit'>
                {loading? 'loading' : 'add category'}
            </button>
          </form>
        </div>
    )
}