import {
  Anchor,
  BackgroundImage,
  Button,
  Card,
  Container,
  Grid,
  Notification,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconAt, IconCheck, IconX } from "@tabler/icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { sha256 } from "js-sha256";
import { useEffect, useState } from "react";
import { auth,db } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import { doc, updateDoc, arrayUnion, arrayRemove, setDoc } from "firebase/firestore";

export default function Signup() {
  const [isRegisterComplete, setIsRegisterComplete] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [errShow, setErrShow] = useState(false);
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const headerBlue = "#1F2D5A";


  const handleSubmit = async () => {
    if (!isRegistering) {
      setIsRegistering(true);

      doCreateUserWithEmailAndPassword(mail, password)
        .catch((e) => {
          console.log(e);
          setIsRegisterComplete(false);
          if (e != null) {
            setErrShow(true);
          }
          setIsRegistering(false);
        })
        .then((res) => {
          console.log(res);
          if(res){
            setIsRegisterComplete(true);
            const Users = doc(db, "Users", auth.currentUser!.uid);
            setDoc(Users,{
              likedSongs:[],
              likedArtists:[]
            })
          }
          setIsRegistering(false);
        });
    }
  };

  return (
    <Container size={900} my={60}>
      {isRegisterComplete && <Navigate to={"/login"} replace={true} />}
      <Card
        shadow="sm"
        radius="md"
        withBorder
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Grid
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {show ? (
            <Notification
              icon={<IconCheck size="1.1rem" />}
              color="teal"
              title="Bildirim!"
            >
              Başarılı, Kayıt Olundu!
            </Notification>
          ) : null}
          {errShow ? (
            <Notification icon={<IconX size="1.1rem" />} color="red">
              Mail zaten kullanılıyor veya hatali mail girdiniz.
            </Notification>
          ) : null}

          <Grid.Col>
            <Title
              align="center"
              sx={(theme) => ({
                fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                fontWeight: 700,
              })}
            >
              Kayıt Ol
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
              Zaten Kayıtlı mısın?
              <Link to="/login">
                <Anchor size="sm" component="button" sx={{ color: headerBlue }}>
                  Giriş Yap
                </Anchor>
              </Link>
            </Text>
          </Grid.Col>
          <form onSubmit={handleSubmit}>
            <Grid.Col style={{ width: "100%" }}>
              <TextInput
                label="Mail"
                placeholder="Mail"
                icon={<IconAt size="0.8rem" />}
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col>
              <PasswordInput
                placeholder="Şifre"
                label="Şifre"
                description=""
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                withAsterisk
              />
            </Grid.Col>
            <Grid.Col
              md={5}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                m={-10}
                sx={{ backgroundColor: headerBlue }}
                onClick={handleSubmit}
              >
                Kayıt Ol
              </Button>
            </Grid.Col>
          </form>
        </Grid>
      </Card>
    </Container>
  );
}
