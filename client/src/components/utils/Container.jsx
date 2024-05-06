import React from 'react'

function Container({children , className=''}) {
  return (
    <div className={`${className} flex justify-center items-center h-screen w-full p-2`}>{children}</div>
  )
}

export default Container