import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { Box, Typography } from "@mui/material";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(weekOfYear);
dayjs.extend(isBetween);
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function App() {
  const [dayObj, setDayObj] = useState<Dayjs>(dayjs().locale("en"));

  const handlePrev = () => {
    setDayObj(dayObj.subtract(3, "month"));
  };

  const handleNext = () => {
    setDayObj(dayObj.add(3, "month"));
  };

  const months: Dayjs[] = [];
  for (let i = 0; i < 3; i++) {
    months.push(dayObj.add(i, "month"));
  }

  const taskArray = [
    {
      name: "BBQ",
      startDate: "2023-10-10",
      endDate: "2023-12-30",
    },
    {
      name: "Work",
      startDate: "2023-11-12",
      endDate: "2023-11-18",
    },
    {
      name: "Dishes",
      startDate: "2024-01-14",
      endDate: "2024-01-18",
    },
  ];

  function calculateWeekNumbersForMonth(month: Dayjs) {
    const weeks: number[] = [];
    const firstDayOfMonth = dayjs(month).startOf("month");
    const lastDayOfMonth = dayjs(month).endOf("month");

    let currentWeekStartDate = firstDayOfMonth.startOf("week");

    while (currentWeekStartDate.isBefore(lastDayOfMonth)) {
      weeks.push(currentWeekStartDate.week());
      currentWeekStartDate = currentWeekStartDate.add(1, "week");
    }

    return weeks;
  }

  return (
    <div className="calendar">
      <div className="header"></div>
      <div>
        <div className="datetime">{dayObj.format("YYYY")}</div>
        <button type="button" className="nav nav--prev" onClick={handlePrev}>
          &lt;
        </button>
        <h2>Quarter</h2>
        <button type="button" className="nav nav--prev" onClick={handleNext}>
          &gt;
        </button>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          {months.map((month, index) => {
            const weeksInMonth = calculateWeekNumbersForMonth(month);
            return (
              <Box key={index}>
                <Typography
                  sx={{
                    textAlign: "center",
                    border: "1px solid black",
                  }}
                >
                  {month.format("MMMM")}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  {weeksInMonth.map((weekNumber) => {
                    const currentWeekStartDate = dayjs(month)
                      .week(weekNumber)
                      .startOf("week");
                    return (
                      <Box sx={{ flexGrow: "1" }}>
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
                        <Box>
                          {taskArray.map((task) => {
                            const taskStartDate = dayjs(task.startDate);
                            const taskEndDate = dayjs(task.endDate);

                            if (
                              taskStartDate.isBetween(
                                currentWeekStartDate,
                                currentWeekStartDate.endOf("week")
                              ) ||
                              taskEndDate.isBetween(
                                currentWeekStartDate,
                                currentWeekStartDate.endOf("week")
                              )
                            ) {
                              return (
                                <Typography
                                  key={task.name}
                                  sx={{
                                    border: "1px solid black",
                                    textAlign: "center",
                                    backgroundColor: "red",
                                  }}
                                >
                                  {task.name}
                                  <br />
                                </Typography>
                              );
                            } else {
                              return (
                                <Typography
                                  key={task.name}
                                  sx={{
                                    border: "1px solid black",
                                    textAlign: "center",
                                    backgroundColor: "transparent",
                                  }}
                                >
                                  empty
                                </Typography>
                              );
                            }
                          })}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            );
          })}
        </Box>
      </div>
    </div>
  );
}

export default App;
