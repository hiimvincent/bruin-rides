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
            <FormControl fullWidth sx={{m: 1}}>
              <InputLabel id="DestSelect" >Region</InputLabel>
              <Select labelId="DestSelect"  onChange={setDest}>
                  {destLocs.map(loc => <MenuItem value={loc.value}>{loc.value}</MenuItem>)}
              </Select>
            </FormControl>
            { /*<FormControl fullWidth>
              <InputLabel id="MeetSelect">Meeting</InputLabel>
              <Select labelId="DestSelect" onChange={setFrom}>
                  {fromLocs.map(loc => <MenuItem value={loc.value}>{loc.label}</MenuItem>)}
              </Select>
            </FormControl> */}
            <FormControl fullWidth sx={{m: 1}}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                      label="Date"
                      value={dateFilter}
                      onChange={(newValue) => {
                      setDateFilter(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                  />
              </LocalizationProvider>
            </FormControl>
            <FormControl fullWidth sx={{m: 1}}>
              <InputLabel id="ToSelect">From Time</InputLabel>
              <Select labelId="ToSelect"  options={fromLocs} onChange={setToTimeFilter}>
                  {timeOpts.map(loc => <MenuItem value={loc.value}>{loc.label}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{m: 1}}>
              <InputLabel id="FromSelect">To Time</InputLabel>
              <Select labelId="FromSelect" options={fromLocs} onChange={setFromTimeFilter}>
                  {timeOpts.map(loc => <MenuItem value={loc.value}>{loc.label}</MenuItem>)}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="list">
            {allRides.filter(ride => (dest == null ? true : ride.region == dest.target.value) 
                            && (from == null ? true : ride.meetPlc == from.target.value)
                            && (Date.parse(ride.date) > Date.parse(dateFilter))
                            && (toTimeFilter == null ? true : ((toTimeFilter.target.value) <= parseInt(ride.time.substring(0, ride.time.indexOf(":")))))
                            && (fromTimeFilter == null ? true : ((fromTimeFilter.target.value) >= parseInt(ride.time.substring(0, ride.time.indexOf(":"))))))
            .sort((a, b) => {
              let d1 = Date.parse(a.date);
              let d2 = Date.parse(b.date);
              return d1 - d2;
            })
            .map(ride => <Ride
            key={ride._id}
            details={ride}
            />)}
        </div>
      </div>
    </div>
  );
}

export default Search;