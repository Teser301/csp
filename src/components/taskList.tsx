import * as React from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { Task } from "../types";

interface TaskListProps {
  weekNumber: number;
  yearNumber: number;
  month: Dayjs;
  tasks: Task[];
}

function TaskList({ tasks, weekNumber, yearNumber }: TaskListProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);

  const handleClick = (task: Task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedTask(null);
    setOpen(false);
  };

  return (
    <Box sx={{ width: "100%", height: "auto" }}>
      {tasks.map((task, taskIndex) => {
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
          <Button
            key={taskIndex}
            sx={{
              border: "1px solid gray",
              padding: 0,
              backgroundColor: task.color,
              borderRadius: "0px",
              cursor: "pointer",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
              height: "100px",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#36454F", // Change background color on hover
                color: "#fff", // Change text color on hover
              },
            }}
            onClick={() => handleClick(task)}
          >
            {task.name}
          </Button>
        ) : (
          <Box
            key={taskIndex}
            sx={{
              border: "1px solid gray",
              borderTop: "none",
              borderBottom: "none",
              textAlign: "center",
              height: "100px",
            }}
          >
            <Typography>{""}</Typography>
          </Box>
        );
      })}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm" // Set the maximum width of the dialog
      >
        {selectedTask && (
          <div>
            <DialogTitle
              sx={{
                background: "#36454F",
                height: "50px",
              }}
            >
              {selectedTask.name}
            </DialogTitle>
            <DialogContent sx={{ background: "#36454F", padding: "10px" }}>
              <Typography>
                {dayjs(selectedTask.startDate).format("DD MMM/YYYY")} -{" "}
                {dayjs(selectedTask.endDate).format("DD MMM/YYYY")}
              </Typography>
            </DialogContent>
          </div>
        )}
      </Dialog>
    </Box>
  );
}

export default TaskList;
