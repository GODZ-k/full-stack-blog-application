import React from 'react'

function Form({children , ...props}) {
  return (
    <form {...props} className=' block'>
        {children}
    </form>
  )
}

export default Form