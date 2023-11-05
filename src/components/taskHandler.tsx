import React, { useState } from "react";
import { Box, Typography, Button, TextField, Alert } from "@mui/material";
import dayjs from "dayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { Task } from "../types";

interface TashHandlerProps {
  onTaskAdd: (task: Task) => void;
}

const TashHandler: React.FC<TashHandlerProps> = ({ onTaskAdd }) => {
  const [task, setTask] = useState<Task>({
    name: "",
    startDate: null,
    endDate: null,
    color: "", // Initially empty
  });
  const [errors, setErrors] = useState<{ name: string; date: string }>({
    name: "",
    date: "",
  });
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const randomColor = generateRandomColor(); // Generate the color
    setTask({ ...task, name, color: randomColor }); // Update the task with the generated color
  };

  const handleStartDateChange = (date: dayjs.Dayjs | null) => {
    setTask({ ...task, startDate: date });
    validateDates(date, task.endDate);
  };

  const handleEndDateChange = (date: dayjs.Dayjs | null) => {
    setTask({ ...task, endDate: date });
    validateDates(task.startDate, date);
  };

  const validateDates = (
    startDate: dayjs.Dayjs | null,
    endDate: dayjs.Dayjs | null
  ) => {
    if (startDate && endDate && startDate.isAfter(endDate)) {
      setErrors({
        ...errors,
        date: "End date cannot be before the start date",
      });
      setButtonDisabled(true);
    } else {
      setErrors({ ...errors, date: "" });
      setButtonDisabled(false);
    }
    checkButtonState();
  };

  const generateRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  const checkButtonState = () => {
    if (
      !task.name ||
      !task.startDate ||
      !task.endDate ||
      errors.name ||
      errors.date
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };

  const addTask = () => {
    if (
      !task.name ||
      !task.startDate ||
      !task.endDate ||
      errors.name ||
      errors.date
    ) {
      setErrors({
        name: task.name ? "" : "Task name is required",
        date: errors.date || "Date is required",
      });
      return;
    }

    onTaskAdd(task);

    setTask({
      name: "",
      startDate: null,
      endDate: null,
      color: "", // Reset the color to empty
    });
    setErrors({ name: "", date: "" });
    setButtonDisabled(true);
  };

  return (
    <Box
      sx={{
        display: "grid",
        justifyContent: "center",
        gap: "5px",
        backgroundColor: "white",
        padding: "20px",
      }}
    >
      {errors.name && <Alert severity="error">{errors.name}</Alert>}
      {errors.date && <Alert severity="error">{errors.date}</Alert>}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Task Name"
          variant="outlined"
          onChange={handleNameChange}
          value={task.name}
        />
        <Box
          sx={{
            height: "30px",
            borderRadius: "5px",
            backgroundColor: task.color,
          }}
        >
          <Typography
            sx={{
              opacity: "0.5",
              padding: "2.5px",
            }}
          >
            {task.color}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
        }}
      >
        <MobileDatePicker
          label="Start Date"
          format="DD MMM YYYY"
          onChange={handleStartDateChange}
          value={task.startDate}
        />

        <MobileDatePicker
          label="End Date"
          format="DD MMM YYYY"
          onChange={handleEndDateChange}
          value={task.endDate}
        />
      </Box>

      <Button variant="contained" onClick={addTask} disabled={isButtonDisabled}>
        Add Task
      </Button>
    </Box>
  );
};

export default TashHandler;
