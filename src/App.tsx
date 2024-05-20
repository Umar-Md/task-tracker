// src/App.tsx
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import './App.css'

const App: React.FC = () => {
  return (
    <Container className='container'>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom className='header'>
          Task Tracker Application
        </Typography>
        <AddTaskForm/>
        <TaskList />
      </Box>
    </Container>
  );
};

export default App;
