import React from 'react'

export default function Container({children}) {
  return (
    <div className='w-full'>
      <div className='w-full max-w-6xl mx-auto px-3'>{children}</div>
    </div>
  )
}
