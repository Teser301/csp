import { Dayjs } from "dayjs";
import { Box, Typography } from "@mui/material";

interface CalendarHeaderProps {
  month: Dayjs;
}

function CalendarHeader({ month }: CalendarHeaderProps) {
  const monthColors = [
    "#005e72", // January
    "#c70779", // February
    "#e6334b", // March
    "#ffb713", // April
    "#f5e077", // May
    "#83cade", // June
    "#218bab", // July
    "#e1b0c6", // August
    "#d6af08", // September
    "#973a06", // October
    "#36450e", // November
    "#342486", // December
  ];
  const monthIndex = month.month();
  const backgroundColor = monthColors[monthIndex];
  return (
    <Box
      sx={{
        backgroundColor: backgroundColor,
        height: "4rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "5px 5px 0px 0px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          color: "#fff",
        }}
      >
        {month.format("MMMM")}
      </Typography>
    </Box>
  );
}

export default CalendarHeader;
