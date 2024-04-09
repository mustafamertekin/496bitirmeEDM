import { Autocomplete, Button, Progress, Stack, useMantineTheme } from '@mantine/core';
import React, { useState } from 'react';
import classes from './ButtonProgress.module.css';
import { useInterval } from '@mantine/hooks';
import { auth,db } from '../firebase/firebase';
import { useAuth } from '../context/authContext';
import { doc, updateDoc, arrayUnion, arrayRemove, setDoc, getDoc } from "firebase/firestore";

interface AutocompleteLoadingProps {}

const AutocompleteLoading: React.FC<AutocompleteLoadingProps> = () => {
 
  const {userLoggedIn}= useAuth();
  const [results, setResults] = useState('');;
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [loading, setLoading] = useState(false);
  const [likedSongs, setLikedSongs]=useState<string[]>(); 
  const [likedArtists, setLikedArtists]=useState<string[]>(); 

  const handleChange = (val: string) => {
    setValue(val);
  };

  const handleChange2 = (val: string) => {
    setValue2(val);
  };

  const handleChange3 = (val: string) => {
    setValue3(val);
  };

  const addSongFromRec= (songs: string)  => {
    const Users = doc(db, "Users", auth.currentUser!.uid);
    updateDoc(Users, {
      likedSongs: arrayUnion(songs)
    });
  }

  const addSongToDB = async () => {
    const Users = doc(db, "Users", auth.currentUser!.uid);
    await updateDoc(Users, {
      likedSongs: arrayUnion(value)
    });
  }

  const addArtistToDB = async () => {
    const Users = doc(db, "Users", auth.currentUser!.uid);
    await updateDoc(Users, {
      likedArtists: arrayUnion(value2)
    });
  }

  const fetchUserData = async () => {
    const userRef = doc(db, "Users", auth.currentUser!.uid);
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      if (userData) {
        setLikedSongs(userData.likedSongs || []);
        setLikedArtists(userData.likedArtists || []);
        handleClick();
      }
    }
  };
  const handleClick = async () => {
    setLoading(true);
    

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ songName: value, artist: value2, genre: value3,likedSongs: likedSongs, likedArtists:likedArtists }),
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/generate_song_names', requestOptions);
      const data = await response.json();
      console.log(data.songNames);
      setResults(data.songNames);
      console.log(String(results[0]));
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div className={classes.container}>
    <div className={classes.autocompleteContainer} >
      <Autocomplete 
        value={value}
        onChange={handleChange}
        label="Şarkı İsmi Girin (Şarkı İsmi - Sanatçı)"
        placeholder=""
        styles={{
          input: { color: 'black' },
          label: { color: 'white' },
        }}
        data={[]}
      />
      <Button size="sm" style={{ marginTop: '10px' }} onClick={addSongToDB} >Şarkıyı profilime ekle</Button>
    </div>

    <div className={classes.autocompleteContainer}>
      <Autocomplete
        value={value2}
        onChange={handleChange2}
        label="Müzisyen Girin"
        placeholder=""
        styles={{
          input: { color: 'black' },
          label: { color: 'white' },
        }}
        data={[]}
      />
      <Button size="sm" style={{ marginTop: '10px' }} onClick={addArtistToDB} >Müzisyeni profilime ekle</Button>
    </div>

    <div className={classes.autocompleteContainer}>
      <Autocomplete
        value={value3}
        onChange={handleChange3}
        label="Müzik Türü Girin"
        placeholder=""
        styles={{
          input: { color: 'black' },
          label: { color: 'white' },
        }}
        data={[]}
      />
      <Button size="sm" style={{ marginTop: '10px'}} >Müzik türünü profilime ekle</Button>
    </div>
      <div className={classes.buttonContainer}>
        <Button fullWidth onClick={fetchUserData}  style={{ marginTop: '30px' }} disabled={loading}>
          {loading ? 'Öneriler Bulunuyor' : 'Şarkı Önerisi Yap'}
        </Button>
        {loading && <Progress color="red" radius="sm" />}
      </div>
      {results.length>0 && <Stack
    style={{ padding: '15px'}}
      h={508}
      bg="var(--mantine-color-body)"

    >
    <div>
      <Button variant="default" style={{minWidth:'400px'}}>{results[0]}</Button>
      <Button size="xs" onClick={() => addSongFromRec(results[0])} style={{marginLeft:'10px'}} >Profilime Ekle</Button>
    </div>
    <div>
      <Button variant="default" style={{minWidth:'400px'}} >{results[1]}</Button>
      <Button size="xs" onClick={() => addSongFromRec(results[1])} style={{marginLeft:'10px'}} >Profilime Ekle</Button>
    </div>
    <div>
      <Button variant="default" style={{minWidth:'400px'}} >{results[2]}</Button>
      <Button size="xs" onClick={() => addSongFromRec(results[2])} style={{marginLeft:'10px'}} >Profilime Ekle</Button>
    </div>
    <div>
      <Button variant="default" style={{minWidth:'400px'}}>{results[3]}</Button>
      <Button size="xs" onClick={() => addSongFromRec(results[3])} style={{marginLeft:'10px'}} >Profilime Ekle</Button>
    </div>
    <div>
      <Button variant="default" style={{minWidth:'400px'}}>{results[4]}</Button>
      <Button size="xs" onClick={() => addSongFromRec(results[4])} style={{marginLeft:'10px'}} >Profilime Ekle</Button>
    </div>
    <div>
      <Button variant="default" style={{minWidth:'400px'}}>{results[5]}</Button>
      <Button size="xs" onClick={() => addSongFromRec(results[5])} style={{marginLeft:'10px'}} >Profilime Ekle</Button>
    </div>
    <div>
      <Button variant="default" style={{minWidth:'400px'}}>{results[6]}</Button>
      <Button size="xs" onClick={() => addSongFromRec(results[6])} style={{marginLeft:'10px'}} >Profilime Ekle</Button>
    </div>
    <div>
      <Button variant="default" style={{minWidth:'400px'}}>{results[7]}</Button>
      <Button size="xs" onClick={() => addSongFromRec(results[7])} style={{marginLeft:'10px'}} >Profilime Ekle</Button>
    </div>
    <div>
      <Button variant="default" style={{minWidth:'400px'}}>{results[8]}</Button>
      <Button size="xs" onClick={() => addSongFromRec(results[8])} style={{marginLeft:'10px'}} >Profilime Ekle</Button>
    </div>
    <div>
      <Button variant="default" style={{minWidth:'400px'}}>{results[9]}</Button>
      <Button size="xs" onClick={() => addSongFromRec(results[9])} style={{marginLeft:'10px'}}>Profilime Ekle</Button>
    </div>

    </Stack>}
    </div>
  );
};

export default AutocompleteLoading;


function ButtonProgress() {
  const theme = useMantineTheme();
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const interval = useInterval(
    () =>
      setProgress((current) => {
        if (current < 100) {
          return current + 1;
        }

        interval.stop();
        setLoaded(true);
        return 0;
      }),
    20
  );

  return (
    <Button
      fullWidth
      className={classes.button}
      onClick={() => (loaded ? setLoaded(false) : !interval.active && interval.start())}
    >
      <div className={classes.label}>
        {progress !== 0 ? 'Öneriler Bulunuyor' : loaded ? 'Öneriler Oluşturuldu' : 'Şarkı Önerisi Yap'}
      </div>
      {progress !== 0 && (
        <Progress
          value={progress}
          className={classes.progress}
          color={(theme.colors.red[2])}
          radius="sm"
        />
      )}
    </Button>
  );
}
