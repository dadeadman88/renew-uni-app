import CustomButton from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import { useCreateTicket } from "@/redux/actions/hooks/useSupport";
import { router, useLocalSearchParams } from "expo-router";
import * as React from "react";
import { verticalScale } from "react-native-size-matters";
import { View } from "react-native-ui-lib";

interface ContactUsProps {}

const ContactUs = (props: ContactUsProps) => {
  const { type } = useLocalSearchParams();
  const createTicket = useCreateTicket();
  
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async () => {
    const subject = type === "feedback" ? "Feedback" : "Bug Report";
    const success = await createTicket({
      subject: subject,
      description: formData.message,
      category: type === "feedback" ? "FEEDBACK" : "BUG",
    });
    
    if (success) {
      // Clear form and go back
      setFormData({ name: "", email: "", message: "" });
      router.back();
    }
  };

  return (
    <Container
      appBar
      appBarTitle={type === "feedback" ? "Send Feedback" : "Report a Bug"}
      containerProps={{ gap: verticalScale(20) as any }}
      scrollEnabled={false}
    >
      <Input 
        placeholder="Name" 
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />
      <Input 
        placeholder="Email" 
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <Input
        paddingV-15
        style={{ height: verticalScale(100), textAlignVertical: "top" }}
        placeholder={
          type === "feedback"
            ? "Please write your feedback here"
            : "Please write the problem you're experiencing"
        }
        value={formData.message}
        onChangeText={(text) => setFormData({ ...formData, message: text })}
        multiline
      />
      <View flex/>
      <CustomButton
        label={type === "feedback" ? "Submit Feedback" : "Report Bug"}
        onPress={handleSubmit}
      />
    </Container>
  );
};

export default ContactUs;
