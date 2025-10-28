// src/pages/Clients/ClientProfile.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { X } from "lucide-react";
import { deleteClient } from "../../redux/slices/clientsSlice";

const ClientProfile = ({ clientId, onBack, onRequestDelete }) => {
    const dispatch = useDispatch();
    // find client from store
    const client = useSelector((s) => s.clients.clients.find((c) => c.id === clientId));
    if (!client) return <div className="text-gray-400">No client found</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2"><X className="text-gray-400" /></button>
                    <img src={client.avatar} alt={client.name} className="w-20 h-20 rounded-full border border-slate-600" />
                    <div>
                        <h2 className="text-2xl font-bold">{client.name}</h2>
                        <div className="text-gray-400">{client.goal} • Joined: {client.startDate}</div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button onClick={() => onRequestDelete(client.id)} className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-md text-white">
                        Delete
                    </button>

                    <button onClick={() => { /* later: open edit */ }} className="px-3 py-1 bg-amber-500 rounded-md">Edit</button>
                </div>
            </div>

            {/* top stat cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <div className="text-sm text-gray-400">Current Weight</div>
                    <div className="text-2xl font-bold">{client.currentWeight} kg</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <div className="text-sm text-gray-400">Target Weight</div>
                    <div className="text-2xl font-bold">{client.targetWeight} kg</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <div className="text-sm text-gray-400">Assigned Calories</div>
                    <div className="text-2xl font-bold">10,000</div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <div className="text-sm text-gray-400">Weight Lost</div>
                    <div className="text-2xl font-bold">{client.currentWeight && client.targetWeight ? `${client.currentWeight - client.targetWeight} kg` : "-"}</div>
                </div>
            </div>

            {/* snapshots / activity */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <h4 className="text-white font-semibold mb-2">Today's Snapshot</h4>
                    <p className="text-gray-400">Calorie Adherence: 84%</p>
                    <p className="text-gray-400">Water Intake: 2 L</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <h4 className="text-white font-semibold mb-2">Recent Activity</h4>
                    <ul className="text-gray-400 list-disc pl-4">
                        <li>Logged Breakfast</li>
                        <li>Completed morning workout</li>
                        <li>Weight check-in: {client.currentWeight}kg</li>
                    </ul>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <h4 className="text-white font-semibold mb-2">Vitals</h4>
                    <p className="text-gray-400">Sleep: 7 hrs</p>
                    <p className="text-gray-400">Muscle Mass: 45.2 kg</p>
                </div>
            </div>

            {/* Personal & health info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <h4 className="text-white font-semibold mb-2">Personal Info</h4>
                    <p className="text-gray-300">Email: {client.email}</p>
                    <p className="text-gray-300">Phone: {client.phone}</p>
                    <p className="text-gray-300">Address: {client.address}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                    <h4 className="text-white font-semibold mb-2">Health Details</h4>
                    <p className="text-gray-300">Height: {client.height} cm</p>
                    <p className="text-gray-300">BMI: {client.bmi}</p>
                    <p className="text-gray-300">Progress: {client.progress}%</p>
                </div>
            </div>
        </div>
    );
};

export default ClientProfile;
