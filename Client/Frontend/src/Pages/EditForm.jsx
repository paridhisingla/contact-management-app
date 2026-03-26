import React, { useState } from "react";
import "./EditContactForm.css"; // Create a corresponding CSS file for styling

const EditForm = ({ contactData, onClose, onSave }) => {
  console.log("EditForm rendered for", contactData.firstName);
  const [formData, setFormData] = useState(contactData);
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

  const handleSubmit = () => {
    onSave(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="edit-form-container">
      {console.log("Rendering edit form modal")}
      <div className="edit-form">
        <h2>Edit Contact</h2>
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
        <input
          type="text"
          placeholder="countrycode"
          value={formData.code}
          readOnly
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <div className="button-container">
          <button className="save-button" onClick={handleSubmit}>
            Save
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
