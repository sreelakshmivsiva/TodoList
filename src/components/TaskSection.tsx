import React from "react";
import { Box, Typography } from "@mui/material";
import TaskList from "./TaskList";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  completionDate: Date | null;
}

interface TaskSectionProps {
  title: string;
  tasks: Task[];
  onMove: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onCheck: (id: number, checked: boolean) => void;
}

const TaskSection: React.FC<TaskSectionProps> = ({
  title,
  tasks,
  onMove,
  onEdit,
  onDelete,
  onCheck,
}) => {
  return (
    <Box flex={1}>
      <Typography variant="h6" mb={2}>
        {title}
      </Typography>
      <TaskList tasks={tasks} onMove={onMove} onEdit={onEdit} onDelete={onDelete} onCheck={onCheck} />
    </Box>
  );
};

export default TaskSection;
