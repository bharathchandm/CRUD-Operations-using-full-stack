import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

function User() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState({
    id: '',
    name:'',
    email:'',
    phone:''
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setEdit({
      "id":data.id,
      "name":data.name,
      "email": data.email,
      "phone": data.phone,
    })
    setShow(true);
  }
  

  useEffect(
    () => {
      fetchData();
    }, [])

  const fetchData = () => {
    fetch("http://localhost:3001/users")
      .then((data) => {data.json().then((res) =>{
        setData(res)
  })
})
};

const handleChange = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  setEdit(prev => { return { ...prev, [name]: value } })
}

const updateUser = (id) => {
  fetch(`http://localhost:3001/users/${id}`,
    {
      method: 'PUT', headers: {
        'Content-Type': 'application/json'
      }
      , body: JSON.stringify(edit)

    }).then(
      Swal.fire(
        'Good job!',
        'Uer Editied Successfully',
        'success'
      )
    );
    handleClose();fetchData();
}

// const handleChange=(e)=>{
//   const name= e.target.name;
//   const value=e.target.value;
//   setEdit(prev=>{return{...prev,[name]: value}})
// }

// const updateUser=(e)=>{
//   e.preventDefault();
//   // var data={
//   //     "name":name,
//   //     "email":email,
//   //     "phone":phone
//   // }
//   console.log(edit)

//   fetch(`http://localhost:3001/users/${edit.id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(edit),
//     });
//     setShow(false);
// }

const deleteUser=(id)=>{
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      handleDelete(id)
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
}

const handleDelete=(id)=>{
  fetch(`http://localhost:3001/users/${id}`,{method:'DELETE'}).then(
    fetchData
  )
}

const fetchUserById = (id) => {

  fetch(`http://localhost:3001/users/${id}`)
    .then((data) => {data.json().then((res) =>{
      setEdit(res)
})
})
handleShow();
};

  return (
    <div>

<Navbar className="bg-body-tertiary justify-content-between">
      <Form inline>
       
      </Form>
      <Form inline>
        <Row>
         
         <Link to="add">
          <Col xs="auto">
            <Button type="submit">Add User</Button>
          </Col>
          </Link>
        </Row>
      </Form>
    </Navbar>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>

        {data.map((item) => 
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>
              <Button variant="light" onClick={() => { handleShow(item) }}>Edit</Button>{' '}
              <Button variant="light" onClick={()=>{deleteUser(item.id)}}>Delete</Button>{' '}
              </td>
            </tr>
          )}

        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                defaultValue={edit.name}
                placeholder="name"
                autoFocus
                name='name'
                // onChange={(e)=>{setEdit({"name":e.target.value})}}
                onChange={(e) => { handleChange(e) }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                defaultValue={edit.email}
                placeholder="name@example.com"
                autoFocus
                name='email'
                onChange={(e) => { handleChange(e) }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control
                type="number"
                placeholder="91987654"
                autoFocus
                defaultValue={edit.phone}
                name='phone'
                onChange={(e) => { handleChange(e) }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { updateUser(edit.id) }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default User