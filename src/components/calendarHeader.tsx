// CalendarHeader.tsx
import { Dayjs } from "dayjs";
import { Box, Typography } from "@mui/material";

interface CalendarHeaderProps {
  month: Dayjs;
}

function CalendarHeader({ month }: CalendarHeaderProps) {
  // const monthColors = [
  //   "#472183", // January
  //   "82C3EC", // February
  //   "green", // March
  // ];
  // const monthIndex = month.month();
  return (
    <Box>
      <Typography
        sx={{
          textAlign: "center",
          border: "1px solid black",
        }}
      >
        {month.format("MMMM")}
      </Typography>
    </Box>
  );
}

export default CalendarHeader;
