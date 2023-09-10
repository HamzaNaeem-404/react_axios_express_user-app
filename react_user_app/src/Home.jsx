import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify";


function Home() {

    const [data, setData]=useState([])

        // const navigate = useNavigate();
       useEffect(()=>{
        axios.get('http://localhost:3301/users')
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    }, [])

    const handleDelete =  (id) => {
        const confirmDelete = window.confirm("Would you like to Delete?");
        
        if (confirmDelete) {
            try {
                 axios.get('http://localhost:3301/user-delete/'+ id);
                 toast.error("User deleted");
                 setTimeout(() => {
                     location.reload();
                }, 1300);
     
            } catch (err) {
                console.log(err);
            }
        }
}
    
    

  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-100'>
      <h1>List of Users</h1>

      <div className='w-75 rounded bg-white border shadow p-4'>
            <div className='d-flex justify-content-end'>
                <Link to="/create" className='btn btn-success'>Add +</Link>
            </div>

       <table className='table table-striped'>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                {/* <th>Phone</th> */}
                <th>Action</th>
            </tr>
        </thead>

        <tbody>
            {
                data.map((d, i)=> (
                    <tr key={d._id}>
                        <td>{i+1}</td>
                        <td>{d.name}</td>
                        <td>{d.email}</td>
                        {/* <td>{d.phone}</td> */}
                        <td>
                            <Link to={`/read/${d._id}`} className='btn btn-sm btn-info me-2'>View</Link>
                            <Link to={`/update/${d._id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                            <button onClick={e => handleDelete(d._id)} className='btn btn-sm btn-danger'>Delete</button>
                        </td>
                    </tr>
                ))
            }
        </tbody>
       </table>
      </div>
    </div>
  )


}

export default Home
