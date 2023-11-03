// TaskList.tsx
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

interface TaskListProps {
  weekNumber: number;
  yearNumber: number;
  month: Dayjs;
}

function TaskList({ weekNumber, yearNumber, month }: TaskListProps) {
  // Static array
  const minTasks = 10;
  const taskArray = [
    {
      name: "BBQ",
      startDate: "12 November 2023",
      endDate: "21 November 2023",
      color: "red",
    },
    {
      name: "Work",
      startDate: "07 November 2023",
      endDate: "18 December 2023",
      color: "blue",
    },
    {
      name: "Dishes",
      startDate: "16 December 2023",
      endDate: "18 March 2024",
      color: "green",
    },
  ];

  return (
    <Box>
      {taskArray.map((task, taskIndex) => {
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

        const datesInRange = [];
        let currentDate = taskStartDate.clone();

        while (
          currentDate.isBefore(taskEndDate) ||
          currentDate.isSame(taskEndDate, "day")
        ) {
          datesInRange.push(currentDate);
          currentDate = currentDate.add(1, "day");
        }

        return datesInRange.some((date) => {
          return (
            date.isSameOrAfter(startDate, "day") &&
            date.isSameOrBefore(endDate, "day")
          );
        }) ? (
          <Box
            key={taskIndex}
            sx={{
              border: "1px solid black",
              textAlign: "center",
              minHeight: "50px",
              backgroundColor: task.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>{task.name}</Typography>
          </Box>
        ) : (
          <Box
            key={taskIndex}
            sx={{
              border: "1px solid black",
              textAlign: "center",
              minHeight: "50px",
            }}
          >
            <Typography>{""}</Typography>
          </Box>
        );
      })}
    </Box>
  );
}

export default TaskList;
