import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { Box, Typography } from "@mui/material";
import isBetween from "dayjs/plugin/isBetween";
import isoWeek from "dayjs/plugin/isoWeek";
import customParseFormat from "dayjs/plugin/customParseFormat";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(weekOfYear);
dayjs.extend(isBetween);
dayjs.extend(isoWeek);
dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);
dayjs.updateLocale("custom", {
  week: {
    dow: 1, // Monday
  },
});
dayjs.locale("custom");
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
      startDate: "10 November 2023",
      endDate: "20 November 2023",
    },
    {
      name: "Work",
      startDate: "07 November 2023",
      endDate: "18 December 2023",
    },
    {
      name: "Dishes",
      startDate: "16 December 2023",
      endDate: "18 January 2024",
    },
  ];

  function calculateWeekNumbersForMonth(
    month: dayjs.Dayjs | Date | null | undefined
  ) {
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
    if (daysInCurrentWeek > 4) {
      weeks.push(currentWeekNumber);
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
            const yearTrack = month.format("YY");
            const yearNumber = parseInt(yearTrack, 10);
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
                        <Box>
                          {taskArray.map((task, index) => {
                            const taskStartDate = dayjs(task.startDate);
                            const taskEndDate = dayjs(task.endDate);
                            const startDate = dayjs()
                              .week(weekNumber)
                              .year(yearNumber)
                              .startOf("isoWeek")
                              .isoWeekday(1)
                              .format("DD/MM/YY");
                            const endDate = dayjs()
                              .week(weekNumber)
                              .year(yearNumber)
                              .startOf("isoWeek")
                              .isoWeekday(7)
                              .format("DD/MM/YY");
                            {
                              return (
                                <Typography
                                  key={index}
                                  sx={{
                                    border: "1px solid black",
                                    textAlign: "center",
                                  }}
                                >
                                  {dayjs(taskStartDate).isBetween(
                                    startDate,
                                    endDate
                                  ) ||
                                  dayjs(taskEndDate).isBetween(
                                    startDate,
                                    endDate
                                  )
                                    ? task.name
                                    : "false"}
                                  <br />
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
