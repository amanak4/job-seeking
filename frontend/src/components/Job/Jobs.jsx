import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../index';
import { Link } from 'react-router-dom';
import './Jobs.css'; // Import CSS file
import { CardThree } from './cards';
import { BASE_URL } from '../../header';
function Jobs() {
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getMyJobs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/job/alljobs`, { withCredentials: true });
        setData(response.data.jobs);
        console.log(response.data.jobs);
      } catch (error) {
        console.error("Error fetching all jobs:", error);
      }
    };

    getMyJobs();
  }, []); 

  console.log("Data in state:", data); 
  return (
    <div className="jobs-container"> 
      {data.map((job, index) => (
        <CardThree title={job.title} key={index} description={job.description} location={job.location} category={job.category} role={user.role} _id={job._id} />    
      ))}
    </div>
  );
}

export default Jobs;
