import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';

const ShareModal = ({ isOpen, onClose, shareUrl = "https://youtu.be/0wCzla0RnhQ?si=wITh0e5YdI2m5Sc" }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    { 
      name: 'Messenger', 
      icon: '💬',
      color: 'bg-blue-500',
      url: `https://www.facebook.com/dialog/send?link=${encodeURIComponent(shareUrl)}`
    },
    { 
      name: 'WhatsApp', 
      icon: '📱',
      color: 'bg-green-500',
      url: `https://wa.me/?text=${encodeURIComponent(shareUrl)}`
    },
    { 
      name: 'Gmail', 
      icon: '📧',
      color: 'bg-red-500',
      url: `mailto:?body=${encodeURIComponent(shareUrl)}`
    },
    { 
      name: 'Instagram', 
      icon: '📷',
      color: 'bg-pink-500',
      url: 'https://www.instagram.com/'
    },
  ];

  const handleShare = (url) => {
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full border border-slate-700 animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h3 className="text-xl font-bold text-white">Share</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* URL Input */}
        <div className="p-6">
          <div className="flex items-center gap-2 bg-slate-900 rounded-lg p-3 border border-slate-700">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 bg-transparent text-gray-300 text-sm outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          </div>

          {/* Share Options */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => handleShare(option.url)}
                className="flex flex-col items-center gap-2 group"
              >
                <div className={`w-14 h-14 ${option.color} rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-lg`}>
                  {option.icon}
                </div>
                <span className="text-xs text-gray-300 font-medium">{option.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
