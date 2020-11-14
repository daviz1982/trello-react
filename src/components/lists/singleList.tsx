import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import getList from '../../services/getList.service'
import getTasksList from '../../services/getTasks.service'
import Task from '../tasks/Task'
import ListFooter from './ListFooter'

export default function SingleList({ id, name }: { id: number; name: string }) {
  const [tasksList, setTasksList] = useState([])
  const params = useParams<{ idList: string }>()

  const [state, setState] = useState(() => {
    if (params.idList) {
      return { idList: params.idList, name: '' }
    } else {
      return { idList: id, name: name }
    }
  })

  //const getAllTasks = useCallback(() => {
  getTasksList(state.idList)
    .then((tasks) => {
      setTasksList(tasks)
    })
    .catch((e) => {
      // console.error('Ola soy un error: ', e)
    })
  //}, [state])

  useEffect(() => {
    //if (!state.name) {
    getList(state.idList)
      .then((list) => {
        if (list.length) {
          setState({ ...state, name: list[0].name })
        }
      })
      .catch((e) => {
        // console.error('Ola soy un error: ', e)
      })
    // getAllTasks()
    getTasksList(state.idList).then((tasks) => {
      setTasksList(tasks)
    })
    //}
  })

  return (
    <>
      <div className='tasklist card'>
        <div className='card-header d-flex'>
          <h5>{state.name}</h5>
          <button
            className='btn btn-secondary ml-auto'
            type='button'
            data-toggle='collapse'
            data-target={`#settings-${state.idList}`}
            aria-expanded='false'
            aria-controls='collapseSettings'
          >
            ⚙
          </button>
        </div>
        <div className='collapse' id={`settings-${state.idList}`}>
          <div className='d-flex justify-content-around'>
            <button className='btn btn-primary'>Change name</button>
            <button className='btn btn-danger'>Delete list</button>
          </div>
        </div>
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
