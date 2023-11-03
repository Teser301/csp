import dayjs from "dayjs";

function calculateWeekNumbers(month: dayjs.Dayjs | Date | null | undefined) {
  const weeks: number[] = [];
  const firstDayOfMonth = dayjs(month).startOf("month");
  const lastDayOfMonth = dayjs(month).endOf("month");
  let currentDay = firstDayOfMonth;
  let currentWeekNumber = currentDay.isoWeek();
  let daysInCurrentWeek = 0;

  while (currentDay.isBefore(lastDayOfMonth)) {
    daysInCurrentWeek++;
    if (currentDay.isoWeek() !== currentWeekNumber) {
      // Check if the current week has more than 4 days in the current month
      if (daysInCurrentWeek > 4) {
        weeks.push(currentWeekNumber);
      }
      currentWeekNumber = currentDay.isoWeek();
      daysInCurrentWeek = 1;
    }
    currentDay = currentDay.add(1, "day");
  }
  // Check the last week of the month
  if (daysInCurrentWeek >= 4) {
    weeks.push(currentWeekNumber);
  }
  return weeks;
}

export default calculateWeekNumbers;
