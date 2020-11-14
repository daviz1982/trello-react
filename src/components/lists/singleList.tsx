import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import deleteList from '../../services/deleteList.service'
import editList from '../../services/editList.service'
import getList from '../../services/getList.service'
import getTasksList from '../../services/getTasks.service'
import Task from '../tasks/Task'
import ListFooter from './ListFooter'
import { useForm } from 'react-hook-form'
import sprite from '../../images/sprite.svg'

export default function SingleList({ id, name }: { id: number; name: string }) {
  const [tasksList, setTasksList] = useState([])
  const [showEditName, setShowEditName] = useState(false)
  const [error, setError] = useState('')
  const params = useParams<{ idList: string }>()
  const { handleSubmit, register } = useForm()
  const [showListOptions, setShowListOptions] = useState(false)

  const [state, setState] = useState(() => {
    if (params.idList) {
      return { idList: params.idList, name: '' }
    } else {
      return { idList: id, name: name }
    }
  })

  useEffect(() => {
    getList(state.idList)
      .then((list) => {
        if (list.length) {
          setState({ ...state, name: list[0].name })
        }
      })
      .catch((e) => {
        // console.error('Hola soy un error: ', e)
      })
    getTasksList(state.idList).then((tasks) => {
      setTasksList(tasks)
    })
  }, [])

  const delList = () => {
    setShowListOptions(false)
    if (tasksList.length > 0) {
      setError(`Error on delete! This list has depending tasks`)
      setTimeout(() => {
        setError('')
      }, 2000)
      return
    }
    deleteList(state.idList)
  }

  const edit = (params: any) => {
    setShowEditName(false)
    setShowListOptions(false)
    editList({ idList: state.idList, name: params.name }).then(() => {
      getList(state.idList)
        .then((list) => {
          if (list.length) {
            setState({ ...state, name: list[0].name })
          }
        })
        .catch((e) => {
          // console.error('Hola soy un error: ', e)
        })
    })
  }

  return (
    <>
      {error && (
        <div
          id='error-single-list'
          className='alert alert-danger fade show'
          role='alert'
        >
          {error}
        </div>
      )}
      <div className='tasklist card'>
        <div className='card-header d-flex'>
          {showEditName ? (
            <form className='form-inline' onSubmit={handleSubmit(edit)}>
              <input
                className='form-control'
                type='text'
                value={state.name}
                onChange={(e) => setState({ ...state, name: e.target.value })}
                name='name'
                ref={register}
              />
              <button className='btn btn-primary'>Rename</button>
            </form>
          ) : (
            <h5>{state.name}</h5>
          )}
          <button
            className='btn btn-secondary ml-auto'
            onClick={() => setShowListOptions(true)}
          >
            <svg className='bi' width='16' height='16'>
              <use href={sprite + '#list'} />
            </svg>
          </button>
        </div>
        {showListOptions && (
          <div>
            <div className='d-flex justify-content-around mt-3 mb-2'>
              <button
                className='btn btn-primary'
                onClick={() => setShowEditName(true)}
              >
                Change name
              </button>
              <button className='btn btn-danger' onClick={delList}>
                Delete list
              </button>
            </div>
          </div>
        )}
        <div className='card-body list-body'>
          {tasksList.length > 0 && (
            <>
              {tasksList.map((elem: any) => {
                return <Task key={elem.id} id={elem.id} name={elem.task} />
              })}
            </>
          )}
        </div>
        <div className='card-footer'>
          <ListFooter idList={state.idList} setTasksList={setTasksList} />
        </div>
      </div>
    </>
  )
}
