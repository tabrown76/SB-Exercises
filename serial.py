"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start):
        self.start = start
        self.current = start

    def generate(self):
        """Generates a number, beginning with start, and incrementing by 1 when the function is called."""
        result = self.current
        self.current += 1
        return result

    def reset(self):
        """Resets number to initial value."""
        self.current = self.start
