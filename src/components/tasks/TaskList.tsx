import React, { useEffect, useState } from 'react'
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

  return (
    <>
      {tasksList.length > 0 && (
        <>
          {tasksList.map((elem: any) => {
            return <Task key={elem.id} id={elem.id} name={elem.task} />
          })}
        </>
      )}
    </>
  )
}
