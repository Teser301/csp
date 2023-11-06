import { Box } from "@mui/material";
import { Dayjs } from "dayjs";
import { Task } from "../../types";
import calculateWeekNumbers from "../../utils/calcWeekNumber";
import CalendarHeader from "./calendarHeader";
import CalendarWeeks from "./calendarWeeks";

interface CalendarGridProps {
  months: Dayjs[];
  tasks: Task[];
}

function CalendarGrid({ months, tasks }: CalendarGridProps) {
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
              {weeksInMonth.map((weekNumber, index) => (
                <CalendarWeeks
                  key={index}
                  weekNumber={weekNumber}
                  tasks={tasks}
                  index={index}
                  yearNumber={yearNumber}
                  month={month}
                />
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default CalendarGrid;
