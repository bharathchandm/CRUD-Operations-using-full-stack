import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';

function Add() {

    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [phone, setPhone] = useState('');

    const addUser=(e)=>{
        e.preventDefault();
        var data={
            "name":name,
            "email":email,
            "phone":phone
        }
        console.log(data)

        fetch("http://localhost:3001/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
    }

  return (
    <div className='container'>
        <h1>Add User</h1>
        <Form>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Enter Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" onChange={(e)=>{setName(e.target.value)}}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Enter Email</Form.Label>
        <Form.Control type="email" placeholder="example@gmail.com" onChange={(e)=>{setEmail(e.target.value)}}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Enter Phone</Form.Label>
        <Form.Control type="number" placeholder="+919876543210" onChange={(e)=>{setPhone(e.target.value)}}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        
        <Form.Control type="submit" value={"Add User"} onClick={(e)=>{addUser(e)}}/>
      </Form.Group>
    </Form>
    <h1>{name}  {email}   {phone}</h1>
    </div>
  )
}

export default Add