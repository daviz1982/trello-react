import React from 'react'
import sprite from '../../images/sprite.svg'

export default function Task({ name, id }: { name: string; id: number }) {

  const delTask = () => {

  }

  return (
    <div className='card task-container'>
      <div className='card-body task-content'>
        <span className='task-name'>{name}</span>
        <div className='btn-group' role='group' aria-label='Basic example'>
          <button type='button' className='btn btn-light btn-sm'>
            <svg className='bi' width='16' height='16'>
              <use href={sprite + '#pencil-square'} />
            </svg>
          </button>
          <button type='button' className='btn btn-light btn-sm' onClick={delTask}>
            <svg className='bi' width='16' height='16'>
              <use href={sprite + '#trash'} />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
