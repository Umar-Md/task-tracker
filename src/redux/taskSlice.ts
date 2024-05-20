import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'incomplete';
  createdAt: number; 
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'createdAt'>>) => {
      state.tasks.push({ ...action.payload, createdAt: Date.now() });
    },
    updateTaskStatus: (state, action: PayloadAction<{ id: string; status: 'completed' | 'incomplete' }>) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, updateTaskStatus, deleteTask, setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
