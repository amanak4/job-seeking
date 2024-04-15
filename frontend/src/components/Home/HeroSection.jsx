import React from 'react'
import { FaBuilding, FaSuitcase, FaUserPlus, FaUsers } from 'react-icons/fa'
import { MdImageSearch } from 'react-icons/md'
import jobpic from "../../assests/job.jpg"
function HeroSection() {
  const details=[{
    id:1,
    title:"1,23,432",
    subtitle:"Live Job",
    icon:<FaSuitcase />
  },
{
  id:2,
    title:"13,432",
    subtitle:"Companies",
    icon:<FaBuilding />
},
{
  id:3,
    title:"2,43,032",
    subtitle:"Job Seeker",
    icon:<FaUsers />
},
{
  id:4,
    title:"10432",
    subtitle:"Employer",
    icon:<FaUserPlus />
}]

  
  return (
    <div className='heroSection'>
       <div className="home-container">
        <div className="title">
           <h1>Find a job that suits</h1>
           <h1>your interest and skills</h1>
           <p>Explore thousands of job openings with just one click from any device anywhere in the world. </p>
        </div>
        <div className='image'>
          <img src={jobpic} alt="" />
        </div>
       </div>
       <div className='details'>
      { details.map((element,index)=>{
        return(<div className='card' key={index}>
          <div className='icon'>{element.icon}</div>
          <div className='content'>
            <p>{element.title}</p>
            <p>{element.subtitle}</p>
          </div>
        </div>)
       })}
       </div>
    </div>
  )
}

export default HeroSection
