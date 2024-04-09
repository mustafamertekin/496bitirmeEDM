from flask import Flask, request, jsonify
import google.generativeai as ai
from flask_cors import CORS  
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)  
load_dotenv()
# Configure the AI model
KEY = os.getenv("GEMINI_API_KEY")
ai.configure(api_key=KEY)
model = ai.GenerativeModel('gemini-pro')
chat = model.start_chat(history=[])

@app.route('/generate_song_names', methods=['POST'])
def generate_song_names():
    data = request.get_json()
    app_input1 = data.get('songName')
    app_input2 = data.get('artist')
    app_input3 = data.get('genre')
    app_input4 = data.get('likedSongs')
    print(app_input4)
    app_input5 = data.get('likedArtists')
    question = ""
    if app_input2 == "" and app_input3 == "": # Only song input
        question = f"Give me 10 song recommendatitons and write only the artist name and song names. These songs should be similar to the song {app_input1}. Only give 10 song names and 10 artist names DO NOT GIVE ANYTHING ELSE AT ANY CONDITION."
    if app_input1 == "" and app_input2 == "": # Only genre input
        question = f"Give me 10 song recommendatitons and write only the artist name and song names. These songs should be from the genre {app_input3}.Only give 10 song names and 10 artist names DO NOT GIVE ANYTHING ELSE AT ANY CONDITION."
    if app_input1 == "" and app_input3 == "": # Only artist input
        question = f"Give me 10 song recommendatitons and write only the artist name and song names. These songs should be similar to the songs of the artist {app_input2}.Only give 10 song names and 10 artist names DO NOT GIVE ANYTHING ELSE AT ANY CONDITION."

    if app_input2 != "" and app_input3 != "" and app_input1 == "": # Genre and artist input
        question = f"Give me 10 song recommendatitons and write only the artist name and song names. These songs should be similar to the songs of the artist {app_input2} and should be from the genre {app_input3}.Only give 10 song names and 10 artist names DO NOT GIVE ANYTHING ELSE AT ANY CONDITION."
    if app_input2 != "" and app_input3 == "" and app_input1 != "": # Song and artist input
        question = f"Give me 10 song recommendatitons and write only the artist name and song names. These songs should be similar to the song {app_input1} and should also be similar to the songs of the artist {app_input2}.Only give 10 song names and 10 artist names DO NOT GIVE ANYTHING ELSE AT ANY CONDITION."
    if app_input2 == "" and app_input3 != "" and app_input1 != "": # Song and genre input
        question = f"Give me 10 song recommendatitons and write only the artist name and song names. These songs should be similar to the song {app_input1} and should be from the genre {app_input3}.Only give 10 song names and 10 artist names DO NOT GIVE ANYTHING ELSE AT ANY CONDITION."
    if app_input2 != "" and app_input3 != "" and app_input1 != "": # Song, artist and genreinput
        question = f"Give me 10 song recommendatitons and write only the artist name and song names. These songs should be similar to the song {app_input1}, should be similar to the songs of the artist {app_input2} and should be from the genre {app_input3}.Only give 10 song names and 10 artist names DO NOT GIVE ANYTHING ELSE AT ANY CONDITION."

    print(question)

    response = chat.send_message(question)
    app_output = response.text

    print('\n')
    print(f"App Output: {app_output}\n")

    suggested_song_names = app_output.split('\n')

    return jsonify(songNames=suggested_song_names)

if __name__ == '__main__':
    app.run(debug=True)
