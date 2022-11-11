import { useState } from "react";
import "../rideform.css";
import AddInput from "./AddInput";
import SelectComponent from "./SelectComponent";

const RideForm = () => {
  const [values, setValues] = useState({
    destination: "",
    date: "",
    time: "",
    description: "",
  });

  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    { key: 1, value: "LAX" },
    { key: 2, value: "Downtown" },
    { key: 3, value: "Hollywood" },
    { key: 4, value: "Koreatown" },
    { key: 5, value: "Santa Monica" },
    { key: 6, value: "Burbank" },
  ]

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
      name: "date",
      type: "date",
      placeholder: "Date",
      label: "Date",
      required: true,
    },
    {
        id: 3,
        name: "time",
        type: "time",
        placeholder: "Time",
        label: "Time",
        required: true,
    },
    {
        id: 4,
        name: "description",
        type: "text",
        placeholder: "Put any extra information here",
        label: "Description",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="rform">
      <form onSubmit={handleSubmit}>
        <h1>Add Ride</h1>
        <SelectComponent
            options={options}
            onChange={(item) => setSelectedOption(item)}
            selectedKey={selectedOption}
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
      </form>
    </div>
  );
};

export default RideForm;