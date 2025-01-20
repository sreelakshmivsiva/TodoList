import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css"; 
import "react-calendar/dist/Calendar.css"; 
import "./TaskInput.css";


interface TaskInputProps {
  onAdd: (text: string, completionDate: Date | null) => void;
  initialText?: string;
  initialDate?: Date | null;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAdd, initialText = "", initialDate = null }) => {
  const [text, setText] = useState(initialText);
  const [completionDate, setCompletionDate] = useState<Date | null>(initialDate);

  const handleSubmit = () => {
    if (text) {
      onAdd(text, completionDate);
      setText("");
      setCompletionDate(null);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6">Enter Task Details</Typography>
      <TextField
        label="Task Name"
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
      />
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Completion Date
        </Typography>
        <DatePicker
          value={completionDate}
          onChange={setCompletionDate}
          clearIcon={null}
          format="y-MM-dd"
          className="custom-date-picker"
        />
      </Box>
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Save Task
      </Button>
    </Box>
  );
};

export default TaskInput;
