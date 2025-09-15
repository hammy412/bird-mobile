import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { router, usePathname } from 'expo-router';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const pathname = usePathname();


  // Remove automatic redirect - let user manually navigate back

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-900 justify-center items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-white text-lg mt-4">Loading...</Text>
      </SafeAreaView>
    );
  }

  // If user is not authenticated, show a message instead of redirecting
  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-gray-900 justify-center items-center p-6">
        <View className="items-center">
          <Text className="text-6xl mb-4">🔒</Text>
          <Text className="text-white text-2xl font-bold text-center mb-4">
            Authentication Required
          </Text>
          <Text className="text-gray-400 text-center text-lg mb-6">
            Please sign in to access this feature.
          </Text>
          <View className="w-full max-w-sm space-y-3">
            <TouchableOpacity
              onPress={() => router.replace('/(tabs)/')}
              className="bg-blue-600 py-3 rounded-xl"
            >
              <Text className="text-white text-center font-semibold p-2">
                Go to Home
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // If user is authenticated, render the protected content
  return <>{children}</>;
}
