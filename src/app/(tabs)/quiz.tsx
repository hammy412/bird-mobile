import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Audio } from 'expo-av';
import { DatabaseService } from '../../lib/database';
import { useAuth } from '../../contexts/AuthContext';
import { Bird, QuizSettings } from '../../types';
import AuthGuard from '../../components/AuthGuard';

function QuizScreenContent() {
  const [quizSettings, setQuizSettings] = useState<QuizSettings>({
    totalQuestions: 5,
    difficultyLevel: 1
  });
  const [showSettings, setShowSettings] = useState(true);
  const [birds, setBirds] = useState<Bird[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleStartQuiz = async () => {
    if (birds.length < 4) {
      Alert.alert('Error', 'Not enough birds in database. Need at least 4 birds for a quiz.');
      return;
    }

    setShowSettings(false);
    // For now, just show a simple message
    Alert.alert('Quiz Starting', `Starting a ${quizSettings.totalQuestions} question quiz!`);
  };

  if (showSettings) {
    return (
      <SafeAreaView className="flex-1 bg-gray-900">
        <ScrollView className="flex-1 p-6">
          <View className="mb-8">
            <Text className="text-3xl font-bold text-white text-center mb-2">
              Bird Call Quiz
            </Text>
            <Text className="text-gray-400 text-center text-lg">
              Test your knowledge of bird calls
            </Text>
          </View>

          <View className="bg-gray-800 rounded-xl p-6 mb-6">
            <Text className="text-white text-xl font-semibold mb-4">Quiz Settings</Text>
            
            <View className="mb-4">
              <Text className="text-white text-sm font-medium mb-2">Number of Questions</Text>
              <View className="flex-row gap-2">
                {[5, 10, 15].map((count) => (
                  <TouchableOpacity
                    key={count}
                    onPress={() => setQuizSettings(prev => ({ ...prev, totalQuestions: count }))}
                    className={`flex-1 py-3 rounded-lg border ${
                      quizSettings.totalQuestions === count
                        ? 'bg-blue-600 border-blue-500'
                        : 'bg-gray-700 border-gray-600'
                    }`}
                  >
                    <Text className={`text-center font-medium ${
                      quizSettings.totalQuestions === count ? 'text-white' : 'text-gray-300'
                    }`}>
                      {count}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View className="mb-6">
              <Text className="text-white text-sm font-medium mb-2">Difficulty Level</Text>
              <View className="flex-row gap-2">
                {[1, 2, 3].map((level) => (
                  <TouchableOpacity
                    key={level}
                    onPress={() => setQuizSettings(prev => ({ ...prev, difficultyLevel: level }))}
                    className={`flex-1 py-3 rounded-lg border ${
                      quizSettings.difficultyLevel === level
                        ? 'bg-blue-600 border-blue-500'
                        : 'bg-gray-700 border-gray-600'
                    }`}
                  >
                    <Text className={`text-center font-medium ${
                      quizSettings.difficultyLevel === level ? 'text-white' : 'text-gray-300'
                    }`}>
                      Level {level}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              onPress={handleStartQuiz}
              disabled={isLoading}
              className="bg-green-600 py-4 rounded-xl"
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-center font-semibold text-lg">
                  Start Quiz
                </Text>
              )}
            </TouchableOpacity>
          </View>

          {error && (
            <View className="bg-red-900 border border-red-700 rounded-xl p-4">
              <Text className="text-red-200 text-center">{error}</Text>
            </View>
          )}

          <View className="bg-gray-800 rounded-xl p-4">
            <Text className="text-white text-lg font-semibold mb-2">
              Available Birds ({birds.length})
            </Text>
            <Text className="text-gray-400 text-sm">
              {birds.length >= 4 
                ? "Ready to start a quiz!" 
                : "Need at least 4 birds to start a quiz."
              }
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="flex-1 justify-center items-center p-6">
        <Text className="text-white text-2xl font-bold text-center mb-4">
          Quiz Coming Soon!
        </Text>
        <Text className="text-gray-400 text-center mb-6">
          The quiz functionality will be implemented in the next step.
        </Text>
        <TouchableOpacity
          onPress={() => setShowSettings(true)}
          className="bg-blue-600 py-3 px-6 rounded-xl"
        >
          <Text className="text-white font-semibold">Back to Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default function QuizScreen() {
  return (
    <AuthGuard>
      <QuizScreenContent />
    </AuthGuard>
  );
}
