// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addClient } from '../../redux/slices/clientsSlice';
// import { User, Activity, Target, X } from 'lucide-react';

// const AddClientForm = ({ onCancel, onAdded }) => {
//   const dispatch = useDispatch();
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     age: '',
//     gender: 'Male',
//     currentWeight: '',
//     targetWeight: '',
//     height: '',
//     goal: 'Weight Loss',
//     address: '',
//     startDate: new Date().toISOString().split('T')[0],
//     avatar: '',
//     progress: 0,
//     lastMeal: '—',
//     subscription: 'Basic'
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const submit = (e) => {
//     e.preventDefault();
//     const newClient = {
//       ...form,
//       id: Date.now(),
//       avatar: form.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
//     };
//     dispatch(addClient(newClient));
//     onAdded && onAdded();
//   };

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="bg-slate-800/30 backdrop-blur-lg border border-slate-700/40 rounded-xl p-8">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h2 className="text-2xl font-bold text-white">Add New Client</h2>
//             <p className="text-gray-400 mt-1">Fill in the client information below</p>
//           </div>
//           <button onClick={onCancel} className="p-2 hover:bg-slate-700 rounded-lg">
//             <X className="w-6 h-6 text-gray-400" />
//           </button>
//         </div>

//         <form onSubmit={submit} className="space-y-8">
//           {/* Identification */}
//           <div>
//             <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
//               <User className="w-5 h-5 text-orange-400" /> Client Identification
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <Input label="Full Name" name="name" value={form.name} onChange={handleChange} required />
//               <Input label="Email" name="email" value={form.email} onChange={handleChange} type="email" required />
//               <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
//               <Input label="Address" name="address" value={form.address} onChange={handleChange} />
//             </div>
//           </div>

//           {/* Past Progress */}
//           <div>
//             <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
//               <Activity className="w-5 h-5 text-orange-400" /> Past Progress Data
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <Input label="Age" name="age" value={form.age} onChange={handleChange} type="number" />
//               <Select label="Gender" name="gender" value={form.gender} onChange={handleChange} options={['Male','Female','Other']} />
//               <Input label="Start Date" name="startDate" value={form.startDate} onChange={handleChange} type="date" />
//               <Input label="Current Weight (kg)" name="currentWeight" value={form.currentWeight} onChange={handleChange} type="number" />
//               <Input label="Target Weight (kg)" name="targetWeight" value={form.targetWeight} onChange={handleChange} type="number" />
//               <Input label="Height (cm)" name="height" value={form.height} onChange={handleChange} type="number" />
//             </div>
//           </div>

//           {/* Program details */}
//           <div>
//             <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
//               <Target className="w-5 h-5 text-orange-400" /> Client Program Details
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <Select label="Primary Goal" name="goal" value={form.goal} onChange={handleChange} options={['Weight Loss','Weight Gain','Muscle Gain','Maintenance']} />
//               <Select label="Subscription" name="subscription" value={form.subscription} onChange={handleChange} options={['Basic','Premium','Trial','Free']} />
//               <Input label="Avatar URL" name="avatar" value={form.avatar} onChange={handleChange} />
//             </div>
//           </div>

//           <div className="flex gap-4 pt-6 border-t border-slate-700/40">
//             <button type="button" onClick={onCancel} className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg">Cancel</button>
//             <button type="submit" className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg">Add Client</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // small input helper
// const Input = ({ label, name, value, onChange, type = 'text', required = false }) => (
//   <div>
//     <label className="block text-gray-300 text-sm mb-2">{label}</label>
//     <input
//       name={name}
//       value={value}
//       onChange={onChange}
//       type={type}
//       required={required}
//       className="w-full px-4 py-3 bg-transparent border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none"
//     />
//   </div>
// );

// const Select = ({ label, name, value, onChange, options = [] }) => (
//   <div>
//     <label className="block text-gray-300 text-sm mb-2">{label}</label>
//     <select name={name} value={value} onChange={onChange} className="w-full px-4 py-3 bg-transparent border border-slate-700 rounded-lg text-white">
//       {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
//     </select>
//   </div>
// );

// export default AddClientForm;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addClient, updateClient } from "../../redux/slices/clientsSlice";

const NewClientForm = ({ onDone, editClient }) => {
  const dispatch = useDispatch();
  const isEditing = Boolean(editClient);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "Male",
    goal: "Weight Loss",
    currentWeight: "",
    targetWeight: "",
    height: "",
    address: "",
  });

  useEffect(() => {
    if (editClient) setForm(editClient);
  }, [editClient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    const newClient = {
      ...form,
      id: isEditing ? form.id : Date.now(),
      avatar: form.avatar || `https://i.pravatar.cc/150?u=${form.name}`,
      progress: form.progress || 0,
      bmi: (form.currentWeight / ((form.height / 100) ** 2)).toFixed(1),
      startDate: form.startDate || new Date().toISOString().split("T")[0],
      status: "on-track",
    };

    if (isEditing) {
      dispatch(updateClient(newClient));
    } else {
      dispatch(addClient(newClient));
    }

    setForm({
      name: "",
      email: "",
      phone: "",
      age: "",
      gender: "Male",
      goal: "Weight Loss",
      currentWeight: "",
      targetWeight: "",
      height: "",
      address: "",
    });

    onDone();
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 h-full">
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? "Edit Client" : "Add New Client"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="input" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="input" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="input" />
          <input name="age" value={form.age} onChange={handleChange} placeholder="Age" className="input" />
          <input name="height" value={form.height} onChange={handleChange} placeholder="Height (cm)" className="input" />
          <input name="currentWeight" value={form.currentWeight} onChange={handleChange} placeholder="Current Weight (kg)" className="input" />
          <input name="targetWeight" value={form.targetWeight} onChange={handleChange} placeholder="Target Weight (kg)" className="input" />
          <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="input" />
        </div>

        <div className="flex gap-3">
          <button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600 rounded-lg py-2 font-medium">
            {isEditing ? "Save Changes" : "Add Client"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewClientForm;
