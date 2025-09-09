
import { Formik } from 'formik';
import { io } from "socket.io-client";
import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [roomId, setRoomId] = useState('');
  const [role, setRole] = useState('interviewee');
  const navigate = useNavigate();
  const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:5000");
  const joinRoom = () => {
    if (roomId && role) {
      console.log('Socket object before emit:', socket);

      socket.emit('join_room', { roomId, role });


      navigate(`/mock-interviews/room/${roomId}?role=${role}`);
    }
  };

  return (



   <div className="d-flex justify-content-center">
      <Card className="p-3 w-100" style={{ maxWidth: '500px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Interview Room</h2>
          
         
         
          
          <Formik
           
           initialValues={{
    roomId: '',
    role: '', 
  }}
 
            
            onSubmit={joinRoom}
          >
            {({
              
              errors,
              touched,
            
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>RoomID</Form.Label>
                  <Form.Control
                    type="text"
                    name="RoomID"
value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    onBlur={handleBlur}
                    isInvalid={touched.RoomID && errors.RoomID}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.RoomID}
                  </Form.Control.Feedback>
                </Form.Group>
















                <Form.Group className="mb-3" style={{ justifyItems: 'center' }}>
                
                  <div className="d-flex align-items-center border rounded p-2" style={{ width: '193px' }}>
  <div className="fw-semibold" style={{marginLeft: '7px', marginRight: '5px'}}>Role</div>
  <select
    className="form-select flex-grow-1"
    value={role}
    onChange={(e) => setRole(e.target.value)}
    style={{backgroundColor: 'honeydew'}}
  >
    <option value="interviewee">Interviewee</option>
    <option value="interviewer">Interviewer</option>
  </select>
</div>
                </Form.Group>

               

               

                <Button onClick={joinRoom} type="submit"  disabled={isSubmitting} style={{ width: '125px' }}>
                 Join
                </Button>
              </Form>
            )}
          </Formik>

       
        </Card.Body>
      </Card>
    </div>




//       /* <div className= "row g-3" style={{ padding: '20px',display: 'grid', justifyItems: 'center' }}>
//       <input
//         placeholder="Room ID"
//         value={roomId}
//         onChange={(e) => setRoomId(e.target.value)}
//         type="text"
//         style={{width: '222px'}}
//       />
//      /* <div className="d-flex align-items-center border rounded p-2" style={{ width: '112px' }}>
//   <div className="fw-semibold" style={{marginLeft: '7px', marginRight: '5px'}}>Role</div>
//   <select
//     className="form-select flex-grow-1"
//     value={role}
//     onChange={(e) => setRole(e.target.value)}
//   >
//     <option value="interviewee">Interviewee</option>
//     <option value="interviewer">Interviewer</option>
//   </select>
// </div> */

//       <button onClick={joinRoom} style={{width: '220px'}}>Join</button>
//     </div> */
  );
};

export default HomePage;
