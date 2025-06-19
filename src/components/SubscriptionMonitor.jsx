import { useEffect, useState } from 'react';

const dummySubscriptions = [
  { id: 1, name: 'Jeremie Canido', endDate: '05-30-2025' },
  { id: 2, name: 'JC Diaz', endDate: '05-28-2025' },
  { id: 3, name: 'Aaron Lescano', endDate: '06-05-2025' },
];

const isExpiringSoon = (endDate) => {
  const today = new Date();
  const expDate = new Date(endDate);
  const diffTime = expDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 3 && diffDays >= 0;
};

const SubscriptionMonitor = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    setSubscriptions(dummySubscriptions);
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Subscription Monitor</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-xs text-gray-400 uppercase tracking-wider">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Subscription Ends</th>
              <th className="px-4 py-2">Notice</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub.id} className="bg-[#111827] hover:bg-[#1f2937] transition rounded-lg">
                <td className="px-4 py-3 text-white">{sub.name}</td>
                <td className="px-4 py-3 text-gray-300">{sub.endDate}</td>
                <td className="px-4 py-3">
                    {isExpiringSoon(sub.endDate) ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-xs font-semibold shadow-sm">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.257 3.099c.366-.446.978-.446 1.344 0l6.857 8.357c.386.47.03 1.144-.672 1.144H2.072c-.702 0-1.058-.674-.672-1.144l6.857-8.357zM9 12a1 1 0 012 0v1a1 1 0 01-2 0v-1zm1-5a1 1 0 00-.993.883L9 8v2a1 1 0 001.993.117L11 10V8a1 1 0 00-1-1z" />
                        </svg>
                        Expiring Soon
                    </span>
                    ) : (
                    <span className="text-xs text-gray-500">—</span>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionMonitor;