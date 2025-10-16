"use client";

import * as React from "react";
import { getAllDevotionals } from "@/actions/devotional";
import { comments, notes } from "@/sample-data/DiscussionData";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { FaCheck } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoAdd, IoLockClosed } from "react-icons/io5";
import DiscussionPlane from "./DiscussionPlane";
import JoinConversationButton from "./JoinConversationButton";

export default function SidePanel() {
  const [open, setOpen] = React.useState(false);
  const [weeks, setWeeks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadDevotionals = async () => {
      try {
        const result = await getAllDevotionals();
        console.log("Fetched devotionals:", result);
      } catch (error) {
        console.error("Error loading devotionals:", error);
        // Fallback to static data if loading fails
        setWeeks([
          { id: 1, title: "Week 1", completed: true, locked: false },
          { id: 2, title: "Week 2", completed: true, locked: false },
          { id: 3, title: "Week 3", completed: true, locked: false },
          {
            id: 4,
            title: "Week 4",
            completed: false,
            locked: false,
            current: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadDevotionals();
  }, []);

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ width: 400 }}
      role="presentation"
      className="bg-gray-100 xs:w-full sm:w-full md:w-[320px] lg:w-[400px]"
    >
      <div className="px-6 py-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-800">
              Devotional Progress
            </h2>
          </div>
          <Button
            size="small"
            className="min-w-0 rounded-lg bg-white p-2 text-gray-600 shadow-sm hover:bg-gray-50"
          >
            <IoAdd className="text-xl" />
          </Button>
        </div>

        {/* Progress List */}
        <div className="space-y-2">
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : (
            weeks.map((week) => (
              <div
                key={week.id}
                className={`flex items-center justify-between rounded-lg p-3 transition-colors ${
                  week.current
                    ? "border-l-4 border-red-600 bg-red-50"
                    : week.completed
                      ? "bg-white hover:bg-gray-50"
                      : "bg-white opacity-60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      week.completed
                        ? "bg-green-500"
                        : week.current
                          ? "bg-red-600"
                          : "bg-gray-200"
                    }`}
                  >
                    {week.completed ? (
                      <FaCheck className="text-sm text-white" />
                    ) : week.locked ? (
                      <IoLockClosed className="text-sm text-gray-400" />
                    ) : (
                      <span className="text-sm font-medium text-white">
                        {week.id}
                      </span>
                    )}
                  </div>
                  <span
                    className={`font-medium ${
                      week.current ? "text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {week.title}
                  </span>
                </div>
                {!week.locked && (
                  <Button
                    size="small"
                    className="min-w-0 rounded-full bg-gray-100 p-1.5 text-gray-600 hover:bg-gray-200"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Button>
                )}
              </div>
            ))
          )}
        </div>

        <Divider className="my-6" />

        {/* Discussions Section */}
        <div className="mb-4 text-xl font-semibold text-gray-800">
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
    </Box>
  );

  return (
    <div className="flex justify-end">
      <Button
        onClick={() => toggleDrawer(true)}
        className="h-12 w-12 justify-center rounded-xl bg-[#7D899D1A] text-[#717171] max-sm:h-8 max-sm:w-8 max-xs:h-6 max-xs:w-6"
      >
        <GiHamburgerMenu className="text-red-700" />
      </Button>
      <Drawer
        open={open}
        onClose={() => toggleDrawer(false)}
        anchor="right"
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
