import React, { useState } from "react";
import "../App.css";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    start: "",
    end: "",
    email: "",
    phone: ""
  });

  const formHandler = async (e) => {
    e.preventDefault();

    // Check for time conflicts before submitting the form
    const conflicts = await checkTimeConflicts(formData.date, formData.start, formData.end);

    if (conflicts) {
      alert("Selected time is already booked. Please choose a different time.");
    } else {
      // If no conflicts, proceed with submitting the form
      submitForm();
    }
  };

  const checkTimeConflicts = async (date, start, end) => {
    try {
      const response = await fetch(`http://localhost:5000/sign?date=${date}&start=${start}&end=${end}`);
      const data = await response.json();
      return data.conflicts; // Assuming the server responds with a property 'conflicts'
    } catch (error) {
      console.error("Error checking time conflicts:", error);
      return true; // Assume conflict in case of an error
    }
  };

  const submitForm = async () => {
    try {
      // Proceed with submitting the form (making a POST request to sign endpoint)
      const response = await fetch("http://localhost:5000/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      console.log(response);

      // Clear form data after submission
      setFormData({
        name: "",
        date: "",
        start: "",
        end: "",
        email: "",
        phone: ""
      });

      alert("Thank you for submitting!");
      // Handle the response as needed (e.g., show success message)
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={formHandler}>
         
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" className="form-control" id="name" name="name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input type="date" className="form-control" id="date" name="date" onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="start">Start Time:</label>
              <input type="time" className="form-control" id="start" name="start" onChange={(e) => setFormData({ ...formData, start: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="end">End Time:</label>
              <input type="time" className="form-control" id="end" name="end" onChange={(e) => setFormData({ ...formData, end: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="text" className="form-control" id="email" name="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input type="text" className="form-control" id="phone" name="phone" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
