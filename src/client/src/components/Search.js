import { useState, useEffect } from 'react';
import axios from "axios";

import '../App.css';
import RideComponent from './RideComponent'
import Ride from './Ride';
import { Select, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import SelectComponent from "./SelectComponent";

const destLocs = [
  { key: "LAX", value: "LAX" },
  { key: "Downtown", value: "Downtown" },
  { key: "Hollywood", value: "Hollywood" },
  { key: "Koreatown", value: "Koreatown" },
  { key: "Santa Monica", value: "Santa Monica" },
  { key: "Burbank", value: "Burbank" },
]

const fromLocs = [
{ value: 0, label: 'Westwood Loop' },
{ value: 1, label: 'Bruin Bear' },
{ value: 2, label: 'The Hill' }
]

const timeOpts = [
  { value: 0, label: "12:00 AM"},
  { value: 1, label: "1:00 AM"},
  { value: 2, label: "2:00 AM"},
  { value: 3, label: "3:00 AM"},
  { value: 4, label: "4:00 AM"},
  { value: 5, label: "5:00 AM"},
  { value: 6, label: "6:00 AM"},
  { value: 7, label: "7:00 AM"},
  { value: 8, label: "8:00 AM"},
  { value: 9, label: "9:00 AM"},
  { value: 10, label: "10:00 AM"},
  { value: 11, label: "11:00 AM"},
  { value: 12, label: "12:00 PM"},
  { value: 13, label: "1:00 PM"},
  { value: 14, label: "2:00 PM"},
  { value: 15, label: "3:00 PM"},
  { value: 16, label: "4:00 PM"},
  { value: 17, label: "5:00 PM"},
  { value: 18, label: "6:00 PM"},
  { value: 19, label: "7:00 PM"},
  { value: 20, label: "8:00 PM"},
  { value: 21, label: "9:00 PM"},
  { value: 22, label: "10:00 PM"},
  { value: 23, label: "11:00 PM"}
]

const curr = new Date();
const utcDate = new Date(curr.toUTCString());
utcDate.setHours(utcDate.getHours()-8);
const pstcur = new Date(utcDate);
const date = pstcur.toISOString().substring(0,10);

function Search() {

  const [text, setText] = useState("");
  const [allRides, setAllRides] = useState([]);
  const [dest, setDest] = useState(null);
  const [from, setFrom] = useState(null);
  const [dateFilter, setDateFilter] = useState(new Date().toDateString());
  const [fromTimeFilter, setFromTimeFilter] = useState(null);
  const [toTimeFilter, setToTimeFilter] = useState(null);


  useEffect(() => {
    axios.get("http://localhost:5000/get-all-rides")
      .then((res) => setAllRides(res.data))
      .catch((err) => console.log(err));
  })


  return (
    <div className="App">
      <div className="container">
        <h1>Search Rides</h1>
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
            {allRides.filter(ride => (dest == null ? true : ride.region == dest.target.value) 
                            && (from == null ? true : ride.meetPlc == from.target.value)
                            && (Date.parse(ride.date) >= Date.parse(dateFilter))
                            && (toTimeFilter == null ? true : (parseInt(toTimeFilter.getHours() + 8) % 24 >= parseInt(ride.time.substring(0, ride.time.indexOf(":")))))
                            && (fromTimeFilter == null ? true : (parseInt(fromTimeFilter.getHours() + 8) % 24 <= parseInt(ride.time.substring(0, ride.time.indexOf(":"))))))
            .sort((a, b) => {
              let d1 = Date.parse(a.date);
              let d2 = Date.parse(b.date);
              return d1 - d2;
            })
            .map(ride => <Ride
            key={ride._id}
            details={ride}
            />)
            }
            
        </div>
      </div>
    </div>
  );
}

export default Search;