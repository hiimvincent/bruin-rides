import { useState, useEffect } from 'react';
import axios from "axios";

import '../App.css';
import RideComponent from './RideComponent'
import Ride from './Ride';
import { Select, MenuItem, TextField, InputLabel   } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';



const destLocs = [
    { value: 0, label: 'LAX' },
    { value: 1, label: 'Downtown LA' },
    { value: 2, label: 'Santa Monica' }
  ]

const fromLocs = [
{ value: 0, label: 'Westwood Loop' },
{ value: 1, label: 'Bruin Bear' },
{ value: 2, label: 'The Hill' }
]

function Search() {

  const [text, setText] = useState("");
  const [allRides, setAllRides] = useState([]);
  const [dest, setDest] = useState(null);
  const [from, setFrom] = useState(null);
  const [dateFilter, setDateFilter] = useState(new Date().toDateString());


  useEffect(() => {
    axios.get("http://localhost:5000/get-all-rides")
      .then((res) => setAllRides(res.data))
      .catch((err) => console.log(err));
  })

  console.log(Date.parse(dateFilter))
  return (
    <div className="App">
      <div className="container">
        <h1>Search Rides</h1>
        <div>
            <Select options={destLocs} autoWidth onChange={setDest} label="Destination">
                {destLocs.map(loc => <MenuItem value={loc.value}>{loc.label}</MenuItem>)}
            </Select>
            <Select options={fromLocs} onChange={setFrom} label="Meeting">
                {fromLocs.map(loc => <MenuItem value={loc.value}>{loc.label}</MenuItem>)}
            </Select>
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
        </div>

        <div className="list">
            {allRides.filter(ride => (dest == null ? true : ride.dest == dest.target.value) 
                            && (from == null ? true : ride.meetPlc == from.target.value)
                            && (Date.parse(ride.date) > Date.parse(dateFilter)))
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