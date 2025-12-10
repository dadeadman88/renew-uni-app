import TabBar from '@/components/Tabbar';
import { Tabs } from 'expo-router';
import * as React from 'react';

 
interface MainTabsProps {
  // Empty interface for future props
}

const MainTabs = (props: MainTabsProps) => {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }} />
  );
};

export default MainTabs;

