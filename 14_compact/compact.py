def compact(lst):
    """Return a copy of lst with non-true elements removed.

        >>> compact([0, 1, 2, '', [], False, (), None, 'All done'])
        [1, 2, 'All done']
    """
    return[element for element in lst if element]
    # new_lst = []
    # for element in lst:
    #     if element:
    #         new_lst.append(element)
    # return new_lst
