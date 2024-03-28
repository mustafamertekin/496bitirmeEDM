import { Routes, Route } from "react-router-dom";
import { Login } from "./Components/Login";
import { Anasayfa } from "./Components/Anasayfa";
import { Header1 } from "./Components/Header1";
import Signup from "./Components/Signup";
import { AuthProvider } from "./context/authContext";

export default function App() {
  return (
    <AuthProvider>
      {/* <SimpleHeader links={data} /> */}
      <Header1 />
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dataframe" element={<Anasayfa />} />
        <Route path='*' element={<Login />}/>
      </Routes>
    </AuthProvider>
  );
}
