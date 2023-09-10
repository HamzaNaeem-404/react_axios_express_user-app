import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

function Create() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password:'', 
        role:''
        // phone: ''
    })

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
    
        axios.post('http://localhost:3301/user', values)
            .then((res) => {
                console.log(res.data);
                navigate('/');
            })
            .catch(err => console.log(err));
    
        toast.success("User Created Successfully");
    }
    
    
  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
       <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
            <h2>Add a User</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-2'>
                    <label htmlFor='name'>Name:</label>
                    <input type='text' name='name' className='form-control' placeholder='Enter Name'
                    onChange={e => setValues({...values, name: e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor='name'>Email:</label>
                    <input type='email' name='email' className='form-control' placeholder='Enter Email'
                    onChange={e => setValues({...values, email: e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor='name'>Password:</label>
                    <input type='password' name='password' className='form-control' placeholder='Enter Password'
                    onChange={e => setValues({...values, password: e.target.value})}/>
                </div>

                
                <div className='mb-2'>
                <label for="role">Your role:</label>

                  <select name="role" id="role" onChange={e => setValues({...values, role: e.target.value})}>
                 <option value="user">user</option>
                 <option value="admin">admin</option>
                 </select>
                    
                </div>
                {/* <div className='mb-3'>
                    <label htmlFor='name'>Phone:</label>
                    <input type='phone' name='phone' className='form-control' placeholder='Enter Phone'
                    onChange={e => setValues({...values, phone: e.target.value})}/>
                </div> */}
                <button className='btn btn-success'>Submit</button>
                <Link to="/" className='btn btn-primary ms-3'>Back</Link>
            </form>
       </div>
    </div>
  )
}

export default Create
