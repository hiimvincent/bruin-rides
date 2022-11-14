import { useState, useEffect } from 'react';
import axios from "axios";
import logo from '../blue.png';


import '../App.css';
import RideShareComponent from './RideShareComponent'

function Home() {

  const [text, setText] = useState("");
  const [rides, setRides] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/get-rides")
      .then((res) => setRides(res.data))
      .catch((err) => console.log(err));
  })

  // const addRide = () => {
  //   axios.post("http://localhost:5000/save-ride", { text })
  //     .then((res) => {
  //       console.log(res.data);
  //       setText("");
  //     })
  //     .catch((err) => console.log(err));
  // }

  const deleteRide = (_id) => {
    axios.post("http://localhost:5000/delete-ride", { _id })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  return (
<div className="App">
<div className="container"> 
  <h2> <img src={logo} alt="Logo" width="90" /> Bruin Rides </h2>
</div>
<div className="homepageText">
  <p>
  <b>Bruin Rides</b> is a website where students from UCLA can coordinate sharing an Uber or Lyft ride.
  </p>
  <br></br>
  <p>
  Whether it's sightseers looking for fun in <a href="google.com">downtown LA</a>, beach-goers headed to <a href ="google.com">Santa Monica</a>,
  or even Bruins hoping to get a better rate on their trip to <a href="google.com">LAX</a>, 
  Bruin Rides hopes to be the central location for students to coordinate splitting fares.
  </p>
  <br></br>
  <hr></hr>
  <br></br>
  <p>
  <b>To get started</b> <a href="google.com">log in or sign up</a> and search for your ride by: destination, date, and time. 
  </p><p>If you can't find a ride you want, take the initiative and <a href="google.com">make your own ride</a> for others to join in on. 
  </p>
  <br></br>
  <br></br>
  <br></br>
  <h3>Some Rides On Our Page Now</h3>
</div>
<div className="list" font-size="20px">
          {rides.map(ride => <RideShareComponent
            key={ride._id}
            remove={() => deleteRide(ride._id)}
            region={ride.region}
            destination={ride.destination}
            date={ride.date}
            time={ride.time}
            desc={ride.desc}
          />)}
</div>

</div>
  );
}

export default Home;

  /*
    <div className="App">
      <div className="container"> 
        <h2> <img src={logo} alt="Logo" width="90" /> Bruin Rides </h2>
        {/* <div className="top">
          <input
            type="text"
            placeholder='Ride info...'
            value={text}
            onChange={(e) => setText(e.target.value)} />
          <div className="add"
            onClick={addRide}>{"Add"}</div>
        </div> }

        <div className="list">
          {rides.map(ride => <RideShareComponent
            key={ride._id}
            remove={() => deleteRide(ride._id)}
            region={ride.region}
            destination={ride.destination}
            date={ride.date}
            time={ride.time}
            desc={ride.desc}
          />)}
        </div>

      </div>
    </div>
*/

/*
<div className="homepageAboutUs">
<figure>
  <img src="https://via.placeholder.com/150" alt="Trulli" style="width:40%"/>
  <figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption>
</figure>
<figure>
  <img src="https://via.placeholder.com/150" alt="Trulli" style="width:40%"/>
  <figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption>
</figure>

<br></br>
<figure>
  <img src="https://via.placeholder.com/150" alt="Trulli" style="width:30%"/>
  <figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption>
</figure>
<figure>
  <img src="https://via.placeholder.com/150" alt="Trulli" style="width:30%"/>
  <figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption>
</figure>
<figure>
  <img src="https://via.placeholder.com/150" alt="Trulli" style="width:30%"/>
  <figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption>
</figure>

</div>
*/
