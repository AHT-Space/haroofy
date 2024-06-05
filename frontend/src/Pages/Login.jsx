import React from 'react'
import LoginFormComponent from '../component/user/LoginFormComponent'
import Header from '../component/Header'

export default function Signup() {
  return (
    <div className='bg-main'>
        {/* <div className="border-b border-black">
            <Header />
        </div> */}
        <LoginFormComponent />
    </div>
  )
}
