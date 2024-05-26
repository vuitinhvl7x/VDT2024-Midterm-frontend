import React from "react";
import StudentList from "./components/StudentList";

function App() {
  return (
    <div className="container mx-auto my-4 flex flex-col items-center">
      <div className="inline-block bg-blue-500 text-white p-2 rounded-lg shadow-lg mb-4">
        <h1 className="text-3xl font-bold text-center">Student List</h1>
      </div>
      <StudentList />
    </div>
  );
}

export default App;
