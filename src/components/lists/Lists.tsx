import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import getAllLists from '../../services/allLists.service'
import { useForm } from 'react-hook-form'
import createList from '../../services/createList.service'

export default function Lists() {
  const [allLists, setAllLists] = useState([])
  const [idNewList, setIdNewList] = useState()
  const [redirList, setRedirList] = useState(false)
  const { handleSubmit, register, errors } = useForm()

  useEffect(() => {
    getAllLists().then((res) => {
      setAllLists(res)
    })
  })

  const newList = (params: any) => {
    const { listname } = params
    if (listname === '') return
    createList(listname).then((res) => {
      if (res) {
      setIdNewList(res.id)
      setRedirList(true)
      }
    })
  }

  return (
    <div>
      {redirList && <Redirect to={`/list/${idNewList}`} />}
      {allLists.length === 0 && <h2>You haven't created any list... yet!</h2>}
      {allLists.length > 0 && allLists.map((el) => (
        <h1>hola</h1>
      ))}
      <div>
        <form onSubmit={handleSubmit(newList)}>
          <h4>Add a list</h4>
          <div>
            <label htmlFor='listname'>Set a name for the new list</label>
            <input type='text' id='listname' name='listname' ref={register} maxLength={20} />
            <button>Create list</button>
          </div>
        </form>
      </div>
    </div>
  )
}
