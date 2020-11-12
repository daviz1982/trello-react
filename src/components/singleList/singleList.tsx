import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import getList from '../../services/getList.service'
import getTasksList from '../../services/getTasks.service'

export default function SingleList() {
  const [nameList, setNameList] = useState('')
  const [taskList, setTaskList] = useState([])
  const { idList } = useParams<{ idList: string }>()

  useEffect(() => {
    if (idList) {
      getList(idList).then((list) => {
        setNameList(list.name)
      })
      getTasksList(idList).then((tasks) => {
        setTaskList(tasks)
      })
    }
  }, [idList])

  return (
    <div>
      <h3>{nameList}</h3>
      <ul>
        {taskList.map((elem: { task: string }, k) => {
          ;<li key={k}>{elem.task}</li>
        })}
      </ul>
    </div>
  )
}
