import React from "react";
import DiscussionPlane from "./DiscussionPlane";
import JoinConversationButton from "./JoinConversationButton";

function DiscussionSection({ comments, notes }) {
  return (
    <div>
      {" "}
      {/* Discussions Section */}
      <div className="mb-4 mt-[2vh] text-xl font-semibold text-gray-800">
        Discussions
      </div>
      <div className="mx-0 flex flex-row items-center justify-between">
        <DiscussionPlane
          comments={comments}
          notes={notes}
        />
      </div>
      <div className="mt-4 flex items-center justify-center">
        <JoinConversationButton />
      </div>
    </div>
  );
}

export default DiscussionSection;
