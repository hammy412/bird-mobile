import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View className='flex-1 p-4'>
      <Text className='text-3xl font-bold text-red-500'>Hello World</Text>
      <Link href='/login'>Login</Link>
    </View>
  );
}