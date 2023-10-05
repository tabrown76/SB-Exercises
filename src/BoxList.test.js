import { render, screen, fireEvent, cleanup, within} from '@testing-library/react';
import BoxList from './BoxList';

afterAll(() => {
    // Any cleanup activities, if necessary.
    cleanup();  
});

it("renders", () => {
    render(<BoxList />);
})

it("matches snapshot", () => {
    const {asFragment} = render(<BoxList />);
    expect(asFragment).toMatchSnapshot();
})

it("can add/remove a new box", () => {
    render(<BoxList />);
    
    // Find form inputs and button
    const bgColorInput = screen.getByLabelText(/Background Color:/i);
    const heightInput = screen.getByLabelText(/Height:/i);
    const widthInput = screen.getByLabelText(/Width:/i);
    const addButton = screen.getByText(/Add Box!/i);

    // Fill in the form
    fireEvent.change(bgColorInput, { target: { value: '#FF0000' } });
    fireEvent.change(heightInput, { target: { value: '100' } });
    fireEvent.change(widthInput, { target: { value: '100' } });
    fireEvent.click(addButton);

    // Now that we've added a box, get the new box by its style
    const newBox = screen.getByRole('button', { name: 'X' }).parentElement;

    // Assert that it's in the document
    expect(newBox).toBeInTheDocument();

    // Get the remove button from this box
    const removeButton = within(newBox).getByText(/X/i);
    fireEvent.click(removeButton);

    // Check if the box is removed
    expect(newBox).not.toBeInTheDocument();
});



