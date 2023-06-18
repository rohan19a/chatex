def remove_chatgpt_nonsense(input: str) -> str:
    """
    Return only the message between ``` and ``` in the input
    """
    return input.split("```")[1]


def which_string(input: str) -> str:
    """
    Return the appropriate string for best ChatGPT performance
    """
    list_of_strings = [
        "Convert this to latex code: "
    ]

    return list_of_strings[0]        


