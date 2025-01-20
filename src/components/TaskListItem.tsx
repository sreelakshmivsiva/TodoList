import { Edit, Delete } from "@mui/icons-material";
import { ListItem, Checkbox, ListItemText, Box, IconButton } from "@mui/material";
import { useDrag } from "react-dnd";

interface TaskListItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onCheck: (id: number, checked: boolean) => void;
  disableDrag: boolean; 
}

 const TaskListItem: React.FC<TaskListItemProps> = ({ task, onEdit, onDelete, onCheck, disableDrag }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id },
    canDrag: !disableDrag, 
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleEditClick = () => {
    if (!task.completed) {
      onEdit(task);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!task.completed) {
      onCheck(task.id, event.target.checked);
    }
  };

  return (
    <ListItem
      ref={!disableDrag ? drag : null} 
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: "white",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
        marginBottom: "8px",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        cursor: disableDrag ? "default" : "grab", 
      }}
    >
      <Checkbox
        checked={task.completed}
        onChange={handleCheckboxChange}
        color="primary"
        disabled={task.completed} 
      />
      <ListItemText
        primary={task.text}
        secondary={task.completionDate ? task.completionDate.toLocaleDateString() : "No date set"}
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          flex: 1,
        }}
      />
      <Box>
        <IconButton onClick={handleEditClick} disabled={task.completed}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => onDelete(task.id)}>
          <Delete />
        </IconButton>
      </Box>
    </ListItem>
  );
};
export default TaskListItem