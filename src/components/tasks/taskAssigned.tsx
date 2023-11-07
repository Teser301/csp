// This component handles dates that have been assigned a task.
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Popover,
  Dialog,
  TextField,
} from "@mui/material";
import { Task } from "../../types";
import dayjs, { Dayjs } from "dayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
interface TaskItemProps {
  task: Task;
  styles: React.CSSProperties;
  taskIndex: number;
  onTaskNameChange: (
    newTaskName: string,
    taskID: number,
    newStartDate: Dayjs | null,
    newEndDate: Dayjs | null
  ) => void; // Define a callback function to pass the new task name
}

function TaskAssigned({
  task,
  styles,
  onTaskNameChange,
  taskIndex,
}: TaskItemProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);
  const [clickOpen, setClickOpen] = React.useState(false);
  const [editedTaskName, setEditedTaskName] = React.useState(task.name);
  const [editedStartDate, setEditedStartDate] = React.useState(
    dayjs(task.startDate)
  );
  const [editedEndDate, setEditedEndDate] = React.useState(dayjs(task.endDate));

  // Handle changes
  const handleTaskNameChange = () => {
    onTaskNameChange(editedTaskName, taskIndex, editedStartDate, editedEndDate);

    window.location.reload();
  };

  // For hover popup
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const maxCharacterLimit = 15;
  const truncatedTaskName =
    task.name.length > maxCharacterLimit
      ? `${task.name.slice(0, maxCharacterLimit)}...`
      : task.name;

  // For Click popup
  const handleClick = (task: Task) => {
    setSelectedTask(task);
    setClickOpen(true);
  };
  const handleClose = () => {
    setSelectedTask(null);
    setClickOpen(false);
  };

  return (
    <>
      <Button
        sx={{
          ...styles,
          padding: 0,
          backgroundColor: task.color,
          borderRadius: "0px",
          cursor: "pointer",
          overflowY: "hidden",
          textOverflow: "ellipsis",
          width: "100%",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#36454F", // Change background color on hover
            color: "#fff", // Change text color on hover
          },
        }}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={() => handleClick(task)}
        aria-owns={open ? "mouse-over-popover" : undefined}
      >
        {truncatedTaskName}
      </Button>
      <Dialog open={clickOpen} onClose={handleClose} maxWidth="sm">
        {selectedTask && (
          <Box
            sx={{
              display: "grid",
              padding: "10px",
              gap: "10px",
            }}
          >
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Task Name"
              value={editedTaskName}
              onChange={(e) => setEditedTaskName(e.target.value)}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <MobileDatePicker
                label="Start Date"
                onChange={(newDate) => {
                  if (newDate !== null) {
                    setEditedStartDate(newDate);
                  }
                }}
                value={editedStartDate}
              />
              <MobileDatePicker
                label="End Date"
                onChange={(endDate) => {
                  if (endDate !== null) {
                    setEditedEndDate(endDate);
                  }
                }}
                value={editedEndDate}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "10px",
              }}
            >
              <Button variant="contained" onClick={handleTaskNameChange}>
                Save
              </Button>
              <Button variant="contained" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      </Dialog>

      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box
          sx={{
            padding: "10px",
          }}
        >
          <Typography>Task:{task.name}</Typography>
          <Typography>
            Due:
            {dayjs(task.startDate).format("DD/MMM/YY")} -{" "}
            {dayjs(task.endDate).format("DD/MMM/YY")}
          </Typography>
        </Box>
      </Popover>
    </>
  );
}

export default TaskAssigned;
