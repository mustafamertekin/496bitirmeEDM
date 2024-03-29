import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
  Notification,
  Footer,
} from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { IconX } from "@tabler/icons";
import { sha256 } from "js-sha256";
import { auth } from "../firebase/firebase";
import {  signInWithEmailAndPassword } from 'firebase/auth'
import { doSignInWithEmailAndPassword } from "../firebase/auth";
import { useAuth } from "../context/authContext";



export function Login() {
  const [errorMessage, setErrorMessage]= useInputState("");
  const {userLoggedIn}= useAuth();
  const [password, setPassword] = useInputState("");
  const [mail, setMail] = useInputState("");
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [isSigningIn,setIsSigningIn] = useState(false);
  const headerBlue = '#1F2D5A';; 

  const loginClick = async () => {
    if(!isSigningIn){ 
      setIsSigningIn(true);
       await doSignInWithEmailAndPassword(mail, password).catch((e) => {
        console.log(e)
        setErrorMessage(e);
        setShow(true)
      })
      setIsSigningIn(false);
    }
    
  };
  return (
    <Container size={440} my={60}>
      {userLoggedIn && (<Navigate to={'/dataframe'} replace={true} />)}
      {show ? (
        <Notification
          icon={<IconX size={18} />}
          color="red"
          onClick={(event) => setShow(false)}
        >
          Yanlış Şifre veya Mail!
        </Notification>
      ) : null}
      <Paper withBorder shadow="md" p={40} mt={40} radius="md">
        <Title
          align="left"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 700,
          })}
        >
          Giriş Yap
        </Title>
        <TextInput
          mt={30}
          color="white"
          label="Email"
          placeholder="Email adresin"
          value={mail}
          onChange={setMail}
          name="email"
        />
        <PasswordInput
          mt={10}
          color="white"
          label="Şifre"
          placeholder="şifreni gir"
          value={password}
          onChange={setPassword}
        />
        <Button
          fullWidth
          mt="xl"
          sx={{ backgroundColor: headerBlue }}
          name="button"
          onClick={loginClick}
        >
          GİRİŞ YAP
        </Button>
      </Paper>
    </Container>


    
  );
}
