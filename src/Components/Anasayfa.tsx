import { useNavigate } from "react-router-dom";
import SongInput from "./SongInput";


 function App() {
  const headerBlue = '#1F2D5A';
  const user = localStorage.getItem("user");

  return (
      <div style={{ display: 'flex', justifyContent: 'flex-start', backgroundColor: headerBlue }}>
        <div style={{ flex: '1' }}>
          {/* <SongInput/> */}
        </div>
        <div style={{ flex: '1' }}>
        </div>
   
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
  
  

