// // src/pages/Clients/Clients.jsx
// import React, { useState } from 'react';
// import ClientList from './components/ClientList';
// import AddClient from './AddClient';
// import ClientProfile from './ClientProfile';
// import DeleteModal from './components/DeleteClientModal';
// import '../styles/clients.css'; 
// import { clientsData } from '../../data/clientsData';

// const Clients = () => {
//   const [view, setView] = useState('list'); // 'list' | 'add' | 'profile'
//   const [selectedId, setSelectedId] = useState(null);
//   const [deleteId, setDeleteId] = useState(null);

//   const openProfile = (id) => { setSelectedId(id); setView('profile'); };
//   const openAdd = () => setView('add');
//   const backToList = () => { setView('list'); setSelectedId(null); };

//   return (
//     <div className="space-y-6 w-full client-container">
//       <div className="mb-2">
//         <h1 className="text-3xl font-bold text-white">Clients</h1>
//         <p className="text-gray-400">Manage and monitor your client progress</p>
//       </div>

//       {view === 'list' && (
//         <ClientList onAdd={openAdd} onOpenProfile={openProfile} onRequestDelete={(id)=> setDeleteId(id)} />
//       )}

//       {view === 'add' && (
//         <AddClient onCancel={backToList} onAdded={backToList} />
//       )}

//       {view === 'profile' && selectedId && (
//         <ClientProfile clientId={selectedId} onBack={backToList} onRequestDelete={(id)=> setDeleteId(id)} onEdit={() => setView('add')} />
//       )}

//       <DeleteModal id={deleteId} onClose={() => setDeleteId(null)} />
//     </div>
//   );
// };

// export default Clients;

import React, { useState } from "react";
import ExistingClients from "./ExistingClients";
import NewClientForm from "./NewClientForm";
import ClientProfile from "./ClientProfile";
import DeleteClientModal from "./components/DeleteClientModal";
import { useSelector } from "react-redux";

const Clients = () => {
  const { clients } = useSelector((state) => state.clients);
  const [view, setView] = useState("list"); // list | profile
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editClient, setEditClient] = useState(null);

  const openProfile = (id) => {
    setSelectedClientId(id);
    setView("profile");
  };

  const backToList = () => {
    setView("list");
    setSelectedClientId(null);
    setEditClient(null);
  };

  return (
    <div className="space-y-6 w-full text-white">
      <div>
        <h1 className="text-3xl font-bold">Clients</h1>
        <p className="text-gray-400">Manage and monitor your client progress</p>
      </div>

      {view === "list" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExistingClients
            clients={clients}
            onOpenProfile={openProfile}
            onRequestDelete={(id) => setDeleteId(id)}
            onEdit={(client) => setEditClient(client)}
          />
          <NewClientForm onDone={backToList} editClient={editClient} />
        </div>
      )}

      {view === "profile" && selectedClientId && (
        <ClientProfile
          clientId={selectedClientId}
          onBack={backToList}
          onRequestDelete={(id) => setDeleteId(id)}
          onEdit={(client) => {
            setEditClient(client);
            setView("list");
          }}
        />
      )}

      <DeleteClientModal id={deleteId} onClose={() => setDeleteId(null)} />
    </div>
  );
};

export default Clients;
