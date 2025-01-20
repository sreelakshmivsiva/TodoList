import React from "react";
import {  useDrop } from "react-dnd";
import { List,  Box, Typography } from "@mui/material";
import TaskListItem from "./TaskListItem";
interface Task {
  id: number;
  text: string;
  completed: boolean;
  completionDate: Date | null;
}

interface TaskListProps {
  tasks: Task[];
  onMove: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onCheck: (id: number, checked: boolean) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onMove, onEdit, onDelete, onCheck }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "TASK",
    drop: (item: { id: number }) => {
      onMove(item.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const getBackgroundColor = () => {
    if (isOver && canDrop) return "#e0ffe0"; 
    if (isOver) return "#ffe0e0"; 
    return "#f9f9f9"; 
  };

  return (
    <Box
      ref={drop}
      style={{
        border: "2px dashed gray",
        backgroundColor: getBackgroundColor(),
        minHeight: "300px",
        padding: "16px",
        transition: "background-color 0.2s ease",
      }}
    >
      <List>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskListItem
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onCheck={onCheck}
              disableDrag={task.completed} 
            />
          ))
        ) : (
          <Typography align="center" color="textSecondary">
           Nothing to display
          </Typography>
        )}
      </List>
    </Box>
  );
};



export default TaskList;
