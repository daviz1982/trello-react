import React from 'react'

export default function Task({ name, id }: { name: string; id: number }) {
  return (
    <div>
      {name}
    </div>
  )
}
