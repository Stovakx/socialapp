import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import AllPostsWidget from "../widgets/AllPostsWidget";
import UserWidget from "../widgets/UserWidget";
import { baseUrl } from "../../utils/serverUrl";


export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const {userId} = useParams();
  const token = useSelector((state)=> state.token);
  const picturePath = useSelector((state)=> state.user.picturePath)
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async()=>{
    const response = await fetch(`${baseUrl}/user/${userId}`, {
      method: "GET",
      headers:{ Authorization: `Bearer ${token}`},
    });
    const data = response.json();
    setUser(data);
  };

  useEffect(()=>{
    getUser();
  }, [])//eslint-disable-line react-hooks/exhaustive-deps

  if(!user) return null;

  return (
    <Box>
      <Navbar/>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
        <UserWidget userId={userId} picturePath={picturePath}/>
          <Box m="2rem 0"/>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <Box m="2rem 0"/>
          <AllPostsWidget userId={userId} isProfile/>
        </Box>
      </Box>
    </Box>
  )
}
