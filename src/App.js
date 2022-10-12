import './App.css';
import React,{useEffect, useState} from 'react';

function App() {
  const [checkinlist,setinlist]=useState( JSON.parse(localStorage.getItem("checkinlist")) || []);
  const [Drivername,setname]=useState('');
  const [lisence,setlisence]=useState('');


  const [checkoutlist,setoutlist]=useState( JSON.parse(localStorage.getItem("checkoutlist")) || []);
  const [lisenceno,setlisenceno]=useState('');

  let maxparking=50;
  const[parking,setparking]=useState(0);

  //add check in data
  const handlecheckin=(e)=>{
    e.preventDefault();
    if(parking<maxparking){
    const Intime=(new Date().getDate()+'/'+new Date().getMonth()+' - '+new Date().getMinutes()+':'+new Date().getHours()).toString()
    const list=[...checkinlist];
    list.push({
      Drivername,
      lisence,
      Intime
    });
  setinlist(list);
    alert(` Driver name: ${Drivername}  
    \n Lisence No.: ${lisence} 
    \n Check-In time: ${Intime}
    `);
    setparking(parking+1);
    setlisence('');
    setname('');
  }
    else{
      alert(`Sorry!\n Parking is full.\n Please park another place.`)
    }

  }
//add checkout data
  const handlecheckout=(e)=>{
    e.preventDefault();
    let outtime=(new Date().getDate()+'/'+new Date().getMonth()+' - '+new Date().getMinutes()+':'+new Date().getHours()).toString()
    let listout=[...checkoutlist];
    listout.push({
      lisenceno,
      outtime
    });
    alert(` 
    Thank you! for using our service 
    \n Lisence No.: ${lisenceno} 
    \n Check-out time: ${outtime}
    `);
    setoutlist(listout);
    setparking(parking-1);
    setlisenceno('');
  }

  
 // Print data
  const indetail=()=>{
    return (checkinlist.map((detail,i)=>{
      return (
        <tr key={i}>
          <td>{i}</td>
          <td>{detail.Drivername}</td>
          <td>{detail.lisence}</td>
          <td>{detail.Intime}</td>
        </tr>
      );
  }));
  }
  const outdetail=()=>{
    return checkoutlist.map((detail)=>{
      return (
        <tr>
          <td>{detail.lisenceno}</td>
          <td>{detail.outtime}</td>
        </tr>);
  });
  }

  useEffect(()=>{
    localStorage.setItem("checkinlist",JSON.stringify(checkinlist))
  },[checkinlist]);

  useEffect(()=>{
    localStorage.setItem("checkoutlist",JSON.stringify(checkoutlist))
  },[checkoutlist]);

  return (
    <div className="App">
      <div className='heading'>
        <h1 className='mainhead'>Parking App</h1>
        <h4 className='subhead'>Welcome To our parking service</h4>
      </div>
      <div>
       <h1>Number of Paking available {maxparking-parking}</h1> 
      </div>
      <div className='entry'>
        <div className='checkindiv'>
          <h2>Check In</h2>
        <form onSubmit={handlecheckin} >
          <label>Driver name</label>
          <input type='text' value={Drivername} onChange={(e)=>setname(e.target.value)} />
          <br></br>
          <label>lisence no.</label>
          <input type='text' value={lisence} onChange={(e)=>setlisence(e.target.value)} />
          <br></br>
          <button type="submit" className='btn' >Check In</button>
        </form>
        </div>
        <div className='checkoutdiv'>
          <h2>Check Out</h2>
        <form onSubmit={handlecheckout} >
          <label>lisence no.</label>
          <input type='text' value={lisenceno} onChange={(e)=>setlisenceno(e.target.value)} />
          <br></br>
          <button type="submit" className='btn' >Check Out</button>
        </form>
        </div>
      </div> 
      <div className='list'>
          {checkinlist.length>0 && <>
            <div className='checkintable'>
            <h3>Check-In List</h3>
          <table className='tablein'>
            <thead>
              <tr>
                <th>Idno.</th>
                <th>Driver Name</th>
                <th>Lisence Number</th>
                <th>Check-In Time</th>
              </tr>
            </thead>
            <tbody>
            {indetail()}
            </tbody>
          </table>
        </div>
          </>}
        {checkinlist.length>0 && <>
          <div className='checkouttable'>
        <h3>Check-out List</h3>
          <table className='tablein'>
            <thead>
              <tr>
                <th>Lisence Number</th>
                <th>Check-Out Time</th>
              </tr>
            </thead>
            <tbody>
            {outdetail()}
            </tbody>
          </table>
        </div>
        </>} 
        

      </div>
    </div>
  );
}

export default App;
