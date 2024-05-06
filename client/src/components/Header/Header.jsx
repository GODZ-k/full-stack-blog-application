import React from 'react'

function Header() {
  return (
    <>
    <div className='w-full h-16 bg-gray-900'>
        <div>
        <h5>Logo</h5>
        </div>
        <div>
           <ul className='flex'>
            <li>Home</li>
            <li>Add</li>
           </ul>
        </div>
        <div>
<button>Signup</button>
<button>Login</button>
        </div>
    </div>
    </>
  )
}

export default Header