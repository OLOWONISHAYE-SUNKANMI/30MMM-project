import React, { useState } from "react";
import Image from "next/image";
import { FaReply, FaThumbsUp } from "react-icons/fa";
import SortByPill from "./SortByPillBox";

export default function DiscussionPlane({ comments, notes }) {
  const [selectedTab, setSelectedTab] = useState("comments"); // Default tab

  const renderDiscussionItem = (item) => (
    <div
      key={item.id}
      className="my-2 flex items-start rounded-lg bg-white p-4 shadow"
    >
      {/* User avatar */}
      <Image
        src={item.avatar}
        alt={item.userName}
        width={10}
        height={10}
        className="mr-4 h-12 w-12 rounded-full"
      />

      <div className="flex-1">
        {/* User name and date */}
        <div className="mb-2 flex items-center justify-between">
          <p className="font-bold text-gray-800">{item.userName}</p>
          <span className="text-sm text-gray-500">{item.date}</span>
        </div>

        {/* Comment or note text */}
        <p className="mb-3 text-gray-700">{item.text}</p>

        {/* Action buttons: like and reply */}
        <div className="flex space-x-4">
          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
            <FaThumbsUp />
            <span>Like</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500">
            <FaReply />
            <span>Reply</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="items-center space-y-5 p-4">
      <div className="flex flex-row items-center space-x-10">
        {/* Tab Selection (Comments or Notes) */}
        <div className="flex items-center justify-center">
          <div className="flex rounded-full bg-gray-200 text-sm font-semibold shadow-lg">
            {/* Comments Tab */}
            <button
              onClick={() => setSelectedTab("comments")}
              className={`rounded-l-full px-4 py-2 ${
                selectedTab === "comments"
                  ? "bg-black text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              Comments <span className="ml-1">({comments.length})</span>
            </button>

            {/* Notes Tab */}
            <button
              onClick={() => setSelectedTab("notes")}
              className={`rounded-r-full px-4 py-2 ${
                selectedTab === "notes"
                  ? "bg-black text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              Notes <span className="ml-1">({notes.length})</span>
            </button>
          </div>
        </div>
        <SortByPill />
      </div>
      {/* Display content based on selected tab */}
      <div>
        {selectedTab === "comments" &&
          comments.map((comment) => renderDiscussionItem(comment))}
        {selectedTab === "notes" &&
          notes.map((note) => renderDiscussionItem(note))}
      </div>
    </div>
  );
}
