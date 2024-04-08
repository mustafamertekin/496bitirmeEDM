import { Container, Group, Anchor } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import SongInput from "./SongInput";
import logo from "../Images/EDM1.png";
import classes from './FooterSimple.module.css';
import Results from "./Results";
import TopSongs from './TopSongs';

function App() {
  const headerBlue = '#1F2D5A';
  const user = localStorage.getItem("user");

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: headerBlue, padding: '10px' }}>
      <div style={{ flex: '1' , marginTop:'10px'}}>
        <TopSongs></TopSongs>
      </div>
      <div style={{ flex: '1', marginLeft: '20px', marginRight: '20px' }}>
        <SongInput/> 
        <div style={{ marginTop: '20px' }}> {/* Boşluk eklemek için */}
        </div>
      </div>
      <div style={{ flex: '1' }}></div>
    </div>
  );
}

export function Anasayfa() {
  const user = localStorage.getItem("user");
  const navigate = useNavigate(); 
  const headerBlue = '#1F2D5A';

  // if (!user) {
  //   navigate('/login');
  //   return null;
  // }

  return (
    <div style={{ backgroundColor: headerBlue, minHeight: '100vh', padding: '100px' }}>
      <App />
    </div>
  );
}



