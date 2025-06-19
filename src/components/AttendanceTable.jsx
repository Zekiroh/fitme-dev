import { useState } from 'react';

const AttendanceTable = ({ data, editMode, setLogs }) => {
  const [editedRows, setEditedRows] = useState({});
  const [activeRow, setActiveRow] = useState(null);

  const handleNameChange = (id, value) => {
    setEditedRows(prev => ({ ...prev, [id]: value }));
  };

  const handleNameEdit = (id) => {
    setActiveRow(id);
    setEditedRows(prev => ({ ...prev, [id]: data.find(row => row.id === id)?.name || '' }));
  };

  const handleNameSave = (id) => {
    setLogs(prevLogs =>
      prevLogs.map(log =>
        log.id === id ? { ...log, name: editedRows[id] || log.name } : log
      )
    );
    setEditedRows(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
    setActiveRow(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="bg-[#374151] text-gray-300">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Time In</th>
            <th className="px-4 py-2">Time Out</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={row.id || index}
              className="bg-[#111827] hover:bg-[#1f2937] transition rounded-lg"
            >
              <td className="px-4 py-3 text-white">
                {editMode && row.date ? (
                  activeRow === row.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editedRows[row.id] ?? row.name}
                        onChange={(e) => handleNameChange(row.id, e.target.value)}
                        className="bg-[#2d3748] text-white px-2 py-1 rounded-md border border-gray-600 w-full"
                      />
                      <button
                        onClick={() => handleNameSave(row.id)}
                        className="text-xs text-orange-400 hover:underline"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>{row.name}</span>
                      <button
                        onClick={() => handleNameEdit(row.id)}
                        className="text-xs text-orange-400 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  )
                ) : (
                  row.name || <span className="text-gray-500">—</span>
                )}
              </td>
              <td className="px-4 py-3">{row.date || <span className="text-gray-500">—</span>}</td>
              <td className="px-4 py-3">{row.timeIn || <span className="text-gray-500">—</span>}</td>
              <td className="px-4 py-3">{row.timeOut || <span className="text-gray-500">—</span>}</td>
            </tr>
          ))}
        </tbody> 
      </table>
    </div>
  );
};

export default AttendanceTable;