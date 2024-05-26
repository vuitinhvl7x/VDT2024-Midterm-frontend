// src/components/StudentList.js

import React, { useEffect, useState } from "react";
import { fetchWithFallback, primaryUrl, fallbackUrl } from "../api";
import StudentItem from "./StudentItem";
import AddStudentForm from "./AddStudentForm";

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const students = await fetchWithFallback(primaryUrl, fallbackUrl);
      setStudents(students);
    };

    fetchStudents();
  }, []);

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
