import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import appClient from '../../../network/AppClient'
import { Modal } from 'react-bootstrap'
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

interface AttenDanceUpdate{
  id : number,
  first_name : string,
  last_name : string,
  status : string,
  status_time : string
}

const UpdateAttendance : React.FC =  () => {
  const {userId} = useParams()
  const [attendance,setAttendance]  = useState<AttenDanceUpdate[]>([])
  const [name,setName] = useState("")
  const [time, setTime] = useState('10:00');
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [selectedAttendance,setSelectedAtendance] = useState<AttenDanceUpdate| null>(null)
  const updateTime = (attendance : AttenDanceUpdate)=>{
   setSelectedAtendance(attendance)
   setShowUpdateModal(true)
  }
  console.log("This is the id ",userId)
  const fetchAttendanceData =async ()=>{
    const result = await appClient.get(`todayEmployeeActivity/?id=${userId}`)
    setAttendance(result.data)
  }
  const UpdateAttendanceTime=(time: string)=>{
    console.log("finally the latest updated time is ",selectedAttendance?.status_time)
    const date = selectedAttendance?.status_time   

  
    }
  useEffect(()=>{
    fetchAttendanceData()
  },[])
  const handleTimeChange = (time: any)=>{
    setTime(time)
  }
  console.log("this is the Attendance Data",attendance)
  console.log("THis is the updated time i get",time)
  return (
    <div style={{marginLeft:`260px`}}>
         <table className="table">
        <thead>
          <tr>
           <th scope="col">Id</th>
            <th scope="col">FirstName</th>
            <th scope="col">LastName</th>
            <th scope="col">Status</th>
            <th scope="col">Status Time</th>             
            <th scope="col">update</th>      
          </tr>
        </thead>
        <tbody>
        
        { attendance.map((att,index)=>((
        <tr key = {index}>    
           <th scope="row">{att.id}</th>  
          <th scope="row">{att.first_name}</th>   
          <th scope="row">{att.last_name}</th>     
          <td>{att.status}</td>    
          <td>{att.status_time}</td>         
          <td><Button onClick={()=>{updateTime(att)}}>Update</Button></td>
      </tr>
  )))}          
        </tbody>
      </table>
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Update</Modal.Title>
    </Modal.Header>
    <Modal.Body className="modal-body">   
    
    {/* <input onChange={handleTimeChange} value={time} aria-label="Time" type="time" /> */}
       <TimePicker
                    value={time}
                    onChange={handleTimeChange}
                    format="HH:mm"  
                               
                />           

        <div>
        <button onClick={()=>{UpdateAttendanceTime(time)}}>Submit</button>
        </div>    
       
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
    </div>
  )
}

export default UpdateAttendance