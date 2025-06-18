import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import DateFilter from '../components/DateFilter';
import AttendanceTable from '../components/AttendanceTable';
import EditIcon from '../assets/icons/edit.svg';
import SaveIcon from '../assets/icons/save.svg';
import SubscriptionMonitor from '../components/SubscriptionMonitor';

const Attendance = () => {
  const [showMonitor, setShowMonitor] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [clock, setClock] = useState(new Date());
  const [logs, setLogs] = useState([
    { id: 1, name: 'Jeremie Canido', timeIn: '08:10 AM', timeOut: '9:32 AM', date: '5/27/2025' },
    { id: 2, name: 'JC Diaz', timeIn: '08:10 AM', timeOut: '9:32 AM', date: '5/27/2025' },
    { id: 3, name: 'Aaron Lescano', timeIn: '08:11 AM', timeOut: '9:32 AM', date: '5/27/2025' },
    { id: 4, name: 'Heart Nepacina', timeIn: '08:11 AM', timeOut: '9:32 AM', date: '5/27/2025' },
    { id: 5, name: 'Brylle Villafuerte', timeIn: '08:11 AM', timeOut: '9:32 AM', date: '5/27/2025' },
  ]);

  const [newLog, setNewLog] = useState({ name: '' });
  const [editMode, setEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showInfo, setShowInfo] = useState(false);

  const logsPerPage = 10;
  const pageGroupSize = 10;

  useEffect(() => {
    const interval = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDate]);

  const today = new Date().toLocaleDateString('en-US');
  const existingLog = logs.find(
    (log) => log.name.toLowerCase() === newLog.name.toLowerCase() && log.date === today
  );

  const handleTimeIn = () => {
    if (!newLog.name) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLogs([
      {
        id: logs.length + 1,
        name: newLog.name,
        timeIn: time,
        timeOut: '',
        date: today,
      },
      ...logs,
    ]);
    toast.success('Time In recorded!', {
      style: { textAlign: 'center' },
      position: 'top-center'
    });
    setNewLog({ name: '' });
  };

  const handleTimeOut = () => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const updated = logs.map((log) =>
      log.id === existingLog.id ? { ...log, timeOut: time } : log
    );
    setLogs(updated);
    toast.success('Time Out recorded!', {
      style: { textAlign: 'center' },
      position: 'top-center'
    });
    setNewLog({ name: '' });
  };

  const handleExportCSV = () => {
    const exportData = selectedDate
      ? logs.filter(log => log.date === selectedDate)
      : logs;

    if (exportData.length === 0) {
      toast.error('No logs to export for the selected date.', {
        style: { textAlign: 'center' },
        position: 'top-center'
      });
      return;
    }

    const headers = ['Name', 'Date', 'Time In', 'Time Out'];
    const rows = exportData.map((log) => [
      log.name,
      log.date,
      log.timeIn || '',
      log.timeOut || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(value => `"${value}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'attendance_logs.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('CSV exported successfully!', {
      style: { textAlign: 'center' },
      position: 'top-center'
    });
  };

  const filteredData = logs.filter((entry) => {
    const nameMatch =
      searchQuery.trim() === '' || entry.name.toLowerCase().includes(searchQuery.toLowerCase());

    if (!selectedDate) return nameMatch; // no date filter = show all logs

    const entryDate = new Date(entry.date);
    const filterDate = new Date(selectedDate);
    const today = new Date();

    const isTodaySelected = filterDate.toDateString() === today.toDateString();

    const dateMatch = isTodaySelected
      ? entryDate <= today // today = show today & past
      : entry.date === selectedDate;

    return nameMatch && dateMatch;
  });

  const indexOfLast = currentPage * logsPerPage;
  const indexOfFirst = indexOfLast - logsPerPage;
  const currentLogs = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / logsPerPage);
  const safeTotalPages = Math.max(totalPages, 1);
  const staticRows = Array.from({ length: logsPerPage }, (_, i) => currentLogs[i] || {
    id: `empty-${i}`,
    name: '',
    date: '',
    timeIn: '',
    timeOut: ''
  });

  const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
  const startPage = currentGroup * pageGroupSize + 1;
  const endPage = startPage + pageGroupSize - 1;

  const goToPrevGroup = () => {
    const prevGroupStart = Math.max(startPage - pageGroupSize, 1);
    setCurrentPage(prevGroupStart);
  };

  const goToNextGroup = () => {
    const nextGroupStart = startPage + pageGroupSize;
    setCurrentPage(nextGroupStart);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#111827] text-white px-6 py-10">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center border-b border-gray-700 pb-6">
            <h1 className="text-3xl font-bold text-gray-200 inline-block px-4 py-2 rounded-lg shadow-sm">
              Attendance Log
            </h1>
            <div className="text-center mt-4">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="text-sm text-orange-400 hover:underline flex items-center justify-center gap-1 mx-auto"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 10A8 8 0 112 10a8 8 0 0116 0zM9 8h2V6H9v2zm0 6h2v-4H9v4z" />
                </svg>
                {showInfo ? 'Hide Info' : 'What is this page?'}
              </button>

              {showInfo && (
                <div className="mt-3 max-w-3xl mx-auto bg-[#1f2937] px-6 py-4 rounded-lg border border-gray-700 text-gray-300 text-sm md:text-base">
                  This page lets you log and track gym attendance digitally. Coaches or front desk staff can record time-ins and time-outs, filter by date, search by name, and export records when needed.
                </div>
              )}
            </div>
          </div>

          {/* Create Log Area */}
          <div className="text-center space-y-4">
            <div className="bg-[#1f2937] inline-block px-8 py-4 rounded-xl shadow-md">
              <p className="text-4xl text-orange-400 font-mono tracking-widest">
                {clock.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </p>
            </div>

            {existingLog && !existingLog.timeOut ? (
              <>
                <h2 className="text-lg font-semibold mb-4 text-center">Log Time Out</h2>
                <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-4">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={newLog.name}
                    onChange={(e) => setNewLog({ ...newLog, name: e.target.value })}
                    className="bg-[#374151] text-white px-4 py-2 rounded-md border border-gray-600 w-full md:w-1/3 hover:shadow-[0_0_0_1px_#f97316] focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  />
                  <button
                    onClick={handleTimeOut}
                    className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-semibold"
                  >
                    Time Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold mb-4 text-center">Log Time In</h2>
                <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-4">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={newLog.name}
                    onChange={(e) => setNewLog({ ...newLog, name: e.target.value })}
                    className="bg-[#374151] text-white px-4 py-2 rounded-md border border-gray-600 w-full md:w-1/3 hover:shadow-[0_0_0_1px_#f97316] focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  />
                  <button
                    onClick={handleTimeIn}
                    className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-semibold"
                  >
                    Time In
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Table Section */}
          <div className="bg-[#1f2937] p-6 rounded-xl shadow-md space-y-6">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 flex-wrap">
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              <DateFilter selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
              <img
                src={editMode ? SaveIcon : EditIcon}
                alt={editMode ? "Save Log" : "Edit Log"}
                title={editMode ? "Save Log" : "Edit Log"}
                onClick={() => setEditMode(!editMode)}
                className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
              />
            </div>
            <AttendanceTable data={staticRows} editMode={editMode} setLogs={setLogs} />
            <div className="flex justify-center gap-2 flex-wrap">
              <button
                onClick={goToPrevGroup}
                disabled={startPage === 1}
                className="px-3 py-1 rounded-md font-semibold text-sm bg-[#374151] text-gray-300 disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: 10 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(startPage + i)}
                  className={`px-3 py-1 rounded-md font-semibold text-sm ${
                    currentPage === startPage + i ? 'bg-orange-500 text-white' : 'bg-[#374151] text-gray-300'
                  }`}
                >
                  {startPage + i}
                </button>
              ))}
              <button
                onClick={goToNextGroup}
                disabled={false}
                className="px-3 py-1 rounded-md font-semibold text-sm bg-[#374151] text-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="text-center">
              <button
                onClick={handleExportCSV}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-semibold shadow-md transition duration-200"
              >
                Export CSV
              </button>
            </div>
          </div>

          {/* Toggle Button */}
          <div className="text-center">
            <button
              onClick={() => setShowMonitor(!showMonitor)}
              className="text-sm text-orange-400 hover:underline"
            >
              {showMonitor ? 'Hide Subscription Monitor' : 'View Subscription Monitor'}
            </button>
          </div>

          {/* Conditional Monitor Section */}
          {showMonitor && (
            <div className="bg-[#1f2937] p-6 rounded-xl shadow-md">
              <SubscriptionMonitor />
            </div>
          )}
        </div>
        </div>
    </>
  );
};

export default Attendance;
