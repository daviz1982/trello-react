import React, { useEffect, useState } from 'react'
import deleteTasksList from '../../services/deleteAllTasks.service'
import deleteSingleTask from '../../services/deleteSingleTask'
import editTask from '../../services/editTask'
import getTasksList from '../../services/getTasks.service'
import Task from './Task'

export default function TaskList({ listId }: any) {
  const [tasksList, setTasksList] = useState([])
  const [reloadTaskList, setReloadTaskList] = useState(false)
  useEffect(() => {
    setReloadTaskList(false)
    getTasksList(listId).then((tasks) => {
      setTasksList(tasks)
    })
  }, [reloadTaskList])

  const editTaskHandler = ({
    taskId,
    taskName,
  }: {
    taskId: number
    taskName: string
  }) => {
    editTask({
      taskId,
      taskName,
    }).then(() => setReloadTaskList(true))
  }

  const deleteTaskHandler = (taskId: number) => {
    deleteSingleTask({ taskId }).then(() => setReloadTaskList(true))
  }

  return (
    <>
      {tasksList.length > 0 && (
        <>
          {tasksList.map((elem: any) => {
            return (
              <Task
                key={elem.id}
                id={elem.id}
                name={elem.task}
                handleEdit={editTaskHandler}
                handleDelete={deleteTaskHandler}
              />
            )
          })}
        </>
      )}
    </>
  )
}
