import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import CalendarHeader from "./components/calendarHeader";
import TaskList from "./components/taskList";
import DateNavigation from "./components/dateNavigation";
import calculateWeekNumbers from "./utils/calcWeekNumber";
import TaskHandler from "./components/taskHandler";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Task } from "./types";
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
    console.log(tasks);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {tasks.map((task, index) => (
        <li key={index}>
          Task Name: {task.name}
          <br />
          Start Date: {task.startDate?.format("MM/DD/YYYY")}
          <br />
          End Date: {task.endDate?.format("MM/DD/YYYY")}
        </li>
      ))}
      <div className="calendar">
        <DateNavigation
          dayObj={dayObj}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
        <TaskHandler onTaskAdd={handleTaskAdd} />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
            maxWidth: "1440px",
            margin: "0 auto",
          }}
        >
          {months.map((month, index) => {
            const yearNumber = month.year();

            const weeksInMonth = calculateWeekNumbers(month);
            return (
              <Box
                key={index}
                sx={{
                  backgroundColor: "white",
                  border: "2px solid black",
                }}
              >
                <CalendarHeader month={month} />
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  {weeksInMonth.map((weekNumber, index) => {
                    return (
                      <Box key={index} sx={{ flexGrow: "1" }}>
                        <Box>
                          <Typography
                            sx={{
                              border: "1px solid black",
                              textAlign: "center",
                            }}
                            key={weekNumber}
                          >
                            {weekNumber}
                          </Typography>
                        </Box>
                        <TaskList
                          weekNumber={weekNumber}
                          yearNumber={yearNumber}
                          month={month}
                          tasks={tasks}
                        />
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            );
          })}
        </Box>
      </div>
    </LocalizationProvider>
  );
}

export default App;
