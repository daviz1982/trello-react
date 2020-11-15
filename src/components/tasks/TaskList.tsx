import React, { useEffect, useState } from 'react'
import deleteSingleTask from '../../services/deleteSingleTask'
import editTask from '../../services/editTask'
import getTasksList from '../../services/getTasks.service'
import MyModal from '../mymodal/MyModal'
import Task from './Task'

export default function TaskList({ listId, handleTasksList, reloadList }: any) {
  const [tasksList, setTasksList] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(0)
  const [error, setError] = useState('')
  const [reloadTaskList, setReloadTaskList] = useState(false)

  useEffect(() => {
    setReloadTaskList(false)
    getTasksList(listId).then((tasks) => {
      setTasksList(tasks)
      handleTasksList(tasks)
    })
  }, [reloadTaskList, reloadList])

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
    setTaskToDelete(taskId)
    if (!showModal) {
      setError('Are you sure you want to delete this task?')
      setShowModal(true)
      return
    }
    setShowModal(false)
    setError('')
    deleteSingleTask({ taskId }).then(() => setReloadTaskList(true))
  }

  const closeModal = () => {
    setShowModal(false)
    setError('')
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
          {showModal && (
            <MyModal
              show={showModal}
              handleClose={closeModal}
              handleAction={() => deleteTaskHandler(taskToDelete)}
              title='Confirm deletion'
              bodyText={error}
              textPrimaryButton='Delete'
              textSecondaryButton='Cancel'
            />
          )}
        </>
      )}
    </>
  )
}
