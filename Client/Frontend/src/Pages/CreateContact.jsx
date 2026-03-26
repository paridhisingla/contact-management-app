import React, { useState } from "react";
import "./CreateForm.css"; // Create a corresponding CSS file for styling

const CreateForm = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    code: "",
    email: "",
  });
  const [countryChange, setCountryChange] = useState("");
  const [countries, setCountries] = useState([
    { name: "India", code: "+91" },
    { name: "USA", code: "+1" },
    { name: "UK", code: "+44" },
    { name: "Canada", code: "+1" },
    { name: "Australia", code: "+61" },
    { name: "Germany", code: "+49" },
    { name: "France", code: "+33" },
    { name: "Japan", code: "+81" },
    { name: "China", code: "+86" },
    { name: "Brazil", code: "+55" },
  ]);
  const [Countrycode, setCountryCode] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onCreate(formData);
  };



  const handleCountrycodechange = (e) => {
    const valueSelected = e.target.value;
    setCountryChange(valueSelected);
    const countryData = countries.find(
      (country) => country.name === valueSelected
    );

    if (countryData) {
      setCountryCode(countryData.code);
      // Update the formData with the selected country code
      setFormData({ ...formData, code: countryData.code });
    } else {
      setCountryCode("");
    }
  };
  return (
    <div className="create-form-container">
      <div className="create-form">
        <h2>Create Contact</h2>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
         <label htmlFor="code">Country Code:</label>
        <select onChange={handleCountrycodechange} value={countryChange}>
          <option value="">Select a Country</option>
          {countries.map((country) => (
            <option value={country.name} key={country._id}>
              {country.name}
            </option>
          ))}
        </select>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <div className="button-container">
          <button className="create-button" onClick={handleSubmit}>
            Create
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
