import { useState } from "react";
import "../rideform.css";
import AddInput from "./AddInput";
import SelectComponent from "./SelectComponent";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Auth";


const RideForm = () => {
  const navigate = useNavigate();
  const { setUser, user } = useAuth();
  const [values, setValues] = useState({
    destination: "",
    date: "",
    time: "",
    desc: "",
    grpSize: 0
  });
  const destination = values.destination
  const date = values.date
  const time = values.time
  const desc = values.desc
  const grpSize = values.grpSize
  const riders = [user];

  const [sel, setSel] = useState("");
  const [region, setRegion] = useState("");

  const AddRide = () => {
    axios.post("http://localhost:5000/save-ride", { region, destination, date, time, desc, grpSize, riders })
      .then((res) => {
        console.log(res.data_id);
        const rideID = res.data._id
        console.log({user, rideID})
        axios.post("http://localhost:5000/auth/update-user-rides-by-id", { user, rideID })
        .then((res) => {
          setValues({
            destination: "",
            date: "",
            time: "",
            desc: "",
            grpSize: 0
          });
          setRegion("")
          navigate("/search");
        }) 
        .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  const options = [
    { key: 1, value: "LAX" },
    { key: 2, value: "Downtown" },
    { key: 3, value: "Hollywood" },
    { key: 4, value: "Koreatown" },
    { key: 5, value: "Santa Monica" },
    { key: 6, value: "Burbank" },
  ]

  const locations = ["LAX", "Downtown", "Hollywood", "Koreatown", "Santa Monica", "Burbank"]

  const inputs = [
    {
      id: 1,
      name: "destination",
      type: "text",
      placeholder: "Where are you going?",
      label: "Destination",
      required: true,
    },
    {
      id: 2,
      name: "grpSize",
      type: "number",
      placeholder: "Group Limit",
      label: "Group Limit",
      required: true,
    },
    {
      id: 3,
      name: "date",
      type: "date",
      placeholder: "Date",
      label: "Date",
      required: true,
    },
    {
        id: 4,
        name: "time",
        type: "time",
        placeholder: "Time",
        label: "Time",
        required: true,
    },
    {
        id: 5,
        name: "desc",
        type: "text",
        placeholder: "Put any extra information here",
        label: "Description",
    },
    
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs)
    AddRide();
    //e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="rform">
      <form2 onSubmit={handleSubmit}>
      <h1>Add Ride</h1>
        <SelectComponent
            options={options}
            onChange={(item) => {
                setSel(item);
                setRegion(locations[item - 1]);
            }}
            selectedKey={sel}
            placeholder={"What region are you going to?"}
            label="Region"
        />
        {inputs.map((input) => (
            <AddInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
            />
        ))}
        <button>Submit</button>
      </form2>
    </div>
  );
};

export default RideForm;