// This component handles dates that have been assigned a task.
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Popover,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Task } from "../../types";
import dayjs from "dayjs";

interface TaskItemProps {
  task: Task;
  styles: React.CSSProperties;
}

function TaskAssigned({ task, styles }: TaskItemProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedTask, setSelectedTask] = React.useState<Task | null>(null);
  const [clickOpen, setClickOpen] = React.useState(false);
  const [editedTaskName, setEditedTaskName] = React.useState(""); // State for edited task name
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
