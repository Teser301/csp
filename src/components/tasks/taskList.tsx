// This component handles mapping tasks
import { Box } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { Task } from "../../types";
import TaskItem from "./taskItem";
interface TaskListProps {
  weekNumber: number;
  yearNumber: number;
  month: Dayjs;
  tasks: Task[];
}

function TaskList({ tasks, weekNumber, yearNumber }: TaskListProps) {
  const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  // Define a function to update the local storage key
  const updateLocalStorageKey = (
    newTaskName: string,
    TaskID: number,
    newStartDate: Dayjs | null,
    newEndDate: Dayjs | null
  ): void => {
    console.log("strogin");
    const changeStartDate = dayjs(newStartDate);
    const changeEndDate = dayjs(newEndDate);
    const updatedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    // Update the 'name' property of the selected task
    if (TaskID >= 0 && TaskID < updatedTasks.length) {
      updatedTasks[TaskID].name = newTaskName;
      updatedTasks[TaskID].startDate = changeStartDate;
      updatedTasks[TaskID].endDate = changeEndDate;
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };
  return (
    <Box sx={{ width: "100%", height: "auto" }}>
      {storedTasks.map((task: Task, taskIndex: number) => (
        <TaskItem
          key={taskIndex}
          task={task}
          weekNumber={weekNumber}
          yearNumber={yearNumber}
          taskIndex={taskIndex}
          onUpdateLocalStorageKey={(
            newTaskName,
            TaskID,
            newStartDate,
            newEndDate
          ) =>
            updateLocalStorageKey(newTaskName, TaskID, newStartDate, newEndDate)
          }
        />
      ))}
    </Box>
  );
}

export default TaskList;
