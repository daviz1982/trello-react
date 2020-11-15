import React, { useEffect, useState } from 'react'
import getAllLists from '../../services/allLists.service'
import { useForm } from 'react-hook-form'
import createList from '../../services/createList.service'
import SingleList from './singleList'
import deleteList from '../../services/deleteList.service'

export default function Lists() {
  const [allLists, setAllLists] = useState([])
  const [reloadList, setReloadList] = useState(false)
  const { handleSubmit, register } = useForm()

  useEffect(() => {
    setReloadList(false)
    getAllLists().then((res) => {
      // TODO: sort lists by id - custom order
      setAllLists(res)
    })
  }, [reloadList])

  const newList = (params: any) => {
    const { listname } = params
    if (listname === '') return
    createList(listname).then((res) => {
      if (res) {
        setReloadList(true)
      }
    })
  }

  const delList = (id: string) => {
    deleteList(id).then(() => setReloadList(true))
  }

  return (
    <>
      <main>
        <h2>Your lists</h2>

        <div className='tasklist-container'>
          {allLists.length === 0 && (
            <div className='message-no-lists alert alert-info'>
              You haven't created any list... yet!
            </div>
          )}
          {allLists.length > 0 &&
            allLists.map((el: any) => (
              <SingleList
                key={el.id}
                id={el.id}
                name={el.name}
                handleDeleteList={() => delList(el.id)}
              />
            ))}
        </div>
        <div className='form-new-list'>
          <h4>Add a list</h4>
          <form className='form-inline' onSubmit={handleSubmit(newList)}>
            <div className='form-group mb-2 mx-2'>
              <label className='sr-only' htmlFor='listname'>
                New list name
              </label>
              <input
                className='form-control'
                type='text'
                id='listname'
                name='listname'
                ref={register}
                maxLength={20}
                placeholder='New list name'
              />
            </div>
            <button className='btn btn-primary mb-2'>Create list</button>
          </form>
        </div>
      </main>
    </>
  )
}
