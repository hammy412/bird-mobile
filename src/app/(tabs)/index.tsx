import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { DatabaseService } from '../../lib/database';
import { Bird } from '../../types';

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const [birds, setBirds] = useState<Bird[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBirds();
  }, []);

  const loadBirds = async () => {
    try {
      const birdsData = await DatabaseService.getBirds();
      setBirds(birdsData);
    } catch (error) {
      console.error('Error loading birds:', error);
      setError('Failed to load birds');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-900 justify-center items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-white text-lg mt-4">Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-gray-900">
        <View className="flex-1 justify-center items-center p-6">
          <View className="items-center mb-8">
            <Text className="text-6xl mb-4">🐦</Text>
            <Text className="text-3xl font-bold text-white text-center mb-2">
              Bird Call Learning
            </Text>
            <Text className="text-gray-400 text-center text-lg">
              Master the art of bird identification through sound
            </Text>
          </View>

          <View className="w-full max-w-sm space-y-4">
            <Link href="/login" asChild>
              <TouchableOpacity className="bg-blue-600 py-4 rounded-xl">
                <Text className="text-white text-center font-semibold text-lg">
                  Sign In
                </Text>
              </TouchableOpacity>
            </Link>

            <Link href="/signup" asChild>
              <TouchableOpacity className="bg-gray-700 py-4 rounded-xl">
                <Text className="text-white text-center font-semibold text-lg">
                  Create Account
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView className="flex-1 p-6">
        {/* Welcome Section */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-white mb-2">
            Welcome back! 🐦
          </Text>
          <Text className="text-gray-400 text-lg">
            Ready to test your bird call knowledge?
          </Text>
        </View>

        {/* Quick Actions */}
        <View className="mb-8">
          <Text className="text-white text-xl font-semibold mb-4">Quick Actions</Text>
          <View className="space-y-3">
            <Link href="/quiz" asChild>
              <TouchableOpacity className="bg-green-600 py-4 rounded-xl">
                <Text className="text-white text-center font-semibold text-lg">
                  🎵 Start New Quiz
                </Text>
              </TouchableOpacity>
            </Link>

            <TouchableOpacity 
              onPress={() => {
                // TODO: Navigate to history when we create it
                Alert.alert('Coming Soon', 'Quiz history will be available soon!');
              }}
              className="bg-blue-600 py-4 rounded-xl"
            >
              <Text className="text-white text-center font-semibold text-lg">
                📊 View History
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Stats */}
        <View className="mb-8">
          <Text className="text-white text-xl font-semibold mb-4">App Stats</Text>
          <View className="bg-gray-800 rounded-xl p-4">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-400">Available Birds</Text>
              <Text className="text-white font-semibold">{birds.length}</Text>
            </View>
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-400">Quizzes Taken</Text>
              <Text className="text-white font-semibold">0</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-400">Best Score</Text>
              <Text className="text-white font-semibold">--</Text>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View className="mb-8">
          <Text className="text-white text-xl font-semibold mb-4">Recent Activity</Text>
          <View className="bg-gray-800 rounded-xl p-4">
            <Text className="text-gray-400 text-center">
              No recent quizzes yet. Start your first quiz to see your progress here!
            </Text>
          </View>
        </View>

        {/* Sign Out */}
        <TouchableOpacity
          onPress={handleSignOut}
          className="bg-gray-700 py-3 rounded-xl"
        >
          <Text className="text-white text-center font-medium">
            Sign Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}