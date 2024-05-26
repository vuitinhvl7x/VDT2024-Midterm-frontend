import React, { useState } from "react";
import axios from "axios";

function EditStudentForm({ student, setStudents, onCancel }) {
  const [formData, setFormData] = useState({
    student_name: student.student_name,
    university: student.university,
    gender: student.gender,
    email: student.email,
    phonenumber: student.phonenumber,
    region: student.region,
    birth_year: student.birth_year,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateFormData(formData);
    if (Object.keys(formErrors).length === 0) {
      axios
        .put(`http://localhost:4000/api/students/${student.id}`, formData)
        .then((response) => {
          setStudents((prevStudents) =>
            prevStudents.map((s) => (s.id === student.id ? response.data : s))
          );
          onCancel();
        })
        .catch((error) => console.error("Error editing student:", error));
    } else {
      setErrors(formErrors);
    }
  };

  const validateFormData = (data) => {
    const errors = {};
    if (!data.student_name.trim()) {
      errors.student_name = "Student name is required";
    }
    if (!data.university.trim()) {
      errors.university = "University is required";
    }
    if (!data.email.trim() || !/^\S+@\S+\.\S+$/.test(data.email)) {
      errors.email = "Invalid email address";
    }
    if (!data.phonenumber.trim() || !/^\d+$/.test(data.phonenumber)) {
      errors.phonenumber = "Invalid phone number";
    }
    if (!data.region.trim()) {
      errors.region = "Region is required";
    }
    if (
      !data.birth_year ||
      data.birth_year < 1980 ||
      data.birth_year > new Date().getFullYear()
    ) {
      errors.birth_year = "Invalid birth year";
    }
    return errors;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md p-4 border rounded-lg shadow-lg bg-white"
    >
      <h3 className="text-lg font-bold mb-4 text-center">Edit Student</h3>
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
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditStudentForm;
