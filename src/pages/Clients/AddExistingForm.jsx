// src/pages/Clients/AddExistingForm.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addClient } from "../../redux/slices/clientsSlice";

/*
  The "Add Existing Client" form in your mock assumes importing an existing record
  (maybe via referral code). For now we provide a simple "add existing" flow
  where the user can paste minimal details and add to list.
*/
const AddExistingForm = ({ onAdded, onCancel }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", phone: "", email: "" });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const id = Date.now();
    const client = {
      id,
      name: form.name || "Existing Client",
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random()*70)}`,
      goal: "Unknown",
      progress: 50,
      lastSeen: "Just now",
      status: "on-track",
      email: form.email,
      phone: form.phone,
      currentWeight: 0,
      targetWeight: 0,
      height: 0,
      bmi: 0,
      startDate: new Date().toISOString().split("T")[0],
      address: "",
      notes: "",
    };
    dispatch(addClient(client));
    onAdded?.();
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <input name="name" placeholder="Client Name" value={form.name} onChange={handle} className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md" />
      <input name="email" placeholder="Email" value={form.email} onChange={handle} className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md" />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handle} className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md" />
      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="px-3 py-2 bg-slate-700 rounded-md">Cancel</button>
        <button type="submit" className="px-3 py-2 bg-orange-500 rounded-md">Add Existing Client</button>
      </div>
    </form>
  );
};

export default AddExistingForm;
