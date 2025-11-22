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

  useEffect(() => {
    const fetchData = async () => {
      // Don't fetch if userId is not available
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch user progress
        const progressResult = await getUserProgress(userId);

        if (progressResult.success) {
          setUserProgress(progressResult.userProgress);
        } else {
          setError(progressResult.error);
        }

        // Fetch all devotionals
        const devotionalsResult = await getAllDevotionals();

        if (devotionalsResult.success) {
          setDevotionals(devotionalsResult.devotionals);
        } else {
          setError(devotionalsResult.error);
        }
      } catch (error) {
        setError("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

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
