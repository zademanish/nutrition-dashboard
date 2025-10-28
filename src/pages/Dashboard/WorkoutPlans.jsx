import React, { useState } from "react";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiCopy } from "react-icons/fi";
import { FaRegPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const initialPlans = [
  {
    id: 1,
    title: "Beginner Full Body",
    description: "Balanced low-calorie meal plan for sustainable weight loss",
    duration: "8 weeks",
    frequency: "3x/week",
    time: "45 min",
    tags: ["Beginner", "Full Body", "Strength"],
  },
  {
    id: 2,
    title: "HIIT Fat Burn",
    description: "Balanced low-calorie meal plan for sustainable weight loss",
    duration: "28 days",
    frequency: "3x/week",
    time: "45 min",
    tags: ["Low Calorie", "High Protein", "Balanced"],
  },
  {
    id: 3,
    title: "Flexibility & Mobility",
    description: "Balanced low-calorie meal plan for sustainable weight loss",
    duration: "28 days",
    frequency: "3x/week",
    time: "45 min",
    tags: ["Low Calorie", "High Protein", "Balanced"],
  },
];

const WorkoutPlans = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate()

  const handleDelete = (id) => {
    setPlans(plans.filter((plan) => plan.id !== id));
  };

  const handleDuplicate = (id) => {
    const planToCopy = plans.find((plan) => plan.id === id);
    const newPlan = { ...planToCopy, id: Date.now(), title: `${planToCopy.title} (Copy)` };
    setPlans([...plans, newPlan]);
  };

  const handleAssign = (title) => {
    alert(`Assigned "${title}" to clients!`);
  };

  const handleCreateNew = () => {
    const newPlan = {
      id: Date.now(),
      title: "New Custom Plan",
      description: "Describe your workout plan here...",
      duration: "4 weeks",
      frequency: "3x/week",
      time: "45 min",
      tags: ["Custom"],
    };
    setPlans([...plans, newPlan]);
  };

  const filteredPlans = plans.filter((plan) =>
    plan.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 border rounded-md border-gray-500  text-white">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Workout</h2>
        <p className="text-md text-gray-300">Manage your workouts and fitness.</p>
      </div>

      {/* Search and Create */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center bg-white/10 rounded-lg px-3 py-2 w-full sm:w-1/2">
          <FiSearch className="text-gray-300 mr-2" />
          <input
            type="text"
            placeholder="Search meal plan"
            className="bg-transparent outline-none w-full text-gray-200 p-2 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
         onClick={() => navigate("/workouts/create")}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition rounded-md px-4 py-3 text-lg font-medium"
        >
          <FiPlus /> Create New Plan
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mt-10 ">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white/10 rounded-md p-8 shadow-md hover:bg-white/20 transition"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold">{plan.title}</h3>
              <div className="flex gap-2 text-gray-300">
                <button onClick={() => handleDuplicate(plan.id)}>
                  <FiCopy className="hover:text-white transition" />
                </button>
                <button onClick={() => alert("Edit feature coming soon!")}>
                  <FiEdit2 className="hover:text-white transition" />
                </button>
                <button onClick={() => handleDelete(plan.id)}>
                  <FiTrash2 className="hover:text-red-400 transition" />
                </button>
              </div>
            </div>

            <p className="text-lg text-gray-300 mt-10">{plan.description}</p>

            <div className="flex flex-wrap text-xs gap-3 text-gray-200 mt-5">
              <span>📅 {plan.duration}</span>
              <span>🏋️ {plan.frequency}</span>
              <span>⏱ {plan.time}</span>
            </div>

            <div className="flex flex-wrap gap-2 mt-10">
              {plan.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-white/10 px-2 py-1 rounded-md text-xs border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            <button
              onClick={() => handleAssign(plan.title)}
              className="w-full bg-[#D08D28] hover:bg-yellow-400 text-white font-medium py-3 mt-10 rounded-md flex items-center justify-center gap-2 transition"
            >
              <FaRegPaperPlane /> Assign
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutPlans;
