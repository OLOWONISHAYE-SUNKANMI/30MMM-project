"use client";

import * as React from "react";
import { comments, notes } from "@/sample-data/DiscussionData";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { GiHamburgerMenu } from "react-icons/gi";
import DiscussionPlane from "./DiscussionPlane";
import JoinConversationButton from "./JoinConversationButton";
import LessonItem from "./LessonItem";
import ProgressBar from "./ProgressBar";

export default function SidePanel() {
  const [open, setOpen] = React.useState(false);

  // Function to toggle the drawer open or closed
  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ width: 500 }}
      role="presentation"
      className="bg-[#F8F9FDCC] xs:w-full sm:w-full md:w-[380px] lg:w-[500px]"
    >
      <div className="ml-[2vw] mt-[2vh]">
        <div className="text-2xl font-bold">Progress</div>
        <div className="pt-2">
          <p className="inline font-black">2</p>
          <p className="inline">/7 COMPLETED</p>
        </div>
        <ProgressBar completedSteps="2" />
        <div className="mt-[3vh] space-y-3">
          <LessonItem
            lessonNumber={1}
            lessonTitle={"Sanctification (to be set..."}
            isAccessible={true}
          />
          <LessonItem
            lessonNumber={2}
            lessonTitle={"Singles/Married To Christ"}
            isAccessible={true}
          />
          <LessonItem
            lessonNumber={3}
            lessonTitle={"Singles/Married To Christ"}
            isAccessible={false}
          />
          <LessonItem
            lessonNumber={4}
            lessonTitle={"Purpose of Marriage"}
            isAccessible={false}
          />
          <LessonItem
            lessonNumber={5}
            lessonTitle={"Rely on Your Wife for Your Sustenance"}
            isAccessible={false}
          />
          <LessonItem
            lessonNumber={6}
            lessonTitle={"The Flesh vs. The Spirit"}
            isAccessible={false}
          />
          <LessonItem
            lessonNumber={7}
            lessonTitle={"Fight One Day at a Time"}
            isAccessible={false}
          />
        </div>
        <Divider className="mt-[2vh]" />
        <div className="mb-[1vh] mt-[2vh] text-2xl font-bold">Discussions</div>
        <div className="mx-5 flex flex-row items-center justify-between">
          <DiscussionPlane
            comments={comments}
            notes={notes}
          />
        </div>
        <div className="flex items-center justify-center">
          <JoinConversationButton />
        </div>
      </div>
    </Box>
  );

  return (
    <div className="flex justify-end">
      <Button
        onClick={() => toggleDrawer(true)} // Toggle drawer open
        className="h-12 w-12 justify-center rounded-xl bg-[#7D899D1A] text-[#717171] max-sm:h-8 max-sm:w-8 max-xs:h-6 max-xs:w-6"
      >
        <GiHamburgerMenu className="text-red-700" />
      </Button>
      <Drawer
        open={open}
        onClose={() => toggleDrawer(false)} // Close drawer when the user clicks outside
        anchor="right"
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
