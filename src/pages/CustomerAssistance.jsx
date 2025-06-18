import React, { useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import AssistanceCard from "../components/AssistanceCard";
import AssistanceFilterControls from "../components/AssistanceFilterControls";

const dummyAssistanceData = [
  {
    id: 1,
    name: "Jeremie Canido",
    category: "Billing Concern",
    message: "I was charged twice this month. Can you check?",
    status: "Resolved",
    date: "June 18, 2025",
    replies: [
      {
        text: "Hi Jeremie, thank you for reporting this. We've checked and already issued a refund for the duplicate charge.",
        date: "June 16, 2025, 2:10 PM",
        sender: "coach"
      },
      {
        text: "Please let us know if you need anything else.",
        date: "June 16, 2025, 2:15 PM",
        sender: "coach"
      },
      {
        text: "Thank you for resolving the issue. The refund was successful.",
        date: "June 16, 2025, 3:00 PM",
        sender: "member"
      }
    ]
  },
  {
    id: 2,
    name: "JC Diaz",
    category: "Workout Assistance",
    message: "Can I get a custom plan for strength training?",
    status: "Pending",
    date: "June 18, 2025",
    replies: [],
  },
  {
    id: 3,
    name: "Aaron Lescano",
    category: "Technical Problem",
    message: "The app crashed after submitting my weight.",
    status: "Pending",
    date: "June 18, 2025",
    replies: [
      {
        text: "We'll investigate and get back to you shortly.",
        date: "June 18, 2025, 3:45 PM",
        sender: "coach"
      }
    ],
  },
  {
    id: 4,
    name: "Heart Nepacina",
    category: "Equipment Issue",
    message: "The treadmill in the cardio area isn't working properly.",
    status: "Pending",
    date: "June 18, 2025",
    replies: [],
  },
  {
    id: 5,
    name: "Brylle Villafuerte",
    category: "Other",
    message: "Can I bring a guest to the gym this weekend?",
    status: "Pending",
    date: "June 18, 2025",
    replies: [],
  },
];

const CustomerAssistance = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [reply, setReply] = useState("");
  const [assistanceList, setAssistanceList] = useState(dummyAssistanceData);
  const [expandedItems, setExpandedItems] = useState([]);

  const filteredData = assistanceList.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    const matchesStatus =
      selectedStatus === "All" || item.status === selectedStatus;

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesStatus && matchesSearch;
  });

  const handleReplyClick = (item) => {
    setActiveItem(item);
    setReply("");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setReply("");
    setActiveItem(null);
  };

  const handleSendReply = () => {
    if (!reply.trim()) {
      toast.error("Reply cannot be empty.", {
        position: "top-center",
        style: { textAlign: "center" },
      });
      return;
    }

    const updated = assistanceList.map((item) => {
      if (item.id === activeItem.id) {
        const newReplies = item.replies ? [...item.replies] : [];
        newReplies.push({ text: reply.trim(), date: new Date().toLocaleString(), sender: "coach" });
        return { ...item, replies: newReplies };
      }
      return item;
    });

    setAssistanceList(updated);
    toast.success("Reply sent successfully!", {
      position: "top-center",
      style: { textAlign: "center" },
    });
    handleCloseModal();
  };

  const handleMarkResolved = (id) => {
    const updated = assistanceList.map((item) =>
      item.id === id ? { ...item, status: "Resolved" } : item
    );
    setAssistanceList(updated);
    toast.success("Marked as resolved!", {
      position: "top-center",
      style: { textAlign: "center" },
    });
  };

  const toggleExpanded = (id) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setSelectedStatus("All");
    setSearchQuery("");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#111827] text-white px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center border-b border-gray-700 pb-6 mb-10">
          <h1 className="text-3xl font-bold text-gray-200 inline-block px-4 py-2 rounded-lg shadow-sm">
            Customer Assistance
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
                This page lets you view and respond to customer inquiries. You can filter messages, reply to concerns, and mark them as resolved for better tracking and support.
              </div>
            )}
          </div>
          </div>

          <AssistanceFilterControls
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onClearFilters={handleClearFilters}
          />

          <div className="space-y-4">
            {filteredData.map((item) => (
              <AssistanceCard
                key={item.id}
                data={item}
                onMarkResolved={() => handleMarkResolved(item.id)}
                onReply={() => handleReplyClick(item)}
                isExpanded={expandedItems.includes(item.id)}
                toggleExpanded={() => toggleExpanded(item.id)}
              />
            ))}

            {filteredData.length === 0 && (
              <p className="text-center text-sm text-gray-500">
                No assistance requests found with these filters.
              </p>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-[#1f2937] text-white w-full max-w-md rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-bold text-orange-400 mb-4">
              Reply to {activeItem.name}
            </h2>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type your reply here..."
              className="w-full bg-[#111827] border border-gray-600 text-white p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
              rows={5}
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSendReply}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded text-sm"
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerAssistance;
