import { useState } from 'react';
import { X } from 'lucide-react';

const ChatModal = ({ isOpen, onClose }) => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const askGPT = async () => {
    const prompt = document.getElementById('prompt').value;

    if (!prompt.trim()) {
      alert("Please, enter a prompt.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();
      setResponse(JSON.stringify(data, null, 2));
      
      // Guardar respuesta en localStorage
      localStorage.setItem('lastResponse', JSON.stringify(data));
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error trying to get a response from GPT.');
    } finally {
      setLoading(false);
    }
  };

  const loadLast = () => {
    const saved = localStorage.getItem('lastResponse');
    if (saved) {
      setResponse(saved);
    } else {
      alert("No previous response found.");
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-zinc-800/90 backdrop-blur-lg w-96 rounded-lg shadow-xl z-50 relative">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-gray-100">Chat with GPT Fitness Assistant</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <X color="aqua" size={32} />
          </button>
        </div>
        <div className="h-[500px] overflow-y-auto p-4">
          <h2 className="text-xl font-semibold text-neutral-50 mb-4">Ask the Fitness Assistant AI</h2>
          <textarea id="prompt" rows="4" placeholder="e.g., create a 4-day gym plan with dumbbells only..."
          className="w-full p-3 rounded-lg bg-zinc-700/50 text-neutral-100 placeholder-neutral-400 border border-zinc-600/50
          focus:outline-none focus:border-sky-500/50 mb-3"></textarea>
          <div className="flex gap-2 mb-4">
            <button onClick={askGPT} className="px-4 py-2 bg-gradient-to-br from-sky-400 to-sky-800 hover:from-cyan-600 hover:to-blue-900 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-zinc-800/30" disabled={loading}>
              {loading ? 'Asking...' : 'Send'}
            </button>
            <button onClick={loadLast} className="px-4 py-2 bg-gradient-to-br from-purple-400 to-purple-800 hover:from-purple-800 hover:to-indigo-800 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-zinc-800/30">
              Load Previous
            </button>
          </div>
          <h3 className="text-lg font-medium text-neutral-50 mb-2">Response (JSON):</h3>
          <pre id="output" className="p-4 bg-zinc-900/50 rounded-lg text-neutral-100 overflow-auto max-h-[20rem] border border-zinc-700/50">{response}</pre>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;