import { render, screen, fireEvent } from '@testing-library/react';
import Todo from './Todo';

it("renders with provided todo data", () => {
    render(<Todo todo={{ todo: 'Sample Todo', style: false }} remove={() => {}} complete={() => {}} />);
    expect(screen.getByText('Sample Todo')).toBeInTheDocument();
});

it("matches snapshot", () => {
    const {asFragment} = render(<Todo todo={{ todo: 'Sample Todo', style: false }} remove={() => {}} complete={() => {}} />);
    expect(asFragment).toMatchSnapshot();
})

it("calls the remove function on X button click", () => {
    const mockRemove = jest.fn();
    render(<Todo todo={{ todo: 'Sample Todo', style: false }} remove={mockRemove} complete={() => {}} />);
    
    const button = screen.getByText('X');
    fireEvent.click(button);
    
    expect(mockRemove).toHaveBeenCalled();
});

it("calls the complete function on todo text click", () => {
    const mockComplete = jest.fn();
    render(<Todo todo={{ todo: 'Sample Todo', style: false }} remove={() => {}} complete={mockComplete} />);
    
    const todoText = screen.getByText('Sample Todo');
    fireEvent.click(todoText);
    
    expect(mockComplete).toHaveBeenCalled();
});

it("renders with strikethrough styling for completed todo", () => {
    render(<Todo todo={{ todo: 'Completed Todo', style: true }} remove={() => {}} complete={() => {}} />);
    
    const completedTodo = screen.getByText('Completed Todo');
    expect(completedTodo).toHaveStyle('text-decoration: line-through');
});



