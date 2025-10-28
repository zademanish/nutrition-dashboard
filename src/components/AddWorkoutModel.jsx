import React, { useState } from "react";
import { X } from "lucide-react";

const AddWorkoutModal = ({ onClose, onSave }) => {
  const [workout, setWorkout] = useState({
    name: "",
    duration: "",
    type: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!workout.name || !workout.duration) {
      alert("Please enter workout name and duration!");
      return;
    }
    onSave(workout);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-xl p-6 w-full max-w-md text-white shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add Workout</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-300">Workout Name</label>
            <input
              name="name"
              value={workout.name}
              onChange={handleChange}
              placeholder="e.g. Push Day"
              className="w-full mt-1 p-2 rounded-md bg-white/10 text-white placeholder-gray-400 outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300">Duration (mins)</label>
            <input
              name="duration"
              type="number"
              value={workout.duration}
              onChange={handleChange}
              placeholder="45"
              className="w-full mt-1 p-2 rounded-md bg-white/10 text-white placeholder-gray-400 outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300">Type</label>
            <select
              name="type"
              value={workout.type}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded-md bg-white/10 text-white outline-none"
            >
              <option value="">Select Type</option>
              <option value="Strength">Strength</option>
              <option value="Cardio">Cardio</option>
              <option value="Mobility">Mobility</option>
              <option value="Core">Core</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-300">Description</label>
            <textarea
              name="description"
              value={workout.description}
              onChange={handleChange}
              placeholder="Short description of the workout..."
              className="w-full mt-1 p-2 rounded-md bg-white/10 text-white placeholder-gray-400 outline-none"
              rows="3"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-white/30 rounded-md text-sm hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-yellow-500 text-black font-medium rounded-md hover:bg-yellow-400"
          >
            Save Workout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWorkoutModal;
