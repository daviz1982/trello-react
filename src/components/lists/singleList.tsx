import React, { useEffect, useState } from 'react'
import { propTypes } from 'react-bootstrap/esm/Image'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import addTask from '../../services/addTask.service'
import getList from '../../services/getList.service'
import getTasksList from '../../services/getTasks.service'
import Task from '../tasks/Task'

export default function SingleList({ id, name }: { id: number; name: string }) {
  const [tasksList, setTasksList] = useState([])
  const params = useParams<{ idList: string }>()
  const { handleSubmit, register } = useForm()

  const [state, setState] = useState(() => {
    if (params.idList) {
      return { idList: params.idList, name: '' }
    } else {
      return { idList: id, name: name }
    }
  })

  useEffect(() => {
    if (!state.name) {
      getList(state.idList).then((list) => {
        if (list.length) {
          setState({ ...state, name: list[0].name})
        }
      })
      getAllTasks()
    }
  }, [])

  const newTask = (params: any) => {
    const { taskname } = params
    if (taskname === '') return
    addTask({ task: taskname, idlist: state.idList }).then((res) => {
      if (res) {
        getAllTasks()
      }
    })
  }

  const getAllTasks = () => {
    getTasksList(state.idList).then((tasks) => {
      console.log(tasks)
      setTasksList(tasks)
    })
  }

  return (
    <>
      <div className='tasklist card'>
        <div className='card-header'>{state.name}</div>
        <div className='card-body'>
          {tasksList.length > 0 && (
            <>
              {tasksList.map((elem: any) => {
                return <Task id={elem.id} name={elem.task} />
              })}
            </>
          )}
        </div>
        <div className='card-footer'>
          <form onSubmit={handleSubmit(newTask)}>
            <h5>Add task</h5>
            <div>
              <label htmlFor='taskname'>Set a name for the new task</label>
              <input
                type='text'
                id='taskname'
                name='taskname'
                ref={register}
                maxLength={20}
              />
              <button>Create task</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
