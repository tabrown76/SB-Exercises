def reverse_string(phrase):
    """Reverse string,

        >>> reverse_string('awesome')
        'emosewa'

        >>> reverse_string('sauce')
        'ecuas'
    """
    return ''.join([char for char in reversed(phrase)])
    # new_string = ''
    # for char in phrase:
    #     new_string = char + new_string
    # return new_string
