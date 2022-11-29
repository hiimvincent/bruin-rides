import { useState, useEffect } from 'react';
import axios from "axios";

import '../App.css';
import RideComponent from './RideComponent'
import Ride from './Ride';
import { ProgressBar } from  'react-loader-spinner'


const destLocs = [
  { key: "LAX", value: "LAX" },
  { key: "Downtown", value: "Downtown" },
  { key: "Hollywood", value: "Hollywood" },
  { key: "Koreatown", value: "Koreatown" },
  { key: "Santa Monica", value: "Santa Monica" },
  { key: "Burbank", value: "Burbank" },
]


const curr = new Date();
const utcDate = new Date(curr.toUTCString());
utcDate.setHours(utcDate.getHours()-8);
const pstcur = new Date(utcDate);
const date = pstcur.toISOString().substring(0,10);

function Search() {

  const [toRender, setRender] = useState("");
  const [dest, setDest] = useState(null);
  const [dateFilter, setDateFilter] = useState(new Date().toDateString());
  const [fromTimeFilter, setFromTimeFilter] = useState(null);
  const [toTimeFilter, setToTimeFilter] = useState(null);


  useEffect(() => {
    fetchData();
  })
  
  const fetchData = () => {
    axios.get("http://localhost:5000/get-all-rides")
    .then((res) => {
    setRender(res.data.filter(ride => (dest == null ? true : ride.region == dest.target.value) 
                && (Date.parse(ride.date) >= Date.parse(dateFilter))
                && (toTimeFilter == null ? true : (parseInt(toTimeFilter.getHours() + 8) % 24 >= parseInt(ride.time.substring(0, ride.time.indexOf(":")))))
                && (fromTimeFilter == null ? true : (parseInt(fromTimeFilter.getHours() + 8) % 24 <= parseInt(ride.time.substring(0, ride.time.indexOf(":"))))))
          .sort((a, b) => {
          let d1 = Date.parse(a.date);
          let d2 = Date.parse(b.date);
          return d1 - d2;
          })
          .map(ride => <div key={ride._id}>
            <Ride 
              details={ride}
              onDelete={fetchData}
            />
            </div>))
  
    })
    .catch((err) => console.log(err));
  }


  return (
    <div className="App">
      <div className="container">
        <div className='searchHeader'>
          <h1>Search</h1>
        </div>
            <div>
              <div className='filter'>
                <div class="filterField">
                  <label>Destination</label>
                    <div className="selectWrapper">
                    <select className="selectBox" onChange={setDest}>
                      <option value="" disabled>Destination</option>
                      {destLocs.map(loc => <option value={loc.value}>{loc.value}</option>)}
                    </select>
                    </div>
                  </div>
                <div class="filterField">
                  <label>Date</label>
                  <input name="date" type="date" label="Date" defaultValue={date} onChange={(ev) => 
                    { 
                      const date = new Date(ev.target.valueAsDate);

                      setDateFilter(date.toUTCString())}
                    }></input>
                </div>
                <div class="filterField">
                  <label>From Time</label>
                <input name="fromTime" type="time" label="FromTime" onChange={(ev) => {setFromTimeFilter(ev.target.valueAsDate)}}></input>
              </div>
                <div class="filterField">
                  <label>To Time</label>
                  <input name="toTime" type="time" label="toTime" onChange={(ev) => {setToTimeFilter(ev.target.valueAsDate)}}></input>
                </div>
              </div>
            </div>

            <div classname="list">
            {toRender ?
                  <div className='rides'>
                  {toRender} 
                  </div>
                  :
                  <center>
                  <ProgressBar
                      height="80"
                      width="160"
                      ariaLabel="progress-bar-loading"
                      wrapperStyle={{}}
                      wrapperClass="progress-bar-wrapper"
                      borderColor = '#eed445'
                      barColor = '#2773ad'
                    />
                  </center>
                }
            </div>
      </div>
    </div>
  );
}

export default Search;