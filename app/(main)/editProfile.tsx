import CustomButton from "@/components/Button";
import Container from "@/components/Container";
import DTPicker from "@/components/DTPicker";
import Icon from "@/components/Icon";
import Input from "@/components/Input";
import { useChangePassword, useGetProfile, useUpdateProfile } from "@/redux/actions/hooks/useProfile";
import { theme } from "@/utils/designSystem";
import * as React from "react";
import { useColorScheme } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { Avatar, TouchableOpacity, View } from "react-native-ui-lib";

interface EditProfileProps {}

const EditProfile = (props: EditProfileProps) => {
  const isDarkMode = useColorScheme() === "dark";
  const getProfile = useGetProfile();
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();
  
  const [profileData, setProfileData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    homeChurch: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    zipCode: "",
  });

  const [passwordData, setPasswordData] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  React.useEffect(() => {
    // Fetch profile data on mount
    getProfile();
  }, []);

  const handleUpdateProfile = async () => {
    await updateProfile({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      phone: profileData.phone,
    });
  };

  const handleUpdatePassword = async () => {
    await changePassword(passwordData);
  };

  return (
    <Container
      appBar
      appBarTitle="Edit Profile"
      containerProps={{ gap: verticalScale(20) as any }}
    >
      <View center>
        <TouchableOpacity>
          <Avatar
            source={{ uri: "https://picsum.photos/100" }}
            size={moderateScale(100)}
          />
          <View
            absB
            absR
            bg-primary
            br100
            padding-8
            style={{ bottom: -4, right: -4 }}
          >
            <Icon
              vector="Feather"
              name="edit-2"
              size={moderateScale(17)}
              color={isDarkMode ? theme.color.textColor : "#fff"}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View row gap-10 spread>
        <Input 
          placeholder="First Name" 
          containerStyle={{ flex: 1 }} 
          value={profileData.firstName}
          onChangeText={(text) => setProfileData({ ...profileData, firstName: text })}
        />
        <Input 
          placeholder="Last Name" 
          containerStyle={{ flex: 1 }} 
          value={profileData.lastName}
          onChangeText={(text) => setProfileData({ ...profileData, lastName: text })}
        />
      </View>
      <Input 
        placeholder="Email" 
        editable={false} 
        value={profileData.email}
      />
      <DTPicker placeholder="Date of Birth" />
      <Input 
        placeholder="Home Church" 
        value={profileData.homeChurch}
        onChangeText={(text) => setProfileData({ ...profileData, homeChurch: text })}
      />
      <Input 
        placeholder="Phone Number" 
        value={profileData.phone}
        onChangeText={(text) => setProfileData({ ...profileData, phone: text })}
      />
      <Input 
        placeholder="Address Line 1" 
        value={profileData.addressLine1}
        onChangeText={(text) => setProfileData({ ...profileData, addressLine1: text })}
      />
      <Input 
        placeholder="Address Line 2" 
        value={profileData.addressLine2}
        onChangeText={(text) => setProfileData({ ...profileData, addressLine2: text })}
      />
      <View row gap-10 spread>
        <Input 
          placeholder="City" 
          containerStyle={{ flex: 1 }} 
          value={profileData.city}
          onChangeText={(text) => setProfileData({ ...profileData, city: text })}
        />
        <Input 
          placeholder="Zip Code" 
          containerStyle={{ flex: 1 }} 
          value={profileData.zipCode}
          onChangeText={(text) => setProfileData({ ...profileData, zipCode: text })}
        />
      </View>
      <CustomButton label="Update Profile" onPress={handleUpdateProfile} />
      <Input 
        placeholder="Current Password" 
        secureTextEntry
        value={passwordData.oldPassword}
        onChangeText={(text) => setPasswordData({ ...passwordData, oldPassword: text })}
      />
      <Input 
        placeholder="New Password" 
        secureTextEntry
        value={passwordData.newPassword}
        onChangeText={(text) => setPasswordData({ ...passwordData, newPassword: text })}
      />
      <Input 
        placeholder="Confirm Password" 
        secureTextEntry
        value={passwordData.confirmPassword}
        onChangeText={(text) => setPasswordData({ ...passwordData, confirmPassword: text })}
      />
      <CustomButton label="Update Password" onPress={handleUpdatePassword} />
    </Container>
  );
};

export default EditProfile;
