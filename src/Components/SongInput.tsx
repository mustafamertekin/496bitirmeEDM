import { Autocomplete, Loader} from '@mantine/core';
import { useState, useRef } from 'react';
import { useInterval } from '@mantine/hooks';
import { Button, Progress, useMantineTheme,  } from '@mantine/core';
import classes from './ButtonProgress.module.css';
function AutocompleteLoading() {
  const timeoutRef = useRef<number>(-1);
  const [value, setValue] = useState('');
  const [data, setData] = useState<string[]>([]);
  const [value2, setValue2] = useState('');
  const [data2, setData2] = useState<string[]>([]);
  const [value3, setValue3] = useState('');
  const [data3, setData3] = useState<string[]>([]);

  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setValue(val);
    setData([]);
  };
  const handleChange2 = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setValue2(val);
    setData2([]);
  };
  const handleChange3 = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setValue3(val);
    setData3([]);
  };

  const autocompleteStyle = {
    marginBottom: '30px', // Add margin bottom
  };

  return (
    <div>
      <Autocomplete
        value={value}
        data={data}
        onChange={handleChange}
        label="Şarkı İsmi Girin"
        placeholder=""
        styles={{
          input: { color: 'black' }, // Set text color to black
          label: { color: 'white' }, // Set label color to white
        }}
        style={autocompleteStyle} // Apply margin bottom style
      />
      <Autocomplete
        value={value2}
        data={data2}
        onChange={handleChange2}
        label="Müzisyen Girin"
        placeholder=""
        styles={{
          input: { color: 'black' }, // Set text color to black
          label: { color: 'white' }, // Set label color to white
        }}
        style={autocompleteStyle} // Apply margin bottom style
      />
      <Autocomplete
        value={value3}
        data={data3}
        onChange={handleChange3}
        label="Müzik Türü Girin"
        placeholder=""
        styles={{
          input: { color: 'black' }, // Set text color to black
          label: { color: 'white' }, // Set label color to white
        }}
        style={autocompleteStyle} // Apply margin bottom style
      />
      <div style={{ marginTop: '30px' }}> {/* Add margin top */}
        <ButtonProgress />
      </div>
    </div>
  );
}

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
      color={loaded ? 'teal' : theme.primaryColor}
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