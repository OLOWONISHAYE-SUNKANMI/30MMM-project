export function calculateWeekAndDay(totalDays) {
  if (totalDays < 1) {
    throw new Error("Day count must be at least 1");
  }

  if (totalDays > 35) {
    throw new Error("Day count exceeds the maximum of 35 days");
  }

  const week = Math.ceil(totalDays / 7);
  const day = ((totalDays - 1) % 7) + 1;

  return { week, day };
}

export function calculateTotalDays(week, day) {
  return (week - 1) * 7 + day;
}

// Tests the function
// console.log(calculateWeekAndDay(4)); // { week: 1, day: 4 }
// console.log(calculateWeekAndDay(15)); // { week: 3, day: 1 }
// console.log(calculateWeekAndDay(10)); // { week: 2, day: 3 }
// console.log(calculateWeekAndDay(21)); // { week: 3, day: 7 }
// console.log(calculateWeekAndDay(22)); // { week: 4, day: 1 }
