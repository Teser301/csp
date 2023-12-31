// This component handles task generation
import React from "react";
import { Box, Typography } from "@mui/material";
import { Task } from "../../types";
import dayjs, { Dayjs } from "dayjs";
import TaskAssigned from "./taskAssigned";

interface TaskItemProps {
  key: number;
  task: Task;
  weekNumber: number;
  yearNumber: number;
  taskIndex: number;
  onUpdateLocalStorageKey: (
    newTaskName: string,
    taskID: number,
    newStartDate: Dayjs | null,
    newEndDate: Dayjs | null
  ) => void; // Define the function prop
}

function TaskItem({
  task,
  weekNumber,
  yearNumber,
  taskIndex,
  onUpdateLocalStorageKey,
}: TaskItemProps) {
  // Reuse styles
  const borderStyles: React.CSSProperties = {
    border: "1px solid gray",
    borderTop: "none",
    borderBottom: "none",
    textAlign: "center",
    height: "100px",
  };
  // Define dates
  const taskStartDate = dayjs(task.startDate, {
    format: "DD MMMM YYYY",
  });
  const taskEndDate = dayjs(task.endDate, {
    format: "DD MMMM YYYY",
  });
  const startDate = dayjs()
    .week(weekNumber)
    .year(yearNumber)
    .startOf("isoWeek");
  const endDate = dayjs()
    .week(weekNumber)
    .year(yearNumber)
    .startOf("isoWeek")
    .isoWeekday(7);
  // Cycle through every day inbetween two dates into an array
  const datesInRange = [];
  let currentDate = taskStartDate.clone();
  while (
    currentDate.isBefore(taskEndDate) ||
    currentDate.isSame(taskEndDate, "day")
  ) {
    datesInRange.push(currentDate);
    currentDate = currentDate.add(1, "day");
  }
  // See if date fits with array
  return datesInRange.some((date) => {
    return (
      date.isSameOrAfter(startDate, "day") &&
      date.isSameOrBefore(endDate, "day")
    );
  }) ? (
    // If found
    <>
      <TaskAssigned
        styles={borderStyles}
        task={task}
        taskIndex={taskIndex}
        onTaskNameChange={onUpdateLocalStorageKey}
      />
    </>
  ) : (
    // If not
    <Box
      sx={{
        ...borderStyles,
      }}
    >
      <Typography>{""}</Typography>
    </Box>
  );
}

export default TaskItem;
