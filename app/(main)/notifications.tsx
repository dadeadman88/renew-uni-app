import Icon from "@/components/Icon";
import { useGetNotifications, useMarkAllNotificationsRead } from "@/redux/actions/hooks/useNotifications";
import { theme } from "@/utils/designSystem";
import { router } from "expo-router";
import * as React from "react";
import { FlatList, useColorScheme } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";

interface NotificationsProps {}

const Notifications = (props: NotificationsProps) => {
  const isDarkMode = useColorScheme() === "dark";
  const getNotifications = useGetNotifications();
  const markAllRead = useMarkAllNotificationsRead();
  const [notifications, setNotifications] = React.useState([]);

  React.useEffect(() => {
    // Fetch notifications on mount
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const result = await getNotifications({ read: 'all' });
    // Update state with notifications if needed
  };

  const handleMarkAllRead = async () => {
    await markAllRead();
    fetchNotifications();
  };

  return (
    <View bg-containerBackground paddingH-20 flex>
      <View paddingB-20 paddingT-10 row centerV>
        <Text textColor bold large flex>
          Notifications
        </Text>
        <TouchableOpacity row center marginR-10 onPress={handleMarkAllRead}>
          <Text primary small medium>
            Mark all as read
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon
            vector="Feather"
            name="x"
            size={20}
            color={
              isDarkMode ? theme.dark_color.textColor : theme.color.textColor
            }
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={[{}, {}, {}, {}, {}, {}]}
        renderItem={({ item }) => (
          <View row paddingV-10 gap-15 flex>
            <View
              backgroundColor={"rgba(214, 186, 88, 0.4)"}
              br100
              center
              style={{ width: moderateScale(40), height: moderateScale(40) }}
            >
              <Icon
                vector="Feather"
                name="bell"
                size={20}
                color={theme.color.textColor}
              />
            </View>
            <View gap-5 flex>
              <Text textColor extraSmall12 semibold>
                ONBOARDING
              </Text>
              <Text textColor small semibold>
                Get Started in 4 Simple Steps ✨
              </Text>
              <Text textColor small regular flex>
                Here are the first steps you can take to make the app feel like
                yours.
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Notifications;
