import { useState } from 'react';
import toast from 'react-hot-toast';

const AttendanceForm = () => {
  const [name, setName] = useState('');
  const [logs, setLogs] = useState([]); // Simulated log storage
  const [showThankYou, setShowThankYou] = useState(false);

  const today = new Date().toLocaleDateString('en-US');
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleLog = (type) => {
    if (!name.trim()) {
      toast.error('Name is required.');
      return;
    }

    const existing = logs.find(
      (log) => log.name.toLowerCase() === name.toLowerCase() && log.date === today
    );

    if (type === 'in') {
      if (existing) {
        toast.error('Already timed in today.');
        return;
      }
      setLogs([
        ...logs,
        { id: logs.length + 1, name, date: today, timeIn: time, timeOut: '' },
      ]);
      toast.success('Time In recorded!');
    } else {
      if (!existing || existing.timeOut) {
        toast.error('No active Time In found for today.');
        return;
      }
      const updated = logs.map((log) =>
        log.id === existing.id ? { ...log, timeOut: time } : log
      );
      setLogs(updated);
      toast.success('Time Out recorded!');
    }

    setShowThankYou(true);
    setName('');
    setTimeout(() => setShowThankYou(false), 3000); // Reset after 3 seconds
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111827] text-white px-6">
      <div className="w-full max-w-md p-6 bg-[#1f2937] rounded-xl shadow-lg">
        {showThankYou ? (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-orange-400">✅ Thank you!</h2>
            <p className="text-gray-300">Your attendance has been recorded.</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-center text-orange-400 mb-4">Attendance Form</h2>
            <input
              type="text"
              value={name}
              placeholder="Enter your full name"
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-4 px-4 py-2 bg-[#374151] text-white border border-gray-600 rounded-md"
            />
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleLog('in')}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md font-semibold"
              >
                Time In
              </button>
              <button
                onClick={() => handleLog('out')}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md font-semibold"
              >
                Time Out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AttendanceForm;
