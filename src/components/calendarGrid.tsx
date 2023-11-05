import React from "react";
import { Box, Typography } from "@mui/material";
import CalendarHeader from "./calendarHeader";
import TaskList from "./taskList";
import { Dayjs } from "dayjs";
import calculateWeekNumbers from "../utils/calcWeekNumber";
import { Task } from "../types";

interface CalendarGridProps {
  months: Dayjs[];
  tasks: Task[];
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ months, tasks }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "10px",
        maxWidth: "1440px",
        margin: "20px auto",
      }}
    >
      {months.map((month, index) => {
        const yearNumber = month.year();

        const weeksInMonth = calculateWeekNumbers(month);
        return (
          <Box key={index} sx={{}}>
            <CalendarHeader month={month} />
            <Box
              sx={{
                display: "flex",
              }}
            >
              {weeksInMonth.map((weekNumber, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      flexGrow: "1",
                      backgroundColor: "#fff",
                      width: "75px",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          border: "1px solid gray",
                          borderTop: "none",
                          borderBottom: "none",
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
  );
};

export default CalendarGrid;
