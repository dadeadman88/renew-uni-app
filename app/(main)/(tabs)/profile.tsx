import CustomButton from "@/components/Button";
import Container from "@/components/Container";
import Icon from "@/components/Icon";
import { useAuthState } from "@/redux/actions/hooks/useAuth";
import { DummyProfilePic } from "@/utils/constants";
import { theme } from "@/utils/designSystem";
import { router } from "expo-router";
import * as React from "react";
import { moderateScale } from "react-native-size-matters";
import {
  Avatar,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native-ui-lib";

interface ProfileProps {}

const DATA = [
  {
    title: "Edit Profile",
    description: "Edit your profile",
    path: "editProfile",
  },
  {
    title: "Bookmarks",
    description: "Save your favorite videos",
    path: "bookmarks",
  },
  {
    title: "Downloads",
    description: "Download videos to watch offline",
    path: "downloads",
  },
  {
    title: "History",
    description: "See your viewing history",
    path: "history",
  },
  // {
  //   title: "Notifications Settings",
  //   description: "Lorem ipsum dolor sit amet",
  //   path: "notifications-settings",
  // },
  {
    title: "Appearance",
    description: "Change the appearance of the app",
    path: "appearance",
  },
  {
    title: "Download on Wifi Only",
    description: "Download videos on Wi-Fi only",
    path: "switch",
  },
  {
    title: "Frequently Asked Questions",
    description: "Find answers to your questions",
    path: "faqs",
  },
  {
    title: "Send Feedback",
    description: "Send feedback to the app",
    path: "contactUs",
  },
  {
    title: "Report a Bug",
    description: "Report a problem with the app",
    path: "reportBug",
  },
  {
    title: "Logout",
    path: "logout",
  },
];

const Profile = (props: ProfileProps) => {

  const [isDownloadOnWifiOnly, setIsDownloadOnWifiOnly] = React.useState(false);
  const authState=useAuthState()

  return (
    <Container appBar appBarTitle="Profile" noLeft>
      <View gap-5 center marginT-10>
        <Avatar
          source={{ uri: authState?.user?.avatarUrl || DummyProfilePic }}
          size={moderateScale(80)}
        />
        <Text textColor bold large marginT-10>
          {authState?.user?.firstName} {authState?.user?.lastName}
        </Text>
        <Text textColor medium small>
          {authState?.user?.email}
        </Text>
      </View>
      <View paddingV-20>
        <View bg-white br50 padding-15>
          <Text textColor semibold small>
            Sign in to get the best experience
          </Text>
          <Text textColor regular extraSmall12 marginT-3>
            Share progress, history, and series across devices
          </Text>
          <CustomButton
            marginT-10
            label="Sign in or Create Account"
            variant="primary"
          />
        </View>
      </View>
      <View gap-10 marginB-20>
        {DATA.map((item, index) => (
          <TouchableOpacity
            centerV
            key={index}
            onPress={() => {
              if(item.path === "switch"){
                setIsDownloadOnWifiOnly(!isDownloadOnWifiOnly);
                return;
              }
              router.push(item.path as any);
            }}
          >
            <View row spread centerV>
              <View flex gap-5 centerV>
                <Text
                  textColor={item.path !== "logout"}
                  red20={item.path === "logout"}
                  medium
                  small
                >
                  {item.title}
                </Text>
                {item.description && (
                  <Text placeholderColor medium extraSmall12>
                    {item.description}
                  </Text>
                )}
              </View>
              {item.path === "switch" ? (
                <Switch onColor={theme.color.primary} offColor="#E4E4E4" value={isDownloadOnWifiOnly} onValueChange={setIsDownloadOnWifiOnly} />
              ) : (
                <Icon
                  vector="Feather"
                  name="chevron-right"
                  size={moderateScale(22)}
                  color={theme.color.textColor}
                />
              )}
            </View>
            {item.path !== "logout" && (
              <View height={1} bg-borderColor marginT-15 />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </Container>
  );
};

export default Profile;
