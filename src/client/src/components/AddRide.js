import RideForm from './RideForm';

import '../register.css';

//Render Ride Form on Add Ride Page
function AddRide() {
  return (
    <div className="rform">
      <div className="container">
        <RideForm />
      </div>
    </div>
  );
}

export default AddRide;