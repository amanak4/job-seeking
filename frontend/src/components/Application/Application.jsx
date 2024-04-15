import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import './Application.css'; 
import { Context } from '../../index';
import { BASE_URL } from '../../header';

function Application() {
  const navigateTo = useNavigate();
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverletter, setcoverletter] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false); 
    const { id } = useParams();

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const postApp = async () => {
    setLoading(true); 
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("coverletter", coverletter);
    formData.append("phone", phone);
    formData.append("resume", resume);
    formData.append("jobId", id);
    
    try {
      const response = await axios.post(`${BASE_URL}/applications/post`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });

      setLoading(false); // Clear loading state after receiving the response

      if (response.data === null) {
        return <div>Loading.....</div>;
      }
      
      toast.success(response.data.message);
      navigateTo("/job/getall");
    } catch (error) {
      setLoading(false); // Clear loading state in case of an error

      toast.error(error.response);
    }
  }

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <div className='my-10'>
    <div className="mx-auto max-w-7xl px-4">
    <div className="mx-auto max-w-7xl py-12 md:py-24">
    <div className="grid items-center justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
      <div className="flex items-center justify-center">
              <div className="px-2 md:px-12">
                <p className="text-2xl font-bold text-gray-900 md:text-4xl">Apply for the Job</p>
      <form className="application-form" onSubmit={(e) => {
        e.preventDefault();
        postApp();
      }}>
        <div className="grid w-full  items-center gap-1.5">
          <label className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name:</label>
          <input   className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <label className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email:</label>
          <input className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <label className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Cover Letter:</label>
          <textarea className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900" value={coverletter} onChange={(e) => setcoverletter(e.target.value)}></textarea>
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <label className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Phone:</label>
          <input   className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <label className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Resume:</label>
          <input   className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900" type="file" accept=".png,.jpg,.webp" onChange={handleResumeChange} />
        </div>
        <button type="submit">{loading ? 'Submitting...' : 'Submit Application'}</button>
      </form>
      
      </div>
     
      </div>
      <img
              alt="Contact us"
              className="hidden max-h-full w-full rounded-lg object-cover lg:block"
              src="https://images.unsplash.com/photo-1543269664-56d93c1b41a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGhhcHB5JTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
            />
    </div>
    </div>
    </div>
    </div>
  );
}

export default Application;
