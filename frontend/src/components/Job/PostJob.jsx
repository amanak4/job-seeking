import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import './PostJob.css'; 
import { useNavigate } from 'react-router-dom';
import { Context } from '../../index';
import { BASE_URL } from '../../header';
function PostJob() {

  const navigateTo=useNavigate();
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");
  const [fixedSalary, setFixedSalary] = useState(0);
  const [salaryFrom, setSalaryFrom] = useState(0);
  const [salaryTo, setSalaryTo] = useState(0);

  if(!isAuthorized){
    navigateTo("/login");
  }

  const postJob = async () => {
    try {
      const {data} = await axios.post(`${BASE_URL}/job/postjobs`, {
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(data.message){
        toast.success(data.message);
       }
       else if(data.error){
         toast.error(data.error);
       }
        
     }catch(error){
       console.log(error);
       
     toast.error(error.response);
     // console.log(error.response)
     
     }
  }

  return (
    <div className="post-job-container"> {/* Add container class */}
      <input className="input-field" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="input-field" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      <input className="input-field" type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <input className="input-field" type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
      <input className="input-field" type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
      <input className="input-field" type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      <input className="input-field" type="number" placeholder="Fixed Salary" value={fixedSalary} onChange={(e) => setFixedSalary(e.target.value)} />
      <input className="input-field" type="number" placeholder="Salary From" value={salaryFrom} onChange={(e) => setSalaryFrom(e.target.value)} />
      <input className="input-field" type="number" placeholder="Salary To" value={salaryTo} onChange={(e) => setSalaryTo(e.target.value)} />
      <button className="post-job-button" onClick={postJob}>Post Job</button> {/* Apply button styling */}
    </div>
  );
}

export default PostJob;
