import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../navbar/Navbar";
import UserWidget from "../widgets/UserWidget";
import { useSelector } from "react-redux";
import AdvertWidget from "../widgets/AdvertWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import AllPostsWidget from "../widgets/AllPostsWidget";
import FriendListWidget from "../widgets/FriendListWidget";

export default function IndexPage() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <Navbar userId={_id} picturePath={picturePath} />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {isNonMobileScreens && (
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <UserWidget userId={_id} picturePath={picturePath} />
          </Box>
        )}
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <AllPostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id}/>
          </Box>
        )}
      </Box>
    </Box>
  );
}
