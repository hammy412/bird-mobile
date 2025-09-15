import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import { Audio } from 'expo-av';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function App() {
  return (
    <View className='flex-1 p-4'>
      <Text className='text-3xl font-bold text-red-500'>Hello World</Text>
      <Link href='/login' className='text-white'>Login</Link>
    </View>
  );
}