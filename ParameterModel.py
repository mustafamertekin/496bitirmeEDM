import pandas as pd
from sklearn.tree import DecisionTreeRegressor
import spotipy
from spotipy import SpotifyOAuth


def train_and_predict(x, y, predict_df):
    model = DecisionTreeRegressor(random_state=1)
    model.fit(x, y)
    return model.predict(predict_df)


sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id="808e5798c1e748e290809e8e4b33b20e",
                                               client_secret="a8cdb31bb1404fcf83a56a63707ae1b0",
                                               redirect_uri="http://localhost:3000",
                                               scope="playlist-modify-public"))

songName = "My way - Calvin harris"

results = sp.search(q=songName, limit=1, type='track')
track_id = results['tracks']['items'][0]['id']

audio_features = sp.audio_features(track_id)[0]

features = ['acousticness', 'danceability', 'tempo', 'instrumentalness', 'liveness', 'loudness','valence']

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
tempo_pred = train_and_predict(x, y2, predictSong_df)

print(speechiness_pred)
print(tempo_pred)
print("")
print(audio_features['speechiness'])
print(audio_features['energy'])
