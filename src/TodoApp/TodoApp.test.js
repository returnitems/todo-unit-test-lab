import { fireEvent, render, screen } from '@testing-library/react';
import TodoApp from './TodoApp';


//Main test for checking if the app gets rendered properly
test('renders TodoApp component', () => {
    render(<TodoApp />);
    expect(screen.getByText(/Todo List/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Add a new todo/i)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /Add Todo/i})).toBeInTheDocument();
});


// Test to check adding new item to the todo list functionality
test('can add a new todo', () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText(/Add a new todo/i);
    const addButton = screen.getByRole('button', {name: /Add Todo/i});

    fireEvent.change(input, {target: {value: 'Add a todo'}});
    fireEvent.click(addButton);

    expect(screen.getByText('Add a todo')).toBeInTheDocument();
});


// Test to check change in class name when clicked
test('can toggle a todo completion', () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText(/Add a new todo/i);
    const addButton = screen.getByRole('button', {name: /Add Todo/i});

    fireEvent.change(input, {target: {value: 'Completed'}});
    fireEvent.click(addButton);

    const todoItem = screen.getByText('Completed');
    expect(todoItem).toHaveClass('incomplete');

    fireEvent.click(todoItem);
    expect(todoItem).toHaveClass('complete');
});


// Test to check the dlete functionality
test('can delete a todo item', () => {
    render(<TodoApp />);
    const input = screen.getByPlaceholderText(/Add a new todo/i);
    const addButton = screen.getByRole('button', {name: /Add Todo/i});

    fireEvent.change(input, {target: {value: 'Todo Item'}});
    fireEvent.click(addButton);

    const deleteButton = screen.getByRole('button', {name: /Delete/i});
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Todo Item')).not.toBeInTheDocument();
});