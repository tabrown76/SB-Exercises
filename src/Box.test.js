import { render, screen, fireEvent } from '@testing-library/react';
import Box from './Box';

it("renders", () => {
    render(<Box />);
})

it("matches snapshot", () => {
    const {asFragment} = render(<Box />);
    expect(asFragment).toMatchSnapshot();
})

it("renders with correct styles", () => {
    render(<Box backgroundColor="#FF0000" height="100" width="50" />);
    
    const renderedBox = screen.getByRole('button', { name: /X/i }).parentElement;
    expect(renderedBox).toHaveStyle(`background-color: #FF0000`);
    expect(renderedBox).toHaveStyle(`height: 100px`);
    expect(renderedBox).toHaveStyle(`width: 50px`);
});

it("has a remove button and it calls onClick when clicked", () => {
    const mockOnClick = jest.fn();
    render(<Box onClick={mockOnClick} />);
    
    const removeButton = screen.getByRole('button', { name: /X/i });
    expect(removeButton).toBeInTheDocument();
    
    fireEvent.click(removeButton);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
});
