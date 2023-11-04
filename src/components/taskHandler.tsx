import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { Task } from "../types";
interface TashHandlerProps {}

const TashHandler: React.FC<{ onTaskAdd: (task: Task) => void }> = ({
  onTaskAdd,
}) => {
  const [task, setTask] = useState<Task>({
    name: "",
    startDate: null,
    endDate: null,
  });
  // Handles the generation of tasks
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, name: e.target.value });
  };
  const handleStartDateChange = (date: dayjs.Dayjs | null) => {
    // Use DayJS type
    console.log(task);
    setTask({ ...task, startDate: date });
  };
  const handleEndDateChange = (date: dayjs.Dayjs | null) => {
    // Use DayJS type
    console.log(task);
    setTask({ ...task, endDate: date });
  };
  // Finish generation of tasks here
  const addTask = () => {
    if (task.name && task.startDate && task.endDate) {
      onTaskAdd(task);
      setTask({ name: "", startDate: null, endDate: null });
    }
  };
  return (
    <Box>
      <TextField
        id="outlined-basic"
        label="Task Name"
        variant="outlined"
        onChange={handleNameChange}
      />
      <MobileDatePicker onChange={handleStartDateChange} />
      <MobileDatePicker onChange={handleEndDateChange} />
      <Button variant="contained" onClick={addTask}>
        Add
      </Button>
    </Box>
  );
};

export default TashHandler;
