import React, { FormEvent, useState } from 'react'
import sprite from '../../images/sprite.svg'

export default function Task({
  name,
  id,
  handleEdit,
  handleDelete,
}: {
  name: string
  id: number
  handleEdit: any
  handleDelete: any
}) {
  const [editTaskName, setEditTaskName] = useState(name)
  const [showEditTask, setShowEditTask] = useState(false)

  const editTask = (event: FormEvent<HTMLElement>) => {
    event.preventDefault()
    setShowEditTask(false)
    return handleEdit({ taskId: id, taskName: editTaskName })
  }

  return (
    <div className='card task-container'>
      <div className='card-body task-content'>
        {showEditTask ? (
          <form className='form-inline' onSubmit={(e) => editTask(e)}>
            <input
              className='form-control'
              type='text'
              value={editTaskName}
              onChange={(e) => setEditTaskName(e.target.value)}
              name='name'
            />
            <button className='btn btn-primary'>Rename</button>
          </form>
        ) : (
          <span className='task-name'>{name}</span>
        )}
        <div className='btn-group' role='group' aria-label='Basic example'>
          <button
            type='button'
            className='btn btn-light btn-sm'
            onClick={() => setShowEditTask(true)}
          >
            <svg className='bi' width='16' height='16'>
              <use href={sprite + '#pencil-square'} />
            </svg>
          </button>
          <button
            type='button'
            className='btn btn-light btn-sm'
            onClick={() => handleDelete(id)}
          >
            <svg className='bi' width='16' height='16'>
              <use href={sprite + '#trash'} />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
