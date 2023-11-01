import React, { useState } from "react";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import range from "lodash-es/range";
import { Box, Typography } from "@mui/material";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const todayObj = dayjs();
dayjs.extend(weekOfYear);
function App() {
  const [dayObj, setDayObj] = useState(dayjs().locale("en"));

  const handlePrev = () => {
    setDayObj(dayObj.subtract(3, "month"));
  };

  const handleNext = () => {
    setDayObj(dayObj.add(3, "month"));
  };
  const months = [];
  for (let i = 0; i < 3; i++) {
    months.push(dayObj.add(i, "month"));
  }

  function customRange(start: number, end: number, step = 1) {
    if (step === 0) {
      throw new Error("Step cannot be zero.");
    }

    const result = [];
    if (start < end) {
      for (let i = start; i < end; i += step) {
        result.push(i);
      }
    } else if (start > end) {
      for (let i = start; i > end; i -= step) {
        result.push(i);
      }
    }

    return result;
  }
  return (
    <div className="calendar">
      <div className="header"></div>
      <div>
        <h2>Quarter</h2>
        <div className="datetime">{dayObj.format("YYYY")}</div>
        <button type="button" className="nav nav--prev" onClick={handlePrev}>
          &lt;
        </button>
        <button type="button" className="nav nav--prev" onClick={handleNext}>
          &gt;
        </button>

        {months.map((month, index) => {
          const thisYear = month.year();
          const thisMonth = month.month();
          const daysInMonth = month.daysInMonth();
          const dayObjOf1 = dayjs(`${thisYear}-${thisMonth + 1}-1`);
          const weekDayOf1 = (dayObjOf1.day() + 6) % 7;
          const dayObjOfLast = dayjs(
            `${thisYear}-${thisMonth + 1}-${daysInMonth}`
          );
          const weekDayOfLast = dayObjOfLast.day();
          const weekNumberOf1 = dayObjOf1.week();
          const weekNumberOfLast = dayObjOfLast.week(); // Week of the year for the last day of the month
          return (
            <Box key={index}>
              <Typography
                sx={{
                  textAlign: "center",
                }}
              >
                {month.format("MMMM")}
              </Typography>
              <Box></Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                }}
              >
                <Typography sx={{ textAlign: "center" }}>
                  Week {weekNumberOf1} - {weekNumberOfLast}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateRows: "repeat(7, 1fr)",
                  gridAutoFlow: "column",
                }}
              >
                {range(weekDayOf1).map((i) => (
                  <Box
                    key={i}
                    sx={{
                      opacity: "0.5",
                    }}
                  >
                    {dayObjOf1.subtract(weekDayOf1 - i, "day").date()}
                  </Box>
                ))}
                {range(daysInMonth).map((i) => (
                  <div
                    className={`day-cell day-cell--in-month${
                      i + 1 === todayObj.date() &&
                      thisMonth === todayObj.month() &&
                      thisYear === todayObj.year()
                        ? " day-cell--today"
                        : ""
                    }`}
                    key={i}
                  >
                    {i + 1}
                  </div>
                ))}
                {range(7 - weekDayOfLast).map((i) => (
                  <Box
                    key={i}
                    sx={{
                      opacity: "0.5",
                    }}
                  >
                    {dayObjOfLast.add(i + 1, "day").date()}
                  </Box>
                ))}
                <div className="day-container"></div>
              </Box>
            </Box>
          );
        })}
      </div>
    </div>
  );
}

export default App;
