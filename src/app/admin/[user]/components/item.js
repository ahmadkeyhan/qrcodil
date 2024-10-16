'use client'

import { useState } from 'react'
import * as mdIcons from 'react-icons/md'
import DeleteItem from '../../../../actions/deleteItem'
import EditItem from '../../../../actions/editItem'
import { Draggable } from '@hello-pangea/dnd'

export function Item({item,index,idx,user}) {
    const [loading,setLoading] = useState(false)
    const [defaultItem,setItem] = useState(item)

    const deleteItem = async () => {
        setLoading(true)
        setItem(null)
        await DeleteItem(user,index,idx).then((data) => setLoading(false))
    }

    const [editState, setEditState] = useState(false)
    const editItem = async (event) => {
        setLoading(true)
        event.preventDefault()
        // why doesn't setItem work?!
        setItem(event.target[0].value)
        await EditItem(user,index,idx,event.target[0].value).then((data) => {
            console.log(data)
            setLoading(false)
            setEditState(false)
        })
    }

    if (defaultItem) {
        return (
            <li key={idx} 
                className='flex flex-row items-center justify-between mt-1 w-full text-lg'>
                {loading ? (
                    <mdIcons.MdStop />
                ) : editState ? (
                    <form id={`editItem${index}`}
                        className='flex flex-row w-full justify-center items-start'
                        onSubmit={editItem}>
                        <div className='flex flex-row items-center justify-start w-full my-1 text-neutral-950'>
                            <input className='w-full py-1 px-2 rounded-full' placeholder={item} name={item} autoFocus />
                            <button disabled={loading} 
                                className="bg-neutral-800 text-fuchsia-50 transition-colors duration-200 hover:bg-green-500 hover:text-neutral-950 p-1 rounded-full mr-1 disabled:text-white" 
                                type='submit'>
                                {loading? <mdIcons.MdStop /> : <mdIcons.MdDone />}
                            </button>
                            <button disabled={loading} 
                                className="bg-neutral-800 text-fuchsia-50 transition-colors duration-200 hover:bg-rose-500 hover:text-neutral-950 p-1 rounded-full mr-1 disabled:text-white" 
                                onClick={() => setEditState(false)}>
                                <mdIcons.MdClose />
                            </button>
                        </div>
                    </form>
                ) : (
                    <Draggable draggableId={`draggable${idx}`} index={idx}>
                        {(provided,snapshot) => (
                            <div className={`flex flex-row justify-between w-full rounded-full ${snapshot.isDragging? 'bg-neutral-700' : 'bg-neutral-800'} p-1`}
                                {...provided.draggableProps}
                                ref={provided.innerRef}>
                                <div className='flex flex-row items-center gap-1 text-fuchsia-50'>
                                    <div {...provided.dragHandleProps} className='flex justify-center items-center p-1 bg-neutral-900 text-fuchsia-50 transition-colors duration-200 hover:bg-fuchsia-500 hover:text-neutral-950 rounded-full'>
                                        <mdIcons.MdDragIndicator />
                                    </div>
                                    {item}
                                </div>
                                <div className='flex flex-row'>
                                    <button disabled={loading} 
                                        onClick={() => setEditState(true)} 
                                        className='bg-neutral-900 p-1 text-fuchsia-50 transition-colors rounded-full ml-1 hover:bg-fuchsia-500 hover:text-neutral-950 duration-200'>
                                        <mdIcons.MdEdit />
                                    </button>
                                    <button disabled={loading} 
                                        onClick={deleteItem} 
                                        className='bg-neutral-900 p-1 text-fuchsia-50 transition-colors rounded-full hover:bg-rose-500 hover:text-neutral-950 duration-200'>
                                        <mdIcons.MdDelete />
                                    </button>
                                </div>
                            </div>
                        )}
                    </Draggable>
                )}
            </li>
        )
    }
}