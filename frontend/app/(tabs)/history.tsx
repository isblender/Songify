import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Audio } from "expo-av"; 
import { io } from "socket.io-client"; 
import { useAuth } from "../AuthContext";
import { Swipeable } from "react-native-gesture-handler"; 
import SwipeableHistoryItem from "./components/HistoryItem";
import styles from "../styles/HistoryStyles";

export default function History() {
  const [localHistory, setLocalHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuth();
  const audioRef = useRef(new Audio.Sound()); // Reference for the audio player
  const [isPlaying, setIsPlaying] = useState(false); // Track play/pause state

  // Array of refs for each Swipeable component
  const swipeableRefs = useRef([]);

  // Function to fetch user history
  const getHistory = async () => {
    try {
      if (userId !== null) {
        setLoading(true);
        const response = await fetch(`https://imagetosong.onrender.com/api/history/${userId}`);
        const data = await response.json();
        setLocalHistory(data);
      } else {
        throw new Error("User ID is null");
      }
    } catch (error) {
      console.error("Error fetching user history:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle deletion of a conversion
  const deleteConversion = async (reversed_index) => {
    try {
      const originalIndex = localHistory.length - 1 - reversed_index;
      const item = localHistory[originalIndex];
      swipeableRefs.current.forEach((ref) => ref && ref.close());

      const response = await fetch(
        `https://imagetosong.onrender.com/api/delete/conversion/${userId}/${item._id}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        setLocalHistory((prev) => prev.filter((_, i) => i !== originalIndex));
      } else {
        throw new Error("Failed to delete the conversion");
      }
    } catch (error) {
      console.error("Error deleting conversion:", error);
    }
  };

  // Function to handle audio playback
  const toggleAudioPlayback = async (previewUrl) => {
    try {
      if (isPlaying) {
        // Pause the audio if it's playing
        await audioRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        // Load and play the audio if it's not playing
        await audioRef.current.unloadAsync(); // Unload previous sound
        await audioRef.current.loadAsync({ uri: previewUrl });
        await audioRef.current.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  useEffect(() => {
    if (!userId) {
      return;
    }

    const socket = io("https://imagetosong.onrender.com");

    socket.on("connect", () => {
      socket.emit("joinRoom", userId);
      getHistory();
    });

    socket.on("refreshHistory", () => {
      getHistory();
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    return () => {
      // Unload the sound when the component unmounts
      audioRef.current.unloadAsync();
    };
  }, []);
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#accaa1" />
        ) : localHistory.length > 0 ? (
          localHistory.slice().reverse().map((item, index) => {
            console.log(item);
            return (
              <SwipeableHistoryItem
              key={item._id || index}
              item={item}
              index={index}
              swipeableRef={swipeableRefs}
              deleteConversion={deleteConversion}
              toggleAudioPlayback={toggleAudioPlayback}
            />
          )})
        ) : (
          <Text>No history available</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}