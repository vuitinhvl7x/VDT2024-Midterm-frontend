import React, { useState } from "react";
import axios from "axios";

function AddStudentForm({ setStudents }) {
  const [formData, setFormData] = useState({
    student_name: "",
    university: "",
    gender: "Male",
    email: "",
    phonenumber: "",
    region: "",
    birth_year: "",
  });

  const [isMinimized, setIsMinimized] = useState(true);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.student_name.trim()) {
      errors.student_name = "Student Name is required";
    }
    if (!formData.university.trim()) {
      errors.university = "University is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.phonenumber.trim()) {
      errors.phonenumber = "Phone Number is required";
    } else if (!/^\d+$/.test(formData.phonenumber)) {
      errors.phonenumber = "Phone Number must contain only numbers";
    }
    if (!formData.region.trim()) {
      errors.region = "Region is required";
    }
    if (!formData.birth_year) {
      errors.birth_year = "Birth Year is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios
        .post("http://192.168.56.61:30001/api/students", formData)
        .then((response) => {
          setStudents((prevStudents) => [...prevStudents, response.data]);
          setFormData({
            student_name: "",
            university: "",
            gender: "Male",
            email: "",
            phonenumber: "",
            region: "",
            birth_year: "",
          });
        })
        .catch((error) => console.error("Error adding student:", error));
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="flex justify-center mt-8">
      {isMinimized ? (
        <button
          onClick={handleMinimize}
          className="inline-block bg-blue-500 text-white p-2 rounded-lg shadow-lg hover:bg-blue-600"
        >
          Add Student
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-4 border rounded-lg shadow-lg bg-white relative"
        >
          <button
            type="button"
            onClick={handleMinimize}
            className="absolute top-0 right-0 mt-2 mr-2 bg-blue-500 text-white p-2 rounded-lg shadow-lg hover:bg-blue-600"
          >
            &#x2212;
          </button>
          <h3 className="text-lg font-bold mb-4 text-center">
            Add New Student
          </h3>
          <div className="mb-4">
            <input
              type="text"
              name="student_name"
              value={formData.student_name}
              onChange={handleChange}
              placeholder="Student Name"
              className={`w-full border p-2 rounded ${
                errors.student_name ? "border-red-500" : ""
              }`}
            />
            {errors.student_name && (
              <p className="text-red-500">{errors.student_name}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              placeholder="University"
              className={`w-full border p-2 rounded ${
                errors.university ? "border-red-500" : ""
              }`}
            />
            {errors.university && (
              <p className="text-red-500">{errors.university}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full border p-2 rounded ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className={`w-full border p-2 rounded ${
                errors.phonenumber ? "border-red-500" : ""
              }`}
            />
            {errors.phonenumber && (
              <p className="text-red-500">{errors.phonenumber}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              placeholder="Region"
              className={`w-full border p-2 rounded ${
                errors.region ? "border-red-500" : ""
              }`}
            />
            {errors.region && <p className="text-red-500">{errors.region}</p>}
          </div>
          <div className="mb-4">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="birth_year"
              value={formData.birth_year}
              onChange={handleChange}
              placeholder="Birth Year"
              className={`w-full border p-2 rounded ${
                errors.birth_year ? "border-red-500" : ""
              }`}
            />
            {errors.birth_year && (
              <p className="text-red-500">{errors.birth_year}</p>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Student
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddStudentForm;
