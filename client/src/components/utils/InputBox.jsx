import React,{forwardRef, useId} from 'react'

function InputBox({type="text" , className="" , label , placeholder , ...props},ref) {
    const id =useId()
  return (
    <>
    {label && (<label className=' ' htmlFor={id}>{label}</label>)}
    <input type={type} id={id} ref={ref} className={`${className} p-2 border rounded-sm my-2 block` } size="35" placeholder={placeholder} {...props}/>
    </>
  )
}

export default  forwardRef(InputBox)