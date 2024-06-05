import React from 'react'
import SignupFormComponent from '../component/user/SignupFormComponent'
import Header from '../component/Header'

export default function Signup() {
  return (
    <div className='bg-main'>
        {/* <div className="border-b border-black">
            <Header />
        </div> */}
        <SignupFormComponent />
    </div>
  )
}
