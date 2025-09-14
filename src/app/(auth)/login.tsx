import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Link } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement actual login logic with Supabase
      console.log('Login attempt:', { email, password });
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      Alert.alert('Success', 'Login successful!');
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-900"
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        className="flex-1"
      >
        <View className="flex-1 justify-center px-8 py-12">
          {/* Header */}
          <View className="mb-12">
            <Text className="text-4xl font-bold text-white text-center mb-2">
              Welcome Back
            </Text>
            <Text className="text-gray-400 text-center text-lg">
              Sign in to your account
            </Text>
          </View>

          {/* Form */}
          <View className="gap-6">
            {/* Email Input */}
            <View>
              <Text className="text-white text-sm font-medium mb-2">
                Email
              </Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                className="bg-gray-800 text-white px-4 py-4 rounded-xl border border-gray-700 focus:border-blue-500 focus:border-2"
                style={{ fontSize: 16 }}
              />
            </View>

            {/* Password Input */}
            <View>
              <Text className="text-white text-sm font-medium mb-2">
                Password
              </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                className="bg-gray-800 text-white px-4 py-4 rounded-xl border border-gray-700 focus:border-blue-500 focus:border-2"
                style={{ fontSize: 16 }}
              />
            </View>

            {/* Forgot Password Link */}
            <TouchableOpacity className="self-end">
              <Text className="text-blue-400 text-sm font-medium">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              className={`py-4 rounded-xl ${
                isLoading 
                  ? 'bg-gray-600' 
                  : 'bg-blue-600 active:bg-blue-700'
              }`}
            >
              <Text className="text-white text-center font-semibold text-lg">
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View className="flex-row items-center my-8">
            <View className="flex-1 h-px bg-gray-700" />
            <Text className="text-gray-400 px-4 text-sm">or</Text>
            <View className="flex-1 h-px bg-gray-700" />
          </View>

          {/* Sign Up Link */}
          <View className="items-center">
            <Text className="text-gray-400 text-base">
              Don't have an account?{' '}
            </Text>
            <Link href="/signup" asChild>
              <TouchableOpacity>
                <Text className="text-blue-400 font-semibold text-base">
                  Create one
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
