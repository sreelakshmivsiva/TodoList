import React, { useState } from "react";
import { Box, Typography, Button, Dialog, CssBaseline, GlobalStyles } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskInput from "./components/TaskInput";
import TaskSection from "./components/TaskSection";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  completionDate: Date | null;
}

const globalStyles = (
  <GlobalStyles
    styles={{
      "html, body, #root": {
        margin: 0,
        padding: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      },
    }}
  />
);

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const addTask = (text: string, completionDate: Date | null) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false, completionDate }]);
    setIsAddModalOpen(false);
  };

  const editTask = (id: number, text: string, completionDate: Date | null) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text, completionDate } : task)));
    setIsEditModalOpen(false);
  };

  const moveTask = (id: number, toCompleted: boolean) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: toCompleted } : task)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const openEditModal = (task: Task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  const completedTasks = tasks.filter((task) => task.completed);
  const nonCompletedTasks = tasks.filter((task) => !task.completed);
  const handleCheck = (id: number, checked: boolean) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: checked } : task)));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <CssBaseline />
      {globalStyles}
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          bgcolor: "background.default",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            p: { xs: 2, sm: 4 },
          }}
        >
          <Typography variant="h4" mb={4} textAlign="center" color="primary">
            My ToDo List
          </Typography>

          
          <Dialog open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
            <Box p={4} minWidth={300}>
              <TaskInput onAdd={addTask} />
            </Box>
          </Dialog>

         
          {taskToEdit && (
            <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
              <Box p={4} minWidth={300}>
                <TaskInput
                  onAdd={(text, completionDate) => editTask(taskToEdit.id, text, completionDate)}
                  initialText={taskToEdit.text}
                  initialDate={taskToEdit.completionDate}
                />
              </Box>
            </Dialog>
          )}

          {/* Task Sections */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" }, 
              mt: 4,
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                flex: "1",
                maxWidth: { xs: "100%", lg: "46%" }, 
                p: 2,
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <TaskSection
                title="Uncompleted Tasks"
                tasks={nonCompletedTasks}
                onMove={(id) => moveTask(id, true)}
                onEdit={openEditModal}
                onDelete={deleteTask}
                onCheck={handleCheck}
              />
            </Box>

            <Box
              sx={{
                flex: "1",
                maxWidth: { xs: "100%", lg: "46%" }, 
                bgcolor: "background.paper",
                p: 2,
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <TaskSection
                title="Completed Tasks"
                tasks={completedTasks}
                onMove={(id) => moveTask(id, false)}
                onEdit={openEditModal}
                onDelete={deleteTask}
                onCheck={handleCheck}
              />
            </Box>
          </Box>

         
          <Box textAlign="center" mt={4}>
            <Button variant="contained" color="primary" onClick={() => setIsAddModalOpen(true)}>
              Add New Task
            </Button>
          </Box>
        </Box>
      </Box>
    </DndProvider>
  );
};

export default App;
