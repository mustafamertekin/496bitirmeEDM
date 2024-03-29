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
import { Link, useNavigate } from "react-router-dom";
import { sha256 } from "js-sha256";
import { useState } from "react";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default function Signup() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [errShow, setErrShow] = useState(false);
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const headerBlue = '#1F2D5A';

  const backendUrl = "http://localhost:8081"; 

  const handleSubmit = async () => {
    await createUserWithEmailAndPassword(auth, mail, password);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Container size={900} my={60}>
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
                Mail zaten kullanılıyor!
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
                <Anchor size="sm" component="button" sx={{color : headerBlue}}>
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
                description="Şifre en az 6 haneden oluşmalıdır."
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
              <Button m={-10} sx={{ backgroundColor: headerBlue }} type="submit">Kayıt Ol</Button>
            </Grid.Col>
          </form>
        </Grid>
      </Card>
    </Container>
  );
}
