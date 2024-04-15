import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../index';
import './MyJob.css';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../header';
import toast from 'react-hot-toast';
function MyJobs() {
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const [data, setData] = useState([]);
  const navigateTo=useNavigate();
  if(!isAuthorized){
    navigateTo("/login");
  }
  useEffect(() => {
    const getMyJobs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/job/myjobs`, { withCredentials: true });
        setData(response.data.myjobs);
        console.log(response.data.myjobs);
      } catch (error) {
        console.error("Error fetching my jobs:", error);
      }
    };

    getMyJobs();
  }, []); 

  const deletethejob = async (id) => {
    try {
      const {data}= await axios.delete(`${BASE_URL}/job/delete/${id}`, { withCredentials: true });
      console.log(data);
      toast.success(data.message);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting the job:", error);
    }
  };

  console.log("Data in state:", data); 
  return (
    <div className='my-job'>
      {data.map((job, index) => (
        <div className="job-card" key={index}>
          <div className="title">Title: {job.title}</div>
          <div className="category">Category: {job.category}</div>
          <div className="city">City: {job.city}</div>
          <div className="country">Country: {job.country}</div>
          <div className="location">Location: {job.location}</div>
          <div className="description">Description: {job.description}</div>
          {job.fixedSalary ? (
            <div className="salary">Fixed Salary: {job.fixedSalary}</div>
          ) : (
            <div className="salary">
              Salary
              <div className="from">From: {job.SalaryFrom}</div>
              <div className="to">To: {job.SalaryTo}</div>
            </div>
          )}
              

              <button onClick={()=>deletethejob(job._id)}>Delete</button>
          <br />
        </div>
      ))}
    </div>
  );
}

export default MyJobs;
