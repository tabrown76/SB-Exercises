import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './TodoList';

it("renders", () => {
    render(<TodoList />);
})

it("matches snapshot", () => {
    const {asFragment} = render(<TodoList />);
    expect(asFragment).toMatchSnapshot();
})

it("can add a new todo", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("To-Do");
    const button = screen.getByText("Add To-Do");
    fireEvent.change(input, { target: { value: 'New task' } });
    fireEvent.click(button);
    expect(screen.getByText('New task')).toBeInTheDocument();
});

it("can remove a todo", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("To-Do");
    const addButton = screen.getByText("Add To-Do");
    fireEvent.change(input, { target: { value: 'Task to remove' } });
    fireEvent.click(addButton);
    
    const removeButton = screen.getByText('X');
    fireEvent.click(removeButton);
    expect(screen.queryByText('Task to remove')).not.toBeInTheDocument();
});

