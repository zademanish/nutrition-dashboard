// // src/pages/Clients/components/ExistingClients.jsx
// import React, { useMemo, useState } from "react";
// import { Trash2, MoreHorizontal, Search, Bell } from "lucide-react";

// const ExistingClients = ({ clients, onViewProfile, onAddClick, onRequestDelete }) => {
//   const [q, setQ] = useState("");
//   const [filter, setFilter] = useState("all");

//   const stats = useMemo(() => {
//     return {
//       total: clients.length,
//       onTrack: clients.filter((c) => c.status === "on-track").length,
//       needsAttention: clients.filter((c) => c.status === "needs-attention").length,
//       atRisk: clients.filter((c) => c.progress < 30).length,
//     };
//   }, [clients]);

//   const filtered = clients.filter((c) => {
//     const matchQ = q.trim() === "" || c.name.toLowerCase().includes(q.toLowerCase());
//     const matchF = filter === "all" || (filter === "on-track" ? c.status === "on-track" : c.status === "needs-attention");
//     return matchQ && matchF;
//   });

//   return (
//     <div className="space-y-4">
//       {/* top header */}
//       <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex items-center justify-between">
//         <div>
//           <div className="text-sm text-gray-400">Wellthier Pro</div>
//           <h2 className="text-xl font-semibold">Clients</h2>
//         </div>
//         <div className="flex items-center gap-3">
//           <button onClick={onAddClick} className="bg-orange-500 hover:bg-orange-600 px-3 py-2 rounded-md text-white font-medium">+ Add Client</button>
//         </div>
//       </div>

//       {/* stats */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//         <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
//           <div className="text-sm text-gray-400">Total Clients</div>
//           <div className="text-2xl font-bold">{stats.total}</div>
//         </div>
//         <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
//           <div className="text-sm text-gray-400">Active Clients</div>
//           <div className="text-2xl font-bold">{stats.onTrack}</div>
//         </div>
//         <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
//           <div className="text-sm text-gray-400">Needs Attention</div>
//           <div className="text-2xl font-bold">{stats.needsAttention}</div>
//         </div>
//         <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
//           <div className="text-sm text-gray-400">At Risk</div>
//           <div className="text-2xl font-bold">{stats.atRisk}</div>
//         </div>
//       </div>

//       {/* search + filter */}
//       <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700 flex gap-3 items-center">
//         <Search className="text-gray-400" />
//         <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search clients..." className="bg-transparent flex-1 outline-none text-white placeholder-gray-400"/>
//         <select value={filter} onChange={(e)=>setFilter(e.target.value)} className="bg-slate-900/50 text-white px-3 py-2 rounded-md border border-slate-700">
//           <option value="all">All Status</option>
//           <option value="on-track">On Track</option>
//           <option value="needs-attention">Needs Attention</option>
//         </select>
//       </div>

//       {/* list */}
//       <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
//         {filtered.length === 0 ? (
//           <div className="p-6 text-gray-400 text-center">No clients found</div>
//         ) : (
//           filtered.map((c) => (
//             <div key={c.id} className="flex items-center justify-between p-4 border-b border-slate-700 hover:bg-slate-700/30 cursor-pointer" onClick={()=>onViewProfile(c.id)}>
//               <div className="flex items-center gap-4">
//                 <img src={c.avatar} alt={c.name} className="w-14 h-14 rounded-full border border-slate-600"/>
//                 <div>
//                   <div className="text-white font-semibold">{c.name}</div>
//                   <div className="text-gray-400 text-sm">{c.goal} • Progress: {c.progress}% • {c.lastSeen}</div>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <button onClick={(e)=>{ e.stopPropagation(); onRequestDelete(c.id); }} className="p-2 rounded-md hover:bg-red-500/20"><Trash2 className="text-red-400" /></button>
//                 <button onClick={(e)=>{ e.stopPropagation(); onViewProfile(c.id); }} className="px-3 py-1 bg-amber-500 text-sm rounded-md">View Profile</button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default ExistingClients;

import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Trash2, Search } from "lucide-react";
import { deleteClient } from "../../redux/slices/clientsSlice";

const ExistingClients = ({ clients, onOpenProfile, onRequestDelete, onEdit }) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  // Filter + search
  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const matchesStatus = status === "all" || c.status === status;
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [clients, status, search]);

  // Stats
  const total = clients.length;
  const onTrack = clients.filter((c) => c.status === "on-track").length;
  const atRisk = clients.filter((c) => c.status === "at-risk").length;

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 h-full">
      <h2 className="text-xl font-semibold mb-4">Existing Clients</h2>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-slate-900/50 p-3 rounded-lg text-center">
          <p className="text-gray-400 text-sm">Total</p>
          <p className="text-xl font-bold text-white">{total}</p>
        </div>
        <div className="bg-green-900/40 p-3 rounded-lg text-center">
          <p className="text-gray-400 text-sm">On Track</p>
          <p className="text-xl font-bold text-green-400">{onTrack}</p>
        </div>
        <div className="bg-red-900/40 p-3 rounded-lg text-center">
          <p className="text-gray-400 text-sm">At Risk</p>
          <p className="text-xl font-bold text-red-400">{atRisk}</p>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-white placeholder-gray-400"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-white"
        >
          <option value="all">All</option>
          <option value="on-track">On Track</option>
          <option value="at-risk">At Risk</option>
        </select>
      </div>

      {/* Clients list */}
      {filteredClients.length === 0 ? (
        <p className="text-gray-400 text-sm">No matching clients found.</p>
      ) : (
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-between bg-slate-900/50 hover:bg-slate-700/50 rounded-lg p-3 transition-all"
            >
              <div className="flex items-center gap-3">
                <img
                  src={client.avatar}
                  alt={client.name}
                  className="w-10 h-10 rounded-full border border-slate-600"
                />
                <div>
                  <p className="font-medium">{client.name}</p>
                  <p className="text-xs text-gray-400">{client.goal}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onOpenProfile(client.id)}
                  className="px-3 py-1 text-sm bg-orange-500 hover:bg-orange-600 rounded-lg"
                >
                  View
                </button>
                <button
                  onClick={() => onEdit(client)}
                  className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => onRequestDelete(client.id)}
                  className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExistingClients;
