import openai
import os
from flask import Flask, request
import jsonify

from cleaning_functions import remove_chatgpt_nonsense
from generate import latex_to_pdf

#flash --app main run

openai.api_key = "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"

#initialize flask app
app = Flask(__name__)

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

@app.route('/test', methods=['GET'])
def test():
    return "Hello World"

@app.route('/post', methods=['POST'])
def process_text():
    data = request.get_json()
    text = data.get('text')

    # Perform some processing with the text
    processed_text = text.upper()

    # Return the processed text as a response
    return jsonify({'result': processed_text})


@app.route('/generate', methods=['POST'])
def generate():
    latex_code = request.get_data(as_text=True)
    output_file = "output.pdf"

    latex_to_pdf(latex_code, output_file)

    # Host the PDF at a web address
    pdf_url = "http://your-website.com/output.pdf"  # Replace with the actual URL of your website

    return pdf_url

if __name__ == '__main__':
    app.run()