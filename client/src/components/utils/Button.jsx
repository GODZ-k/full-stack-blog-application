import React from 'react'

function Button({children , type , className=''}) {
  return (
    <button type={type} className={`${className} bg-gray-900 rounded-sm text-white text-sm p-3 w-40 my-3`}>{children}</button>
  )
}

export default Button