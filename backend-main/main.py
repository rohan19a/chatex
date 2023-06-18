import openai
import os
from flask import Flask, request
import jsonify

from cleaning_functions import remove_chatgpt_nonsense

app = Flask(__name__)
openai = openai.OpenAI(os.environ.get('OPENAI_API_KEY'))

@app.route('/generate', methods=['POST'])
def generate(plain_text: str):

    #remove chatgpt english text
    cleaned_text = remove_chatgpt_nonsense(plain_text)

    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=cleaned_text,
        temperature=0,
        max_tokens=150,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0,
        stop=["###"]
    )

    return response.choices[0].text


if __name__ == '__main__':
    app.run()

