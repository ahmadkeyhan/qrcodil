'use client'

import { useState } from 'react'
import * as mdIcons from 'react-icons/md'
import DeleteCat from '../../../../actions/deleteCat'
import EditCat from '../../../../actions/editCat'
import {Item} from './item'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

export function Category({cat,index,user}) {
    const [loading,setLoading] = useState(false)
    const [defaultCat,setCat] = useState(cat)

    const deleteCategory = async () => {
        setLoading(true)
        setCat(null)
        await DeleteCat(user,index).then((data) => {
            console.log(data)
            setLoading(false)
        })
    }

    const [editCatState, setEditCatState] = useState(false)
    const setTitle = async (event) => {
        setLoading(true)
        event.preventDefault()
        let temp = cat
        temp.title = event.target[0].value
        setCat(temp)
        await EditCat(user,index,defaultCat).then((data) => {
            setLoading(false)
            setEditCatState(false)
        })
    }

    const [editSubtitleState, setEditSubtitleState] = useState(false)
    const setSubtitle = async (event) => {
        setLoading(true)
        event.preventDefault()
        let temp = cat
        temp.subtitle = event.target[0].value
        setCat(temp)
        await EditCat(user,index,defaultCat).then((data) => {
            setLoading(false)
            setEditSubtitleState(false)
        })
    }
    
    const addItem =  async (event) => {
        setLoading(true)
        let form = document.getElementById(`addItem${index}`)
        event.preventDefault()
        let temp = cat
        temp.items.push(event.target[0].value)
        setCat(temp)
        await EditCat(user,index,defaultCat).then((data) => {
            form.reset()
            setLoading(false)
        })  
    }

    const onItemReorder = async (result) => {
        setLoading(true)
        const {destination, source, draggableId} = result
        if (!destination) return
        if (destination.droppableId === source.droppableId && destination.index === source.index) return
        let item = cat.items[draggableId.slice(9)*1]
        let temp = cat
        temp.items.splice(source.index,1)
        temp.items.splice(destination.index,0,item)
        setCat(temp)
        await EditCat(user,index,defaultCat).then((data) => {
            setLoading(false)
        })
    }

    if (defaultCat) {
        return (
            <Draggable draggableId={`draggable${index}`} index={index}>
                {(provided,snapshot) => (
                    <li key={index} 
                        className={`${snapshot.isDragging? 'bg-gray-800' : 'bg-gray-900'} p-4 mb-4 w-full rounded-3xl`}
                        {...provided.draggableProps}
                        ref={provided.innerRef}>
                        {editCatState ? (
                            <form id={`editCat${index}`}
                                className='flex flex-col justify-center items-start'
                                onSubmit={setTitle}>
                                <div className='flex flex-row items-center justify-start w-full my-1 text-black'>
                                    <input className='w-full rounded-full py-1 px-2' placeholder={cat.title} name={cat.title} autoFocus />
                                    <button disabled={loading} 
                                        className="bg-gray-800 p-1.5 flex justify-center items-center text-lime-200 rounded-full ml-1 transition-colors disabled:text-white hover:bg-lime-500 hover:text-gray-950 duration-200" 
                                        type='submit'>
                                        {loading? <mdIcons.MdStop /> : <mdIcons.MdDone />}
                                    </button>
                                    <button disabled={loading} 
                                        className="bg-gray-800 p-1.5 flex justify-center items-center text-lime-200 rounded-full ml-1 transition-colors disabled:text-white hover:bg-rose-500 hover:text-gray-950 duration-200" 
                                        onClick={() => setEditCatState(false)}>
                                        <mdIcons.MdClose />
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className='flex flex-row items-center justify-between p-1'>
                                <div className='flex flex-row items-center gap-1'>
                                    <div {...provided.dragHandleProps} className='flex justify-center items-center p-1.5 bg-gray-800 text-lime-200 hover:bg-lime-500 hover:text-gray-950 duration-200 rounded-full'>
                                        <mdIcons.MdDragIndicator />
                                    </div>
                                    <h2 className='text-xl text-lime-500 font-bold'>{cat.title}</h2></div> 
                                <div className='flex flex-row'>
                                    <button disabled={loading} 
                                        className=' bg-gray-800 transition-colors p-1.5 flex justify-center items-center mr-1 text-lime-200 hover:bg-lime-500 hover:text-gray-950 duration-200 rounded-full' 
                                        onClick={() => setEditCatState(true)}>
                                        <mdIcons.MdEdit />
                                    </button>
                                    <button disabled={loading} 
                                        className=' bg-gray-800 transition-colors p-1.5 flex justify-center items-center text-lime-200 hover:bg-rose-500 hover:text-gray-950 duration-200 rounded-full' 
                                        onClick={() => deleteCategory()}>
                                        <mdIcons.MdDelete />
                                    </button>
                                </div>
                            </div>
                        )}
                        {editSubtitleState ? (
                            <form id={`editCat${index}`}
                                className='flex flex-col justify-center items-start'
                                onSubmit={setSubtitle}>
                                <div className='flex flex-row items-center justify-start w-full my-1 text-black'>
                                    <input className='w-full rounded-full py-1 px-2' placeholder={cat.subtitle} name={cat.subtitle} autoFocus />
                                    <button disabled={loading} 
                                        className="bg-gray-800 p-1.5 text-lime-200 transition-colors duration-200 hover:text-gray-950 hover:bg-lime-500 rounded-full ml-1 disabled:text-white" 
                                        type='submit'>
                                        {loading? <mdIcons.MdStop /> : <mdIcons.MdDone />}
                                    </button>
                                    <button disabled={loading} 
                                        className="bg-gray-800 p-1.5 text-lime-200 transition-colors duration-200 hover:text-gray-950 hover:bg-rose-500 rounded-full ml-1 disabled:text-white" 
                                        onClick={() => setEditSubtitleState(false)}>
                                        <mdIcons.MdClose />
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className='flex flex-row justify-between w-full items-center px-1'>
                                <h3 className='text-lime-300'>{cat.subtitle}</h3>
                                <button disabled={loading} 
                                    className='flex justify-center items-center text-sm bg-gray-800 text-lime-200 transition-colors duration-200 hover:bg-lime-500 hover:text-gray-950 p-1 rounded-full' 
                                    onClick={() => setEditSubtitleState(true)}>
                                    <mdIcons.MdEdit />
                                </button>
                            </div>
                        )}
                        <DragDropContext onDragEnd={onItemReorder}>
                            <Droppable droppableId={`droppable${index}`}>
                                {(provided) => (
                                    <ul ref={provided.innerRef} {...provided.droppableProps}>
                                        {cat.items?.map((item, idx) => {
                                            return <Item user={user} index={index} idx={idx} item={item} key={idx} />
                                        })}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </DragDropContext>
                        <form id={`addItem${index}`}
                            className='flex flex-col justify-center items-start'
                            onSubmit={addItem}>
                            <div className='flex flex-row items-center justify-start w-3/4 py-1 mt-1 text-black'>
                                <input className='w-full rounded-full px-2 py-1' name={cat.title} />
                                <button disabled={loading} 
                                    className="flex justify-center items-center rounded-full text-lime-200 bg-gray-800 transition-colors duration-200 hover:bg-lime-500 hover:text-gray-950 p-2 ml-2 disabled:text-white" 
                                    type='submit'>
                                    {loading? <mdIcons.MdStop /> : <mdIcons.MdAdd />}
                                </button>
                            </div>
                        </form>
                    </li>
                )}
            </Draggable>
        )
    }
}