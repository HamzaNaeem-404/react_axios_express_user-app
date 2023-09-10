import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

function Update() {
    // const [data, setData]=useState([])
  const{id} = useParams();

  const [values, setValues] = useState({
    name: '',
    email: ''
    // phone: ''
})

    const navigate = useNavigate();
    useEffect(()=>{
        axios.get(`http://localhost:3301/user/${id}`)
        .then(res => {
            setValues(res.data);
            console.log(res);
            console.log(res.data);
        })
        .catch(err => console.log(err))
    }, [id])

    const handleUpdate = (event)=>{
        event.preventDefault();
        
        axios.put('http://localhost:3301/user/'+id, values)
        .then((res) => {
            // toast.success(res.data.message);
            navigate('/');
        })
        .catch(err => console.log(err))
        toast.info("User Updated Successfully");
    }
    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
           <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
                <h2>Edit User</h2>
                <form onSubmit={handleUpdate}>
                    <div className='mb-2'>
                        <label htmlFor='name'>Name:</label>
                        <input type='text' name='name' className='form-control' placeholder='Enter Name'
                        value={values.name} onChange={e => setValues({...values, name: e.target.value})}/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='name'>Email:</label>
                        <input type='email' name='email' className='form-control' placeholder='Enter Email'
                        value={values.email} onChange={e => setValues({...values, email: e.target.value})}/>
                    </div>
                    {/* <div className='mb-3'>
                        <label htmlFor='name'>Phone:</label>
                        <input type='phone' name='phone' className='form-control' placeholder='Enter Phone'
                        value={values.phone} onChange={e => setValues({...values, phone: e.target.value})}/>
                    </div> */}
                    <button className='btn btn-success'>Update</button>
                    <Link to="/" className='btn btn-primary ms-3'>Back</Link>
                </form>
           </div>
        </div>
      )
}

export default Update
