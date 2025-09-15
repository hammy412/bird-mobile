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
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
      });

      if (error) {
        Alert.alert('Error', error.message);
        return;
      }

      if (data.user) {
        Alert.alert('Success', 'Account created successfully! Please check your email to verify your account.');
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', 'Signup failed. Please try again.');
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
              Create Account
            </Text>
            <Text className="text-gray-400 text-center text-lg">
              Sign up to start learning bird calls
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

            {/* Sign Up Button */}
            <TouchableOpacity
              onPress={handleSignUp}
              disabled={isLoading}
              className={`py-4 rounded-xl ${
                isLoading 
                  ? 'bg-gray-600' 
                  : 'bg-blue-600 active:bg-blue-700'
              }`}
            >
              <Text className="text-white text-center font-semibold text-lg">
                {isLoading ? 'Creating Account...' : 'Create Account'}
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
              Already have an account?{' '}
            </Text>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text className="text-blue-400 font-semibold text-base">
                  Sign in
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
