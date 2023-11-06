// This component handles mapping tasks
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Dayjs } from "dayjs";
import { Task } from "../../types";
import TaskItem from "./taskItem";
interface TaskListProps {
  weekNumber: number;
  yearNumber: number;
  month: Dayjs;
  tasks: Task[];
}

function TaskList({ tasks, weekNumber, yearNumber }: TaskListProps) {
  return (
    <Box sx={{ width: "100%", height: "auto" }}>
      {tasks.map((task, taskIndex) => (
        <TaskItem
          key={taskIndex}
          task={task}
          weekNumber={weekNumber}
          yearNumber={yearNumber}
        />
      ))}
    </Box>
  );
}

export default TaskList;
