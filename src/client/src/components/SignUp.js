import Register from './Register';

import '../App.css';

//Render sign up page by rendering register component
function SignUp() {
  return (
    <div className="App">
      <div className="container">
        <Register />
      </div>
    </div>
  );
}

export default SignUp;