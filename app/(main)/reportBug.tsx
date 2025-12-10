import CustomButton from "@/components/Button";
import Container from "@/components/Container";
import Icon from "@/components/Icon";
import Input from "@/components/Input";
import { theme } from "@/utils/designSystem";
import * as React from "react";
import { moderateScale, verticalScale } from "react-native-size-matters";
import { Text, TouchableOpacity, View } from "react-native-ui-lib";

interface ReportBugProps {}

const ReportBug = (props: ReportBugProps) => {
  return (
    <Container
      appBar
      appBarTitle={"Report a Bug"}
      containerProps={{ gap: verticalScale(20) as any, "paddingT-20": true }}
      scrollEnabled={false}
    >
      <Input placeholder="Subject" fieldStyle={{ backgroundColor: "#fff" }} />
      <Input
        paddingV-15
        style={{ height: verticalScale(100), textAlignVertical: "top" }}
        fieldStyle={{ backgroundColor: "#fff" }}
        placeholder={"Describe bug here..."}
      />
      <TouchableOpacity row centerV marginH-10>
        <View
          backgroundColor="rgba(214, 186, 88, 0.15)"
          br100
          marginR-10
          center
          style={{
            width: moderateScale(35),
            height: moderateScale(35),
            borderWidth: 1,
            borderColor: theme.color.primary,
            borderStyle: "dashed",
          }}
        >
          <Icon
            vector="MaterialIcons"
            name="add"
            size={moderateScale(25)}
            color={theme.color.primary}
          />
        </View>
        <View>
          <Text medium small textColor>
            Add Attachment
          </Text>
          <Text medium extraSmall12 placeholderColor>
            Select File or Image to upload
          </Text>
        </View>
      </TouchableOpacity>
      <View flex />
      <CustomButton marginB-20 label={"Send Report"} onPress={() => {}} />
    </Container>
  );
};

export default ReportBug;
