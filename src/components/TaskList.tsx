import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { updateTaskStatus, deleteTask } from '../redux/taskSlice';
import { List, ListItem, ListItemText, IconButton, Checkbox, Button, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [sortAscending, setSortAscending] = React.useState(true);

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortAscending) {
      return a.status.localeCompare(b.status);
    } else {
      return b.status.localeCompare(a.status);
    }
  });

  const handleToggle = (id: string, status: 'completed' | 'incomplete') => {
    dispatch(updateTaskStatus({ id, status: status === 'completed' ? 'incomplete' : 'completed' }));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  const handleSortToggle = () => {
    setSortAscending(!sortAscending);
  };
  
  return (
    <Box className="box">
      <Button onClick={handleSortToggle}>
        Sort by Status ({sortAscending ? 'Ascending' : 'Descending'})
      </Button>
      <List>
        {sortedTasks.map((task) => (
          <ListItem key={task.id}>
            <Checkbox
              checked={task.status === 'completed'}
              onChange={() => handleToggle(task.id, task.status)}
            />
            <ListItemText primary={task.name} secondary={task.description} />
            <IconButton edge="end" onClick={() => handleDelete(task.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TaskList;
