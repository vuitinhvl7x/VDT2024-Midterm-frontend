import React, { useState } from "react";
import axios from "axios";

function ConfirmDeleteModal({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-4 rounded-lg">
        <p className="mb-4">Are you sure you want to delete this student?</p>
        <div className="flex justify-center">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteStudentButton({ id, onDeleteSuccess }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    axios
      .delete(`http://192.168.56.61:30001/api/students/${id}`)
      .then(() => {
        onDeleteSuccess(id);
      })
      .catch((error) => console.error("Error deleting student:", error));
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Delete
      </button>
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default DeleteStudentButton;
