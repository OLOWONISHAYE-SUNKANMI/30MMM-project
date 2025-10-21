import { useEffect, useState } from "react";
import { getAllDevotionals } from "@/actions/devotional";
import { getUserProgress } from "@/actions/user-progress";
import { FaChevronDown, FaRegCalendarAlt } from "react-icons/fa";
import WeekCards from "./WeekCards";

export default function CardSection({ userId }) {
  const [userProgress, setUserProgress] = useState(null);
  const [devotionals, setDevotionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("CardSection - Received userId:", userId);

  useEffect(() => {
    const fetchData = async () => {
      console.log("CardSection - useEffect triggered with userId:", userId);

      // Don't fetch if userId is not available
      if (!userId) {
        console.log("CardSection - No userId provided");
        setLoading(false);
        return;
      }

      try {
        console.log("CardSection - Starting data fetch for userId:", userId);
        setLoading(true);
        setError(null);

        // Fetch user progress
        const progressResult = await getUserProgress(userId);
        console.log("CardSection - Progress result:", progressResult);

        if (progressResult.success) {
          setUserProgress(progressResult.userProgress);
          console.log(
            "CardSection - User progress set:",
            progressResult.userProgress,
          );
        } else {
          console.error(
            "CardSection - Failed to fetch user progress:",
            progressResult.error,
          );
          setError(progressResult.error);
        }

        // Fetch all devotionals
        const devotionalsResult = await getAllDevotionals();
        console.log("CardSection - Devotionals result:", devotionalsResult);

        if (devotionalsResult.success) {
          setDevotionals(devotionalsResult.devotionals);
          console.log(
            "CardSection - Devotionals set, count:",
            devotionalsResult.devotionals.length,
          );
        } else {
          console.error(
            "CardSection - Failed to fetch devotionals:",
            devotionalsResult.error,
          );
          setError(devotionalsResult.error);
        }
      } catch (error) {
        console.error("CardSection - Error fetching dashboard data:", error);
        setError("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
        console.log("CardSection - Fetch completed");
      }
    };

    fetchData();
  }, [userId]);

  console.log("CardSection - Render state:", {
    loading,
    error,
    userId,
    userProgress,
    devotionals: devotionals.length,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userId) {
    return <div>User not found</div>;
  }

  const cohortText = userProgress?.cohortRoman || "I";

  return (
    <>
      <div className="inline-flex h-[30px] w-full items-center justify-between px-0.5 py-1.5 sm:px-2">
        <div className="inline-flex justify-evenly gap-1.5 gap-x-0.5 rounded-[40px] bg-gray-200 sm:gap-x-2">
          <span className="rounded-[34px] px-2.5 py-2 text-xs font-light leading-tight tracking-wider text-slate-600 hover:bg-almost-black hover:font-medium hover:text-white">
            All
          </span>
          <span className="rounded-[34px] px-2.5 py-2 text-xs font-light leading-tight tracking-wider text-slate-600 hover:bg-almost-black hover:font-medium hover:text-white">
            In Progress
          </span>
          <span className="rounded-[34px] px-2.5 py-2 text-xs font-light leading-tight tracking-wider text-slate-600 hover:bg-almost-black hover:font-medium hover:text-white max-sm:hidden">
            Upcoming
          </span>
          <span className="rounded-[34px] px-2.5 py-2 text-xs font-light leading-tight tracking-wider text-slate-600 hover:bg-almost-black hover:font-medium hover:text-white">
            Completed
          </span>
        </div>
        <div className="ml-auto inline-flex items-center gap-1 rounded-2xl bg-gray-200 p-2 text-sm font-light">
          <FaRegCalendarAlt />
          Group:
          <div className="font-medium leading-snug">Clean {cohortText}</div>
          <FaChevronDown size={8} />
        </div>
      </div>
      <WeekCards
        userProgress={userProgress}
        devotionals={devotionals}
      />
    </>
  );
}
