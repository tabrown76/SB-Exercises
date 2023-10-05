import { render, screen, fireEvent } from '@testing-library/react';
import NewTodoForm from './NewTodoForm';

it("renders", () => {
    render(<NewTodoForm />);
})

it("matches snapshot", () => {
    const {asFragment} = render(<NewTodoForm />);
    expect(asFragment).toMatchSnapshot();
})

it("updates input value on change", () => {
    render(<NewTodoForm />);
    const input = screen.getByPlaceholderText("To-Do");
    fireEvent.change(input, { target: { value: 'Test task' } });
    expect(input.value).toBe('Test task');
});

it("calls addTodo function on form submission", () => {
    const mockAddTodo = jest.fn();
    render(<NewTodoForm addTodo={mockAddTodo} />);
    
    const button = screen.getByText("Add To-Do");
    fireEvent.click(button);
    
    expect(mockAddTodo).toHaveBeenCalled();
});

