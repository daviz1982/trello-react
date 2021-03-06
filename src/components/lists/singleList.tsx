import React, { createRef, useEffect, useState } from 'react'
import editList from '../../services/editList.service'
import getList from '../../services/getList.service'
import ListFooter from './ListFooter'
import sprite from '../../images/sprite.svg'
import MyModal from '../mymodal/MyModal'
import TaskList from '../tasks/TaskList'
import deleteTasksList from '../../services/deleteAllTasks.service'
import addTask from '../../services/addTask.service'

export default function SingleList({
  id,
  name,
  handleDeleteList,
}: {
  id: number
  name: string
  handleDeleteList: any
}) {
  const [tasksList, setTasksList] = useState([])
  const [error, setError] = useState('')
  const [showEditName, setShowEditName] = useState(false)
  const [editListName, setEditListName] = useState(name)
  const [showModal, setShowModal] = useState(false)
  const [reloadList, setReloadList] = useState(false)
  const [showListOptions, setShowListOptions] = useState(false)
  const [listName, setListName] = useState(name)
  const [listId] = useState(id)

  useEffect(() => {
    setReloadList(false)
    getList(listId)
      .then((list) => {
        if (list.length) {
          setListName(list[0].name)
        }
      })
      .catch((e) => {
        // console.error('CONTROLLED ERROR: ', e)
      })
  }, [reloadList, listId])

  const handleTasksList = (tasksList: any) => {
    setTasksList(tasksList)
  }

  const listOfTasks: any = createRef();

  useEffect(() => {
    if (!showEditName) {
      setEditListName(listName)
    }
  }, [showEditName, listName])

  const delList = () => {
    setShowListOptions(false)
    if (tasksList.length > 0) {
      if (!showModal) {
        setError(
          `This list has depending tasks. Are you sure you want to delete?`
        )
        setShowModal(true)
        return
      }
      deleteTasksList(listId).then(() => handleDeleteList(listId))
      return
    }
    handleDeleteList(listId)
    closeModal()
  }

  const edit = () => {
    setShowEditName(false)
    setShowListOptions(false)
    editList({ idList: listId, name: editListName }).then(() => {
      setReloadList(true)
    })
  }

  const closeModal = () => {
    setShowModal(false)
    setError('')
  }

  const handleAddTask = ({ newName }: any) => {
    addTask({ task: newName, idlist: listId })
      .then((res) => {
        if (res) {
          setReloadList(true)
          listOfTasks.current.forceUpdate()
        }
      })
      .catch((e) => {
        // console.error('CONTROLLED ERROR: ', e)
      })
    }

  return (
    <>
      {showModal && (
        <MyModal
          show={showModal}
          handleClose={closeModal}
          handleAction={() => delList()}
          title='Confirm deletion'
          bodyText={error}
          textPrimaryButton='Delete'
          textSecondaryButton='Cancel'
        />
      )}
      <div className='tasklist card'>
        <div className='card-header d-flex'>
          {showEditName ? (
            <form className='form-inline' onSubmit={edit}>
              <input
                className='form-control'
                type='text'
                value={editListName}
                onChange={(e) => setEditListName(e.target.value)}
                name='name'
              />
              <button className='btn btn-primary'>Rename</button>
            </form>
          ) : (
            <h5>{listName}</h5>
          )}
          <button
            className='btn btn-secondary ml-auto'
            onClick={() => {
              setShowListOptions(!showListOptions)
              setShowEditName(false)
            }}
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
          <TaskList listId={listId} handleTasksList={handleTasksList} reloadList={reloadList} />
        </div>
        <div className='card-footer'>
          <ListFooter addTask={handleAddTask} />
        </div>
      </div>
    </>
  )
}
