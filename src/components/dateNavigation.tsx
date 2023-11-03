import React, { FunctionComponent } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Box, Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
interface DateNavigationProps {
  dayObj: Dayjs;
  handlePrev: () => void;
  handleNext: () => void;
}

const DateNavigation: FunctionComponent<DateNavigationProps> = ({
  dayObj,
  handlePrev,
  handleNext,
}) => {
  const year = dayObj.year();
  const quarter = Math.ceil(dayObj.quarter());
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        variant="contained"
        type="button"
        className="nav nav--prev"
        onClick={handlePrev}
      >
        <ArrowBackIcon />
      </Button>

      <Typography
        variant="h3"
        sx={{
          margin: "20px",
          color: "white",
        }}
      >
        Quarter {quarter} of {dayObj.format("YYYY")}
      </Typography>

      <Button
        variant="contained"
        type="button"
        className="nav nav--next"
        onClick={handleNext}
      >
        <ArrowForwardIcon />
      </Button>
    </Box>
  );
};

export default DateNavigation;
