import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, ChevronDown } from 'lucide-react';
import { closeAssignModal, assignMealPlanToClients } from '../../redux/slices/mealsSlice';

const AssignModal = () => {
  const dispatch = useDispatch();
  const { isAssignModalOpen, selectedPlanForAssignment, mealPlans } = useSelector((state) => state.meals);
  const clientsData = useSelector((state) => state.clients?.clients || []);
  
  const [selectedClients, setSelectedClients] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all'); // 'all', 'selected', 'unselected'

  const selectedPlan = mealPlans.find(plan => plan.id === selectedPlanForAssignment);

  if (!isAssignModalOpen || !selectedPlan) return null;

  // Filter clients based on search term and filter
  const filteredClients = clientsData.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (filterBy === 'selected') return selectedClients.includes(client.id);
    if (filterBy === 'unselected') return !selectedClients.includes(client.id);
    return true;
  });

  const handleToggleClient = (clientId) => {
    setSelectedClients(prev => {
      if (prev.includes(clientId)) {
        return prev.filter(id => id !== clientId);
      } else {
        return [...prev, clientId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedClients([]);
    } else {
      setSelectedClients(clientsData.map(client => client.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSend = () => {
    if (selectedClients.length > 0) {
      dispatch(assignMealPlanToClients({
        planId: selectedPlanForAssignment,
        clientIds: selectedClients
      }));
      setSelectedClients([]);
      setSelectAll(false);
      dispatch(closeAssignModal());
    }
  };

  const handleClose = () => {
    setSelectedClients([]);
    setSelectAll(false);
    dispatch(closeAssignModal());
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-end z-50 p-4">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl w-full max-w-md h-[90vh] flex flex-col overflow-hidden animate-slide-in-right">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700/50 bg-slate-800/50">
          <div>
            <h2 className="text-xl font-bold text-white">Select recipients for this plan</h2>
            <p className="text-gray-400 text-sm mt-1">{selectedPlan.name}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Select All and Filter */}
          <div className="mb-4 flex items-center justify-between gap-4">
            <button
              onClick={handleSelectAll}
              className="text-orange-500 hover:text-orange-400 font-semibold text-sm"
            >
              {selectAll ? 'Deselect All' : 'Select All'}
            </button>
            
            {/* Custom Dropdown */}
            <div className="relative w-48">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800/50 border-2 border-orange-500/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none cursor-pointer"
                style={{ backgroundImage: 'none' }}
              >
                <option value="all" className="bg-slate-800 text-white">All Clients</option>
                <option value="selected" className="bg-slate-800 text-green-400">Selected Only</option>
                <option value="unselected" className="bg-slate-800 text-gray-400">Unselected Only</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white w-4 h-4 pointer-events-none" />
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Results Count */}
          {filteredClients.length > 0 && (
            <div className="mb-3">
              <p className="text-gray-400 text-xs">
                Showing {filteredClients.length} of {clientsData.length} client{clientsData.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}

          {/* Clients List */}
          <div className="space-y-3">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="flex items-center gap-3 p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:bg-slate-700/50 transition-all cursor-pointer"
                onClick={() => handleToggleClient(client.id)}
              >
                {/* Avatar */}
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {client.name.charAt(0)}
                </div>

                {/* Client Info */}
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{client.email}</p>
                </div>

                {/* Checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedClients.includes(client.id)}
                    onChange={() => handleToggleClient(client.id)}
                    className="w-5 h-5 rounded border-2 border-slate-600 bg-slate-700 checked:bg-orange-500 checked:border-orange-500 cursor-pointer accent-orange-500"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredClients.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm">
                {searchTerm ? 'No clients found' : 'No clients available'}
              </p>
            </div>
          )}
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="flex-shrink-0 p-6 border-t border-slate-700/50 bg-slate-800/30">
          <button
            onClick={handleSend}
            disabled={selectedClients.length === 0}
            className="w-full px-8 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            Send ({selectedClients.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignModal;
