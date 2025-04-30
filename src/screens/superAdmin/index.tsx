import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { StatsCard } from './components/StatsCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetSessionQuery } from '../../services/authApi';
import { useSocket } from '../../../contexts/SocketContext';

export default function Dashboard() {
  const user = useSelector((state: any) => state.auth.user);
  const { data, isLoading, error } = useGetSessionQuery({});
  const { socket } = useSocket();
  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket?.on("notification", (data) => {
      console.log("Socket Notification: ", data);
      console.log(data)
    })
  }, [])

  return (
    <ScrollView className="flex-1 pt-[140px] bg-white dark:bg-black-50 px-4 py-6">
      <View className="flex-row flex-wrap justify-between">
        <StatsCard action={() => navigation.navigate('businesses')} title="Businesses" value="120" />
        <StatsCard title="Revenue" value="Ksh 3,200" />
        <StatsCard
          action={() => navigation.navigate('vendor')}
          title="Clients" value="85" />
        <StatsCard title="Active Sessions" value="23" />
      </View>

      {/* Sections */}
      <View className="mt-6  gap-y-3 space-y-4">
        <Section title="👥 User Management" />
        <Section title="📈 Analytics" />
        <Section title="📜 Access Logs" />
        <Section title="⚙️ App Settings" />
        <Section title="🔔 Push Notifications" />
      </View>
     
    </ScrollView>
  );
}

const Section = ({ title }: { title: string }) => (
  <TouchableOpacity className="bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl shadow">
    <Text className="text-lg font-semibold text-gold-800 dark:text-white">{title}</Text>
    <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
      Manage {title.toLowerCase()}
    </Text>
  </TouchableOpacity>
);
