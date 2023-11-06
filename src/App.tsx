import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Task } from "./types";
import dayjs, { Dayjs } from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isoWeek from "dayjs/plugin/isoWeek";
import customParseFormat from "dayjs/plugin/customParseFormat";
import updateLocale from "dayjs/plugin/updateLocale";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import CalendarNavigation from "./components/calendar/calendarNavigation";
import CalendarGrid from "./components/calendar/calendarGrid";
import TaskCreator from "./components/tasks/taskCreator";
// Extend Day.js plugins
dayjs.extend(quarterOfYear);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);
dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

// Update the custom locale
dayjs.updateLocale("custom", {
  week: {
    dow: 1, // Monday
  },
});

// Set the locale to 'custom'
dayjs.locale("custom");

function App() {
  const [dayObj, setDayObj] = useState<Dayjs>(dayjs().locale("en")); // Tracks current day
  const [tasks, setTasks] = useState<Task[]>([]); // Tracks tasks

  // Handles CalendarNavigation
  const handlePrev = () => {
    setDayObj(dayObj.subtract(3, "month"));
  };
  const handleNext = () => {
    setDayObj(dayObj.add(3, "month"));
  };
  // Get 3 months for a quarter
  const months: Dayjs[] = [];
  for (let i = 0; i < 3; i++) {
    months.push(dayObj.add(i, "month"));
  }
  // Store Tasks in state
  const handleTaskAdd = (task: Task) => {
    // Add the task to your array or perform any other necessary actions.
    setTasks([...tasks, task]);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TaskCreator onTaskAdd={handleTaskAdd} />
      <CalendarNavigation
        dayObj={dayObj}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
      <CalendarGrid months={months} tasks={tasks} />
    </LocalizationProvider>
  );
}

export default App;
