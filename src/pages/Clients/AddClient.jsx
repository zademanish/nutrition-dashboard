// src/pages/Clients/AddClient.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addClient } from "../../redux/slices/clientsSlice";

const AddClient = ({ onCancel, onAdded }) => {
  const [tab, setTab] = useState("new");
  const [form, setForm] = useState({});
  const [showReferral, setShowReferral] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newClient = {
      id: Date.now(),
      name: `${form.firstName || ""} ${form.lastName || ""}`.trim(),
      goal: form.healthGoal || "General Wellness",
      email: form.email || "no-email@example.com",
      currentWeight: form.currentWeight || 0,
      targetWeight: form.targetWeight || 0,
      progress: 0,
      avatar: "https://i.pravatar.cc/100?img=" + Math.floor(Math.random() * 70),
      startDate: new Date().toLocaleDateString(),
    };
    dispatch(addClient(newClient));
    setShowReferral(true);
    setTimeout(() => onAdded(), 1000);
  };

  return (
    <div className="bg-slate-800/40 p-6 rounded-xl border border-slate-700 shadow space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-slate-600 mb-6">
        <button
          onClick={() => setTab("new")}
          className={`px-4 py-2 text-sm font-medium ${
            tab === "new" ? "text-amber-400 border-b-2 border-amber-400" : "text-gray-400"
          }`}
        >
          Add New Client
        </button>
        <button
          onClick={() => setTab("existing")}
          className={`px-4 py-2 text-sm font-medium ${
            tab === "existing"
              ? "text-amber-400 border-b-2 border-amber-400"
              : "text-gray-400"
          }`}
        >
          Add Existing Client
        </button>
      </div>

      {/* Forms */}
      {tab === "new" ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input name="firstName" onChange={handleChange} placeholder="First Name" className="input" />
            <input name="lastName" onChange={handleChange} placeholder="Last Name" className="input" />
            <input name="email" onChange={handleChange} placeholder="Email" className="input" />
            <input name="dob" onChange={handleChange} placeholder="Date of Birth" className="input" />
            <input name="currentWeight" onChange={handleChange} placeholder="Current Weight (kg)" className="input" />
            <input name="targetWeight" onChange={handleChange} placeholder="Target Weight (kg)" className="input" />
            <input name="healthGoal" onChange={handleChange} placeholder="Health Goal" className="input" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={onCancel} type="button" className="px-4 py-2 bg-slate-700 rounded text-gray-300">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-amber-500 text-white rounded font-medium">
              Add Client
            </button>
          </div>
        </form>
      ) : (
        <form className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input name="clientName" placeholder="Client Name" className="input" />
            <input name="mobile" placeholder="Mobile Number" className="input" />
            <input name="initialWeight" placeholder="Initial Weight" className="input" />
            <input name="currentWeight" placeholder="Current Weight" className="input" />
            <input name="duration" placeholder="Duration (weeks)" className="input" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button onClick={onCancel} type="button" className="px-4 py-2 bg-slate-700 rounded text-gray-300">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-amber-500 text-white rounded font-medium">
              Add Existing Client
            </button>
          </div>
        </form>
      )}

      {showReferral && (
        <div className="bg-slate-900/80 p-6 rounded-lg border border-slate-600 mt-4 text-center space-y-3">
          <p className="text-gray-300">Referral Link for client:</p>
          <div className="flex justify-center gap-2">
            <input
              readOnly
              value="https://wellthierpro.com/ref/abc123"
              className="bg-slate-700 px-2 py-1 rounded text-gray-200 w-2/3"
            />
            <button
              onClick={() => navigator.clipboard.writeText("https://wellthierpro.com/ref/abc123")}
              className="px-3 py-1 bg-amber-500 rounded text-white"
            >
              Copy
            </button>
          </div>
          <p className="text-xs text-gray-400">Share via WhatsApp, Gmail, or Instagram</p>
        </div>
      )}
    </div>
  );
};

export default AddClient;
