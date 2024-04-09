import {
  Header,
  Group,
  Button,
  Box,
  Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../Images/EDM1.png";
import { useAuth } from "../context/authContext";
import { doSignOut } from "../firebase/auth";


export function Header1() {
  const {userLoggedIn}= useAuth();
  const navigate = useNavigate();
  const headerBlue = '#1F2D5A';
    useDisclosure(false);
  const handleLogout = async () => {
    await doSignOut();
    navigate("/login");
  };
  const handleProfile =  async () =>  {
    navigate("/profile");
  }
   const handleHome =  async () =>  {
    navigate("/dataframe");
  }
  const handleContact =  async () =>  {
    navigate("/getInTouch");
  }


  return (
    <Box sx={{backgroundColor:headerBlue}}>
      <Header height={70} px="md" sx={{ backgroundColor: headerBlue }}>
        <Group position="apart" sx={{ height: "100%", display: "flex" }}>
          <Image src={logo} width={102}  />
          { userLoggedIn? (
            <Group>
              <Button sx={{ backgroundColor: headerBlue }} onClick={handleHome} >
               Anasayfa 
              </Button>
              <Button sx={{ backgroundColor: headerBlue }} onClick={handleProfile} >
               Bilgilerim 
              </Button>
              <Button sx={{ backgroundColor: headerBlue }} onClick={handleContact} >
              Bize Ulaşın 
              </Button>
              <Button sx={{ backgroundColor: headerBlue }}  >
              Hakkında 
              </Button>
              <Button sx={{ backgroundColor: "red" ,color: "white"}} onClick={handleLogout}>
               Çıkış Yap 
              </Button>
            </Group>
          ) : (
            <Group>
              <Link to="/login">
                <Button  sx={{ backgroundColor: headerBlue }}>Giriş Yap</Button>
              </Link>
              <Link to="/signup">
                <Button sx={{ backgroundColor: headerBlue }}>Kayıt Ol</Button>
              </Link>
            </Group>
          )}
        </Group>
      </Header>
    </Box>
  );
}
