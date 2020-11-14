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
  const [showFormAddTask, setShowFormAddTask] = useState(false)

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
          setState({ ...state, name: list[0].name })
        }
      })
      getAllTasks()
    }
  }, [])

  const newTask = (params: any) => {
    handleFormAddTask()
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

  const handleFormAddTask = () => {
    setShowFormAddTask(!showFormAddTask)
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
          <div className={showFormAddTask ? '' : 'd-none'}>
            <form onSubmit={handleSubmit(newTask)}>
              <h5>Add task</h5>
              <div className='form-group'>
                <label className='sr-only' htmlFor='taskname'>
                  Name
                </label>
                <input
                  className='form-control'
                  type='text'
                  id='taskname'
                  name='taskname'
                  ref={register}
                  maxLength={20}
                  placeholder='Name'
                />
              </div>
              <div className='d-flex'>
                <a
                  className='align-self-center btn btn-link'
                  onClick={handleFormAddTask}
                >
                  Dismiss
                </a>
                <button className='btn btn-success ml-auto'>Create task</button>
              </div>
            </form>
          </div>
          <div className={showFormAddTask ? 'd-none' : 'text-center'}>
            <button className='btn btn-primary' onClick={handleFormAddTask}>
              Add task +
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
