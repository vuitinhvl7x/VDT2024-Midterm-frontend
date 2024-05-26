import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentItem from "./StudentItem";
import AddStudentForm from "./AddStudentForm";

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <AddStudentForm setStudents={setStudents} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {students.map((student) => (
          <StudentItem
            key={student.id}
            student={student}
            setStudents={setStudents}
          />
        ))}
      </div>
    </div>
  );
}

export default StudentList;
