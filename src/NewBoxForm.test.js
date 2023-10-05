import { render, screen, fireEvent } from '@testing-library/react';
import NewBoxForm from './NewBoxForm';

it("renders", () => {
    render(<NewBoxForm />);
})

it("matches snapshot", () => {
    const {asFragment} = render(<NewBoxForm />);
    expect(asFragment).toMatchSnapshot();
})

it("displays the correct form fields", () => {
    render(<NewBoxForm />);
    
    expect(screen.getByLabelText(/Background Color:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Height:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Width:/i)).toBeInTheDocument();
});

it("captures user input in the form fields", () => {
    render(<NewBoxForm />);
    
    fireEvent.change(screen.getByLabelText(/Background Color:/i), { target: { value: '#ff0000' } });
    fireEvent.change(screen.getByLabelText(/Height:/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/Width:/i), { target: { value: '50' } });

    expect(screen.getByLabelText(/Background Color:/i).value).toBe('#ff0000');
    expect(screen.getByLabelText(/Height:/i).value).toBe('100');
    expect(screen.getByLabelText(/Width:/i).value).toBe('50');
});

it("calls the addBox function with form data on submit", () => {
    const mockAddBox = jest.fn();
    render(<NewBoxForm addBox={mockAddBox} />);
    
    fireEvent.change(screen.getByLabelText(/Background Color:/i), { target: { value: '#ff0000' } });
    fireEvent.change(screen.getByLabelText(/Height:/i), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText(/Width:/i), { target: { value: '50' } });
    fireEvent.click(screen.getByText(/Add Box!/i));

    expect(mockAddBox).toHaveBeenCalledWith({
        backgroundColor: '#ff0000',
        height: '100',
        width: '50'
    });
});
