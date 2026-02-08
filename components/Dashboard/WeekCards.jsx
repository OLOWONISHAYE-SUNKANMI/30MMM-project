import WeekCard from "./WeekCard";

export default function WeekCards({ userProgress, devotionals }) {
  // Check if devotionals is available and is an array
  if (!devotionals || !Array.isArray(devotionals)) {
    return <div>Loading devotionals...</div>;
  }

  // Group devotionals by week to get week titles
  const weekTitles = devotionals.reduce((acc, devotional) => {
    if (!acc[devotional.week]) {
      acc[devotional.week] = devotional.weekTitle;
    }
    return acc;
  }, {});

  function getProgressForWeek(weekNumber, currentDay, daysPerWeek = 7) {
    const firstDayOfWeek = (weekNumber - 1) * daysPerWeek + 1;
    const lastDayOfWeek = weekNumber * daysPerWeek;

    let daysCompleted;
    let status;

    if (currentDay < firstDayOfWeek) {
      daysCompleted = 0;
      status = "Upcoming";
    } else if (currentDay >= lastDayOfWeek) {
      daysCompleted = daysPerWeek;
      status = "Completed";
    } else {
      daysCompleted = currentDay - firstDayOfWeek + 1;
      status = "In Progress";
    }

    const percentComplete = Math.round((daysCompleted / daysPerWeek) * 100);

    return {
      weekNumber: weekNumber,
      daysCompleted: daysCompleted,
      totalDays: daysPerWeek,
      percentComplete: percentComplete,
      status: status,
      isComplete: status === "Completed",
      isCurrent: status === "In Progress",
      isUpcoming: status === "Upcoming",
    };
  }

  // Generate the progress for all 5 weeks based on the current day
  const totalWeeks = 5;
  const daysPerWeek = 7;

  const currentDay = userProgress?.currentDay - 1 || 0;

  // This creates an array with 5 week objects, indexed 0-4
  // weekProgress[0] = week 1 data, weekProgress[1] = week 2 data, etc.
  const weekProgress = Array.from({ length: totalWeeks }, (_, index) => {
    const weekNumber = index + 1;
    return getProgressForWeek(weekNumber, currentDay, daysPerWeek);
  });

  return (
    <div className="flex w-full flex-row flex-wrap justify-center gap-2 2xs:gap-3 xs:gap-4 sm:gap-5 md:gap-6 py-2 2xs:py-3 xs:py-4">
      {/* Map over weeks 1-5 to render each WeekCard */}
      {weekProgress.map((week) => {
        // Now 'week' is a single week object with all the calculated data
        // week.weekNumber tells us which week this is (1, 2, 3, 4, or 5)
        // We use that to look up the correct title from weekTitles

        return (
          <WeekCard
            // Use weekNumber as the key since it's unique for each week
            key={week.weekNumber}
            week={week.weekNumber}
            // Look up the title using the week number
            title={weekTitles[week.weekNumber]}
            status={week.status}
            progress={week.percentComplete + "%"}
            userProgress={userProgress}
            daysCompleted={week.daysCompleted}
          />
        );
      })}
    </div>
  );
}
