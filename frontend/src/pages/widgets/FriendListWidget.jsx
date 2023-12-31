import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../../states";
import { baseUrl } from "../../utils/serverUrl";
import WidgetWrapper from "../../components/WidgetWrapper";

export default function FriendListWidget({ userId }) {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    try {
      const response = await fetch(`${baseUrl}/user/${userId}/friends`, {
        method: "GET",
        headers: { Authorazition: `Bearer ${token}` },
      });
      const data = await response.json();
      dispatch(setFriends({ frineds: data }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFriends();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
}
