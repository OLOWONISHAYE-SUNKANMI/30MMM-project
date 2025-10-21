import WeekCard from "./WeekCard";

export default function WeekCards({ userProgress, devotionals }) {
  console.log("WeekCards - Received props:", {
    userProgress,
    devotionalsCount: devotionals?.length || 0,
  });

  // Check if devotionals is available and is an array
  if (!devotionals || !Array.isArray(devotionals)) {
    console.log("WeekCards - No devotionals available or not an array");
    return <div>Loading devotionals...</div>;
  }

  // Group devotionals by week to get week titles
  const weekTitles = devotionals.reduce((acc, devotional) => {
    if (!acc[devotional.week]) {
      acc[devotional.week] = devotional.weekTitle;
    }
    return acc;
  }, {});

  console.log("WeekCards - Week titles:", weekTitles);

  // Get all weeks (1-5) from the devotionals
  const weekNumbers = Object.keys(weekTitles).map(Number).sort();
  console.log("WeekCards - Week numbers:", weekNumbers);

  const calculateProgress = (weekNum) => {
    if (!userProgress) {
      console.log(`WeekCards - No user progress for week ${weekNum}`);
      return 0;
    }

    // Get completed days for this specific week from userProgress
    const weekKey = `week${weekNum}Completed`;
    const daysCompleted = userProgress[weekKey] || 0;

    console.log(`WeekCards - Week ${weekNum}: ${daysCompleted} days completed`);

    // Calculate percentage (assuming 7 days per week)
    return Math.round((daysCompleted / 7) * 100);
  };

  const getWeekStatus = (weekNum) => {
    const progress = calculateProgress(weekNum);

    if (progress === 100) return "Completed";
    if (progress > 0) return "In Progress";

    // Check if this week is upcoming based on current week
    if (userProgress && weekNum > userProgress.currentWeek) {
      return "Upcoming";
    }

    return "Not Started";
  };

  return (
    <div className="flex w-full flex-row flex-wrap justify-center gap-3 py-3 md:gap-5">
      {weekNumbers.map((weekNum) => {
        const status = getWeekStatus(weekNum);
        const progress = `${calculateProgress(weekNum)}%`;

        console.log(`WeekCards - Rendering week ${weekNum}:`, {
          title: weekTitles[weekNum],
          status,
          progress,
        });

        return (
          <WeekCard
            key={weekNum}
            week={weekNum}
            title={weekTitles[weekNum]}
            status={status}
            progress={progress}
            userProgress={userProgress}
          />
        );
      })}
    </div>
  );
}
