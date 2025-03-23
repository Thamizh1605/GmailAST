import React from 'react'
import {Route,Routes} from 'react-router-dom'
import HeroSection from '../HeroSection/HeroSection'
import Navbar from '../Navbar/Navbar'
import Inbox from '../Inbox/Inbox'
import About from '../About/About'
import Signin from '../Signin/Signin'
import EmailDetailPage from '../EmailDetail/EmailDetailPage'
import Spam from '../Spam/Spam'
import Aichatbot from '../AIchat/Aichatbot'
import Meetingcal from '../Meetingcalender/Meetingcal'
import Priorityemail from '../PriorityEmail/Priorityemail'
import Sendemail from '../SendEmail/Sendemail'
import Dashboard from '../Dashboard/Dashboard'

const RightContainer = ({isSigned,setIsSigned,setUsername,setUserEmail}) => {
  return (
      
    <div className="w-3/4 bg-gray-100 md:w-2/3 lg:w-5/6">
        <Navbar isSigned={isSigned} setIsSigned={setIsSigned} />
        <div className='overflow-y-scroll h-[100%] scrollbar-hide pb-15' style={{scrollbarWidth:'none',msOverflowStyle:'none'}}>
        <Routes>
            <Route path="/" element={<HeroSection/>}/>
            <Route path='/inbox' element={<Inbox/>}/>
            <Route path="/email/:id" element={<EmailDetailPage/>} />
            <Route path='/spam' element={<Spam/>}/>
            <Route path='/About' element={<About/>}/>
            <Route path='/sign/in' element={<Signin 
            setIsSigned={setIsSigned}
            setUsername={setUsername}
            setUserEmail={setUserEmail}
            />}/>
            <Route path='/ai' element={<Aichatbot/>}/>
            <Route path='/meetcal' element={<Meetingcal/>}/>
            <Route path='/priority' element={<Priorityemail/>}/>
            <Route path='/send/email' element = {<Sendemail/>} />
            <Route path='/dash/board' element = {<Dashboard/>} />
        </Routes>
        </div>
    </div>
  )
}

export default RightContainer
