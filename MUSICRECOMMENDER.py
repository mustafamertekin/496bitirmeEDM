from flask import Flask, request, jsonify
import google.generativeai as ai
from flask_cors import CORS  # Import CORS from flask_cors

app = Flask(__name__)
CORS(app)  # Apply CORS to your Flask app

# Configure the AI model
KEY = 'AIzaSyB84B5behHBqbACHSE6f1G_hEgas1xCT5Q'
ai.configure(api_key=KEY)
model = ai.GenerativeModel('gemini-pro')
chat = model.start_chat(history=[])

@app.route('/generate_song_names', methods=['POST'])
def generate_song_names():
    data = request.get_json()
    app_input = data.get('songName')
    app_input += " "
    app_input += data.get('artist')
    app_input += " "
    app_input += data.get('genre')

    question = f"{app_input} benzeri 10 tane şarkı ismi listele sadece şarkının sanatçısını ve adını yaz."
    print(question)

    response = chat.send_message(question)
    app_output = response.text

    print('\n')
    print(f"App Output: {app_output}\n")

    # Split the response into a list of suggested song names
    suggested_song_names = app_output.split('\n')

    return jsonify(songNames=suggested_song_names)

if __name__ == '__main__':
    app.run(debug=True)
