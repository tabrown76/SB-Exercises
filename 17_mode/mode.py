def mode(nums):
    """Return most-common number in list.

    For this function, there will always be a single-most-common value;
    you do not need to worry about handling cases where more than one item
    occurs the same number of times.

        >>> mode([1, 2, 1])
        1

        >>> mode([2, 2, 3, 3, 2])
        2
    """
    num_dict = {num: nums.count(num) for num in nums}
    # num_dict = {}
    # for num in nums:
    #     if num in num_dict:
    #         num_dict[num] += 1
    #     else:
    #         num_dict[num] = 1

    mode = None
    mode_count = 0
    for num, count in num_dict.items():
        if count > mode_count:
            mode = num
            mode_count = count
    return mode