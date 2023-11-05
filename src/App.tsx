import React, { useState } from "react";
import DateNavigation from "./components/dateNavigation";
import TaskHandler from "./components/taskHandler";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Task } from "./types";
import CalendarGrid from "./components/calendarGrid";
// DayJS imports
import dayjs, { Dayjs } from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isoWeek from "dayjs/plugin/isoWeek";
import customParseFormat from "dayjs/plugin/customParseFormat";
import updateLocale from "dayjs/plugin/updateLocale";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
dayjs.extend(quarterOfYear);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);
dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.updateLocale("custom", {
  week: {
    dow: 1, // Monday
  },
});
dayjs.locale("custom");

function App() {
  const [dayObj, setDayObj] = useState<Dayjs>(dayjs().locale("en")); // Tracks current day
  const [tasks, setTasks] = useState<Task[]>([]); // Tracks tasks

  // Handles DateNavigation
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
      <DateNavigation
        dayObj={dayObj}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
      <TaskHandler onTaskAdd={handleTaskAdd} />
      <CalendarGrid months={months} tasks={tasks} />
    </LocalizationProvider>
  );
}

export default App;
