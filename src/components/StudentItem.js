import React, { useState } from "react";
import EditStudentForm from "./EditStudentForm";
import DeleteStudentButton from "./DeleteStudentButton";

function StudentItem({ student, setStudents }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDeleteSuccess = (deletedId) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== deletedId)
    );
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border p-4 rounded-lg shadow-lg bg-white flex flex-col items-center">
      {isEditing && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <EditStudentForm
              student={student}
              setStudents={setStudents}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}
      <div onClick={handleToggleExpand} className="cursor-pointer">
        <h3 className="text-xl font-bold mb-2 text-center">
          {student.student_name}
        </h3>
        {!isExpanded && (
          <div>
            <p>University: {student.university}</p>
            <p>Gender: {student.gender}</p>
          </div>
        )}
        {isExpanded && (
          <div>
            <p>University: {student.university}</p>
            <p>Gender: {student.gender}</p>
            <p>Email: {student.email}</p>
            <p>Phone Number: {student.phonenumber}</p>
            <p>Region: {student.region}</p>
            <p>Birth Year: {student.birth_year}</p>
            {/* Add other fields here */}
          </div>
        )}
      </div>
      <div className="mt-2 flex justify-center">
        <button
          onClick={handleEdit}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
        >
          Edit
        </button>
        <DeleteStudentButton
          id={student.id}
          setStudents={setStudents}
          onDeleteSuccess={handleDeleteSuccess}
        />
      </div>
    </div>
  );
}

export default StudentItem;
