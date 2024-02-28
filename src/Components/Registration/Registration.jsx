import { Button, Container, Form, Modal, Table } from 'react-bootstrap';
import React, { useState } from 'react';


function Registration() {

    const [show, setShow] = useState(true);
    const [allData, setAllData] = useState([{}]);

    const getFormData = (e) => {
        e.preventDefault();
        let form = e.target;
        // console.log(form);
        let formData = new FormData(form);
        // console.log(formData.get("Fullname"));
        // console.log(formData.get("Email"));
        // console.log(formData.get("Password"));
        // console.log(formData.get("Profile"));
        // console.log(formData.get("Mobilenumber"));

        let temp = {}

        for (let data of formData.entries()) {
            // console.log(data);
            let key = data[0];
            let value = data[1];
            // console.log(value);
            // console.log(typeof(value));

            if (typeof (value) == 'object') {
                value = URL.createObjectURL(value)
            }
            // console.log(value)

            temp[key] = value;
            console.log(temp)

        }

        return (
            setAllData((old) => {
                return [
                    ...old,
                    temp
                ]
            }),
            setShow(false)
        )
    }

    function deleteUser(index){
        let temdata= [...allData];
        temdata.splice(index,1);
        window.confirm('Do you want to delete the data???')
        return(
            setAllData(temdata)
        )

    }

    function Tr({ item }) {
        return (
            <>
                <tr className='text-center'>
                    <td>{item.index + 1}</td>
                    <td>{item.Fullname}</td>
                    <td>{item.Email}</td>
                    <td>{item.Password}</td>
                    <td>{item.Mobilenumber}</td>
                    <td><img src={item.Profile} alt='' width={50} height={50} className='rounded-circle'></img></td>
                    <td>
                        <Button className='me-2'>
                            <i className="fa fa-edit"></i>
                        </Button>

                        <Button variant='danger' onClick={()=>{deleteUser(item.index)}}>
                            <i className="fa fa-trash"></i>
                        </Button>
                    </td>
                </tr>
            </>
        )
    }

    return (
        <>
            <h1 className='text-center'>Registration Details</h1>

            <Button className='position-absolute bottom-0 end-0 me-3 mb-3 rounded-circle' onClick={() => setShow(true)}>
                <i className='fa fa-plus'></i>
            </Button>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>User Registration Form</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={getFormData}>
                        <Form.Group>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type='text' name='Fullname' placeholder='Enter Your Full Name' />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' name='Email' placeholder='Enter Your Email' />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' name='Password' placeholder='Enter Your Password' />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control type='tel' name='Mobilenumber' placeholder='Enter Your Mobile Number' />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Profile Image</Form.Label>
                            <Form.Control type='file' name='Profile' placeholder='Insert Your Image' />
                        </Form.Group>

                        <br></br>

                        <Button type='submit' variant='primary' className='me-2'>Submit</Button>
                        <Button type='reset' variant='danger'>Cancel</Button>
                    </Form>
                </Modal.Body>

            </Modal>

            {/* <p>{JSON.stringify(allData)}</p> */}
            <Container>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Sr No</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Mobile Number</th>
                            <th>Profile Picture</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allData.map((item, index) => {
                                item['index'] = index;
                                return <Tr item={item} key={index} />
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    )
}
export default Registration;