import bear from '../BruinBear.jpg';


import '../App.css';

function Home() {
  return (
    <div className="App">
      <div className="container"></div>
      <center>
        <div className="row">
          <div className="homepageText largeCol">
            <br></br>
            <div className="aform">
              <form>
                <br></br>
                <p>
                  <b>Bruin Rides</b> offers UCLA students a platform to coordinate carpooling.
                </p>
                <br></br>
                <p>
                  Whether it's sightseers looking for fun in downtown LA, beach-goers headed to Santa Monica,
                  or even Bruins hoping to get a better rate on their trip to LAX, 
                  Bruin Rides is the central location for all UCLA students looking to split transportation costs.
                </p>
                <br></br>
                <p>Find rides created by fellow Bruins or create your own ride for others to join. </p> 
                <br></br>
                <hr></hr>
                <br></br>
                <p>
                <b>To get started</b> log in or sign up and search for rides by destination, date, or time. 
                </p>
                <br></br>
              </form>
            </div>
          </div>
          <div className="imgCol">
            <img className="homeImage" src ={bear}/>
          </div>
        </div>
      </center>
    </div>
  );
}

export default Home;
