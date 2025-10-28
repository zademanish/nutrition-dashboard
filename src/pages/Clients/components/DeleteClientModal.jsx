import React from "react";
import { useDispatch } from "react-redux";
import { deleteClient } from "../../../redux/slices/clientsSlice";
import { AlertTriangle } from "lucide-react";

const DeleteClientModal = ({ id, onClose }) => {
  const dispatch = useDispatch();
  if (!id) return null;

  const confirmDelete = () => {
    dispatch(deleteClient(id));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl w-full max-w-md">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          <h2 className="text-xl font-bold text-white">Delete Client</h2>
        </div>
        <p className="text-gray-400 mb-6">
          Are you sure you want to delete this client? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 bg-slate-700 hover:bg-slate-600 rounded-lg py-2">
            Cancel
          </button>
          <button onClick={confirmDelete} className="flex-1 bg-red-500 hover:bg-red-600 rounded-lg py-2 text-white">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteClientModal;
