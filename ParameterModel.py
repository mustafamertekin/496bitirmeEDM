import pandas as pd
from flask import jsonify, Flask, request
from flask_cors import CORS
from sklearn.tree import DecisionTreeRegressor
import base64
import requests
from dotenv import load_dotenv
import os

load_dotenv()
client_id = os.getenv("SPOTIFY_CLIENT_KEY")
client_secret = os.getenv("SPOTIFY_SECRET_KEY")
app = Flask(__name__)
CORS(app)

def get_token():
    auth_string = client_id + ":" + client_secret
    auth_bytes = auth_string.encode("utf-8")
    auth_base64 = str(base64.b64encode(auth_bytes), "utf-8")

    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": "Basic " + auth_base64,
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {"grant_type": "client_credentials"}
    result = requests.post(url, headers=headers, data=data)

    token = result.json()["access_token"]
    return token


def get_auth_header(token):
    return {"Authorization": "Bearer " + token}


def search_for_song_id(token, song_name):
    url = "https://api.spotify.com/v1/search"
    headers = get_auth_header(token)
    query = f"q={song_name}&type=track&limit=1"
    query_url = f"{url}?{query}"
    result = requests.get(query_url, headers=headers)
    json_result=result.json()
    return json_result['tracks']['items'][0]['id']


def get_audio_features(token, track_id):
    url = f"https://api.spotify.com/v1/audio-features/{track_id}"
    headers = get_auth_header(token)
    result = requests.get(url, headers=headers)
    audio_features = result.json()
    return audio_features





def train_and_predict(x, y, predict_df):
    model = DecisionTreeRegressor(random_state=1)
    model.fit(x, y)
    return model.predict(predict_df)





@app.route('/generate_song_features', methods=['POST'])
def generate_song_features():
    data = request.get_json()
    songName = data.get('songName')
    track_id = search_for_song_id(get_token(),songName)

    audio_features = get_audio_features(get_token(),track_id)
    print(audio_features)
    features = ['acousticness', 'danceability', 'tempo', 'instrumentalness', 'liveness', 'loudness', 'valence']

    predictSong_df = pd.DataFrame([[
        audio_features['acousticness'],
        audio_features['danceability'],
        audio_features['tempo'],
        audio_features['instrumentalness'],
        audio_features['liveness'],
        audio_features['loudness'],
        audio_features['valence']
    ]], columns=features)

    path = 'SpotifyFeatures.csv'
    data = pd.read_csv(path)
    data = data.dropna(axis=0)  # Eksik değerleri kaldır

    y1 = data['speechiness']
    y2 = data['energy']
    x = data[features]

    speechiness_pred = train_and_predict(x, y1, predictSong_df)
    energy_pred = train_and_predict(x, y2, predictSong_df)

    print(speechiness_pred)
    print(energy_pred)
    print("")
    print(audio_features['speechiness'])
    print(audio_features['energy'])
    return jsonify(songSpeechiness=speechiness_pred[0],songEnergy=energy_pred[0])

if __name__ == '__main__':
    app.run(debug=True,port=5001)
