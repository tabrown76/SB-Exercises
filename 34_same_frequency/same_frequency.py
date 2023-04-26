def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    dict_1 = {}
    dict_2 = {}
    for nums in str(num1):
        dict_1[nums] = dict_1.get(nums, 0) + 1
    for nums in str(num2):
        dict_2[nums] = dict_2.get(nums, 0) + 1

    return dict_1 == dict_2