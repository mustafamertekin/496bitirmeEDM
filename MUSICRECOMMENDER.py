from asyncio.windows_events import NULL
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


    app_input1 = ""
    app_input2 = ""
    app_input3 = ""
    app_input4 = ""
    app_input5 = ""

    app_input1 = data.get('songName')
    app_input2 = data.get('artist')
    app_input3 = data.get('genre')
    app_input4 = data.get('likedSongs')
    app_input5 = data.get('likedArtists')


    # Initialize an empty list to store the extracted song names
    song_namesArray = []
    song_energyArray = []
    song_speechinessArray = []
    # Loop through each element in the liked_songs_data array
    for song_data in app_input4:
        # Split the string by '!'
        song_info = song_data.split('!')
        
        # Extract the song name, assuming it's the first element after splitting
        song_name = song_info[0]
        song_energy = float(song_info[1])  # Convert energy to float
        song_speechiness = float(song_info[2])  # Convert speechiness to float

        
        # Add the song name to the list
        song_namesArray.append(song_name)
        song_energyArray.append(song_energy)
        song_speechinessArray.append(song_speechiness)
    

    
    average_energy = sum(song_energyArray) / len(song_energyArray)
    average_speechiness = sum(song_speechinessArray) / len(song_speechinessArray)

    print("Average Energy:", average_energy)
    print("Average Speechiness:", average_speechiness)

        
    if app_input3 != "" and len(app_input5) == 0 and len(app_input4) == 0: # Only genre
        question = f"Give me 10 {app_input3} song recommendations and write only the artist name and song names. Only give 10 song names and 10 artist names DO NOT GIVE ANYTHING ELSE AT ANY CONDITION.NO NUMBERING"
        print("1")
    elif app_input3 == "" and len(app_input5) != 0 and len(app_input4) == 0: # Only artists
        question = f"Give me 10 song recommendations and write only the artist name and song names. I like the artists {', '.join(str(element) for element in app_input5)}. Only give 10 song names and 10 artist names DO NOT GIVE ANYTHING ELSE AT ANY CONDITION.NO NUMBERING"
        print("2")
   
    elif app_input3 == "" and len(app_input5) == 0 and len(app_input4) != 0 : # Only songs
        question = f"Give me 10 song recommendations and write only the artist name and song names. I like the songs {', '.join(str(element) for element in song_namesArray)}. I usually like songs that are {average_energy} out of 1 energetic and {average_speechiness} out of 1 speechful. Only give 10 song names and 10 artist names DO NOT GIVE ANYTHING ELSE AT ANY CONDITION.NO NUMBERING"
        print("3")
    elif app_input3 == "" and len(app_input5) != 0 and len(app_input4) != 0: # songs and artist, no genre
        question = f"Give me 10  song recommendations and write only the artist name and song names. I like the songs {', '.join(str(element) for element in song_namesArray)}. I like the artists {', '.join(str(element) for element in app_input5)}. I usually like songs that are {average_energy} out of 1 energetic and {average_speechiness} out of 1 speechful. Only give 10 song names and 10 artist names DO NOT GIVE ANYTHING ELSE AT ANY CONDITION.NO NUMBERING"
        print("4")
    elif app_input3 != "" and len(app_input5) != 0 and len(app_input4) == 0 : # artist and genre, no songs
        question = f"Give me 10 {app_input3} song recommendations and write only the artist name and song names. I like the artists {', '.join(str(element) for element in app_input5)}. Only give 10 song names and 10 artist names DO NOT GIVE ANYTHING ELSE AT ANY CONDITION.NO NUMBERING"
        print("5")
    elif app_input3 != "" and len(app_input5) == 0 and len(app_input4) != 0:  # songs and genre, no artist
        question = f"Give me 10 {app_input3} song recommendations and write only the artist name and song names. I like the songs {', '.join(str(element) for element in song_namesArray)}. I usually like songs that are {average_energy} out of 1 energetic and {average_speechiness} out of 1 speechful. Only give 10 song names and 10 artist names DO NOT GIVE ANYTHING ELSE AT ANY CONDITION.NO NUMBERING"
        print("6")
    elif app_input3 == "" and len(app_input5) == 0 and len(app_input4) == 0: #Everything
        question = f"Give me 10 {app_input3} song recommendations and write only the artist name and song names. I like the songs {', '.join(str(element) for element in song_namesArray)}. I like the artists {', '.join(str(element) for element in app_input5)}. I usually like songs that are {average_energy} out of 1 energetic and {average_speechiness} out of 1 speechful. Only give 10 song names and 10 artist names DO NOT GIVE ANYTHING ELSE AT ANY CONDITION.NO NUMBERING"
        print("7")
    else:
        question = f"Give me 10 song recommendations of your choice and write only the artist name and song names. Only give 10 song names and 10 artist names DO NOT GIVE ANYTHING ELSE AT ANY CONDITION.NO NUMBERING"
        print("8")
    
    print(question)

    response = chat.send_message(question)
    app_output = response.text

    print('\n')
    print(f"App Output: {app_output}\n")

    suggested_song_names = app_output.split('\n')

    return jsonify(songNames=suggested_song_names)

if __name__ == '__main__':
    app.run(debug=True)
