import { Autocomplete, Button, Progress, Stack, useMantineTheme } from '@mantine/core';
import React, { useState } from 'react';
import classes from './ButtonProgress.module.css';
import { useInterval } from '@mantine/hooks';

interface AutocompleteLoadingProps {}

const AutocompleteLoading: React.FC<AutocompleteLoadingProps> = () => {
 

  const [results, setResults] = useState('Initial Value');;
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (val: string) => {
    setValue(val);
  };

  const handleChange2 = (val: string) => {
    setValue2(val);
  };

  const handleChange3 = (val: string) => {
    setValue3(val);
  };

  const handleClick = async () => {
    setLoading(true);

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ songName: value, artist: value2, genre: value3 }),
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
      <Autocomplete
        value={value}
        onChange={handleChange}
        label="Şarkı İsmi Girin"
        placeholder=""
        styles={{
          input: { color: 'black' },
          label: { color: 'white' },
        }}
        style={{ marginBottom: '30px' }} data={[]}      />
      <Autocomplete
        value={value2}
        onChange={handleChange2}
        label="Müzisyen Girin"
        placeholder=""
        styles={{
          input: { color: 'black' },
          label: { color: 'white' },
        }}
        style={{ marginBottom: '30px' }} data={[]}      />
      <Autocomplete
        value={value3}
        onChange={handleChange3}
        label="Müzik Türü Girin"
        placeholder=""
        styles={{
          input: { color: 'black' },
          label: { color: 'white' },
        }}
        style={{ marginBottom: '30px' }} data={[]}      />
      <div className={classes.buttonContainer}>
        <Button fullWidth onClick={handleClick} disabled={loading}>
          {loading ? 'Öneriler Bulunuyor' : 'Şarkı Önerisi Yap'}
        </Button>
        {loading && <Progress color="red" radius="sm" />}
      </div>
      <Stack
    style={{border: '1px solid white', padding: '5px'}}
      h={508}
      bg="var(--mantine-color-body)"

    >
      <Button variant="default">{results[0]}</Button>
      <Button variant="default">{results[1]}</Button>
      <Button variant="default">{results[2]}</Button>
      <Button variant="default">{results[3]}</Button>
      <Button variant="default">{results[4]}</Button>
      <Button variant="default">{results[5]}</Button>
      <Button variant="default">{results[6]}</Button>
      <Button variant="default">{results[7]}</Button>
      <Button variant="default">{results[8]}</Button>
      <Button variant="default">{results[9]}</Button>

    </Stack>
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
