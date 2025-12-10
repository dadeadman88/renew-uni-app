import CustomButton from "@/components/Button";
import Container from "@/components/Container";
import Icon from "@/components/Icon";
import { useGetFAQs } from "@/redux/actions/hooks/useSupport";
import { theme } from "@/utils/designSystem";
import { router } from "expo-router";
import * as React from "react";
import { useColorScheme } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { ExpandableSection, Text, View } from "react-native-ui-lib";

interface FAQsProps {}

const FAQs = (props: FAQsProps) => {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);
  const isDarkMode = useColorScheme() === "dark";
  const getFAQs = useGetFAQs();
  const [faqs, setFaqs] = React.useState<any[]>([]);

  React.useEffect(() => {
    // Fetch FAQs on mount
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    await getFAQs({ page: 1, limit: 20 });
    // Update state with FAQs if needed
  };

  const DATA = faqs.length > 0 ? faqs : [
    {
      title: "What is the best way to learn how to code?",
      description:
        "The best way to learn how to code is to practice coding every day. You can find many resources online to help you learn how to code.",
    },
    {
      title: "What is the best way to learn how to code?",
      description:
        "The best way to learn how to code is to practice coding every day. You can find many resources online to help you learn how to code.",
    },
    {
      title: "What is the best way to learn how to code?",
      description:
        "The best way to learn how to code is to practice coding every day. You can find many resources online to help you learn how to code.",
    },
  ];

  return (
    <Container
      appBar
      appBarTitle="Frequently Asked Questions"
      containerProps={{ ["gap-15"]: true, ["paddingT-20"]: true }}
    >
      {DATA.map((item, index) => {
        const isExpanded = expandedIndex === index;
        return (
          <View
            key={index}
            br50
            padding-15
            paddingT-0
            style={{
              borderBottomColor: isDarkMode
                ? theme.dark_color.borderColor
                : theme.color.borderColor,
              borderBottomWidth: 1,
            }}
          >
            <ExpandableSection
              key={index}
              expanded={isExpanded}
              sectionHeader={
                <View flex row centerV gap-10>
                  <Text flex medium small textColor>
                    {item.title}
                  </Text>
                  <Icon
                    vector="Feather"
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={moderateScale(22)}
                    color={isDarkMode ? "#fff" : theme.color.textColor}
                  />
                </View>
              }
              onPress={() =>
                setExpandedIndex((prev) => (prev === index ? null : index))
              }
            >
              <Text regular small placeholderColor marginT-5>
                {item.description}
              </Text>
            </ExpandableSection>
          </View>
        );
      })}
      <View paddingV-20>
        <View bg-white br50 padding-15>
          <Text textColor semibold small>
            Still Have Some More Questions?
          </Text>
          <Text textColor regular extraSmall12 marginT-3>
            Click the button below get your question answered.
          </Text>
          <CustomButton 
            marginT-10 
            label="Get In Touch" 
            variant="primary" 
            onPress={() => router.push("/contactUs?type=feedback" as any)}
          />
        </View>
      </View>
    </Container>
  );
};

export default FAQs;
