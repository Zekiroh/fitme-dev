import React, { useState } from "react";

const AssistanceCard = ({ data, onReply, onMarkResolved, isExpanded, toggleExpanded }) => {
  return (
    <div className="bg-[#1f2937] border border-gray-700 p-6 rounded-xl shadow">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-orange-300">{data.name}</h2>
          <p className="text-sm text-gray-400">{data.date}</p>
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full mt-1 ${
            data.status === "Resolved"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {data.status}
        </span>
      </div>

      <p className="mt-3 text-sm text-gray-300">
        <strong className="text-gray-400">Category:</strong> {data.category}
      </p>
      <p className="mt-1 text-sm text-gray-200">{data.message}</p>

      {isExpanded && data.replies && data.replies.length > 0 && (
        <>
          <hr className="my-4 border-gray-600" />
          <div className="space-y-3">
            <p className="text-sm text-gray-400">Conversation:</p>
            {data.replies.map((r, i) => (
              <div
                key={i}
                className={`max-w-[90%] px-4 py-3 rounded-md text-sm relative ${
                  r.sender === "coach"
                    ? "bg-orange-400 text-black ml-auto text-right"
                    : "bg-gray-700 text-gray-100 mr-auto text-left"
                }`}
              >
                <p>{r.text}</p>
                <p
                  className={`text-xs mt-1 italic ${
                    r.sender === "coach" ? "text-gray-800" : "text-gray-400"
                  }`}
                >
                  {r.sender === "coach" ? "Coach" : "Member"} • {r.date}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-4 flex justify-between items-center flex-wrap gap-2">
        {data.replies && data.replies.length > 0 && (
          <button
            onClick={toggleExpanded}
            className="text-xs text-orange-400 hover:underline"
          >
            {isExpanded ? 'Collapse Conversation' : 'View Conversation'}
          </button>
        )}

        <div className="flex gap-2 ml-auto">
          {data.status === "Pending" && (
            <button
              onClick={onMarkResolved}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm"
            >
              Mark as Resolved
            </button>
          )}
          <button
            onClick={onReply}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssistanceCard;