import React from 'react'

function Button({
    children,
    type = "button",
    bgColor = "bg-gray-500",
    textColor = "white",
    className = '',
    ...props
}) {
  return (
    <button className={` px-2 py-4 rounded-xl ${bgColor} ${textColor} ${className}`}{...props}>
      {children}
    </button>
  )
}

export default Button
