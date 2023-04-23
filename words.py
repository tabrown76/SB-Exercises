def print_upper_words(list, must_start_with):
    """Takes a list of words and returns those words in all caps."""

    for word in list:
       print(word.upper())

def print_upper_words_2(list):
    """Takes a list of words and returns words that begin with 'e' or 'E' in all caps."""

    for word in list:
        if word.startswith(('e', 'E')):
            print(word.upper())

def print_upper_words_3(list, must_start_with):
    """Takes a list of words and returns words that begin with letters in the set in all caps."""

    for word in list:
        for letter in must_start_with:
            if word.lower().startswith(letter.lower()):
                print(word.upper())
                break