import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../index';
import "./Myapplication.css";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../header.jsx';
import { CardFour } from './cards.jsx';
function MyJobs() {
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const [data, setData] = useState([]);
const navigateTo = useNavigate();
const getMyJobs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/applications/jobseeker/allApplications`, { withCredentials: true });
    setData(response.data.allApplication);
    // console.log(response);
  } catch (error) {
    const errorMessageRegex = /<pre>(.*?)(?=<br>)/s;
    const match = errorMessageRegex.exec(error.response.data);
    toast.error(match[1].trim());
  }
};
  useEffect(() => {
    const getEmployerApplicants = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/applications/Employer/allApplications`, { withCredentials: true });
        setData(response.data.allApplication);
        // console.log(response);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
   
    if(user.role==="Employer"){
      getEmployerApplicants();
    }else{
      getMyJobs();
    }
  
  }, []); 

  const deleteApplication=async(id)=>{
   try{  const {data}=await axios.delete(`${BASE_URL}/applications/JobSeeker/deleteApplication/${id}`,{
      withCredentials:true
     });
  console.log(data);
     toast.success(data.message);
     getMyJobs();
    }
    catch(error){
      const errorMessageRegex = /<pre>(.*?)(?=<br>)/s;
      const match = errorMessageRegex.exec(error);
      toast.error(match[1]);
    }
  }

  if(!isAuthorized){
    navigateTo("/login");
  }
  return (
    <div className='my-application'>
      {data.map((application, index) => (

         <div className="applicant-detail " key={index}>
         <CardFour name={application.name} coverletter={application.coverletter} email={application.email} phone={application.phone} url={application.resume.url} role={user.role} id={application._id}/>
         {/*
        <div>
        <div>Name: {application.name}</div>
          <div>Cover Letter: {application.coverletter}</div>
          <div>Email: {application.email}</div>

          <div>Phone: {application.phone}</div>
</div>
          <a href={application.resume.url} target='_blank'><img src={application.resume.url} className='resume'/></a>
            <br /> */}
            <div className="mt-3 flex items-center space-x-2">
           { user.role==="Job Seeker"?<button onClick={()=>deleteApplication(application._id)} className='delete'>DELETE</button>:<></>}
           </div>
        </div>
      ))}
    </div>
  );
}

export default MyJobs;
