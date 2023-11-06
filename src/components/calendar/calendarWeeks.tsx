import { Box, Typography } from "@mui/material";
import { Dayjs } from "dayjs";
import { Task } from "../../types";
import TaskList from "../tasks/taskList";

interface weeksInMonthProps {
  weekNumber: number;
  tasks: Task[];
  index: number;
  yearNumber: number;
  month: Dayjs;
}

function weeksInMonth({
  weekNumber,
  index,
  tasks,
  yearNumber,
  month,
}: weeksInMonthProps) {
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
}

export default weeksInMonth;
