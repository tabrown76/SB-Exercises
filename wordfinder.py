"""Word Finder: finds random words from a dictionary."""

import os
import random

class WordFinder:
    """
    A class to read words from a file and store them in a list.
    """

    def __init__(self, file_path):
        self.file_path = file_path
        self.words = []
        self.read_words()
        print(f"{len(self.words)} words read.")

    def read_words(self):
        """
        Read words from the file, strip newline characters, and store them in a list attribute.
        """
        if not os.path.exists(self.file_path):
            raise FileNotFoundError(f"File '{self.file_path}' not found.")

        with open(self.file_path, "r") as file:
            for line in file:
                stripped_word = line.strip()
                if stripped_word:  # Ignore empty lines
                    self.words.append(stripped_word)
                
    def random(self):
        """
        Choose and return a random word from the list of words.
        
        :return: str, a randomly chosen word from the list
        :raises ValueError: if there are no words in the list
        """
        if not self.words:
            raise ValueError("No words available to choose from.")
        return random.choice(self.words)

# Example usage:
#wf = WordFinder("words.txt")
#wf.random()

class SpecialWordFinder(WordFinder):
    """
    A subclass of WordFinder that ignores commented lines and blank lines.
    """

    def read_words(self):
        """
        Read words from the file, strip newline characters, and store them in a list attribute.
        Ignores commented lines (lines starting with '#') and blank lines.
        """
        if not os.path.exists(self.file_path):
            raise FileNotFoundError(f"File '{self.file_path}' not found.")

        with open(self.file_path, "r") as file:
            for line in file:
                stripped_word = line.strip()
                if stripped_word and not stripped_word.startswith('#'):
                    self.words.append(stripped_word)

# Example usage:
# swf = SpecialWordFinder("special_words.txt")
# swf.random()
