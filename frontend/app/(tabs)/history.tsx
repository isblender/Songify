import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av"; // Import Audio from expo-av
import { io } from "socket.io-client"; // Import Socket.IO client
import { useAuth } from "../AuthContext";
import { Swipeable } from "react-native-gesture-handler"; // Import Swipeable
import playPause from "../../assets/images/playpause.png";

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
        Alert.alert("Deleted", "The conversion has been deleted.");
        setLocalHistory((prev) => prev.filter((_, i) => i !== originalIndex));
      } else {
        throw new Error("Failed to delete the conversion");
      }
    } catch (error) {
      console.error("Error deleting conversion:", error);
      Alert.alert("Error", "Failed to delete the conversion.");
    }
  };

  // Render function for the delete action
  const renderDeleteAction = (index) => (
    <TouchableOpacity onPress={() => deleteConversion(index)}>
      <View
        style={{
          backgroundColor: "lightgrey",
          justifyContent: "center",
          alignItems: "flex-end",
          paddingHorizontal: 20,
          height: 250,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
      </View>
    </TouchableOpacity>
  );

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
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center", padding: 20 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#accaa1" />
        ) : localHistory.length > 0 ? (
          localHistory.slice().reverse().map((item, index) => (
            <Swipeable
              key={item._id || index}
              ref={(ref) => (swipeableRefs.current[index] = ref)}
              renderLeftActions={() => renderDeleteAction(index)}
            >
              <View style={{ marginBottom: 20, alignItems: "center" }}>
                <Image
                  source={{ uri: item.photo }}
                  style={{ width: 250, height: 250, borderRadius: 10 }}
                />

                {/* Make the entire line clickable to toggle audio */}
                <TouchableOpacity
                  onPress={() => toggleAudioPlayback(item.previewUrl)}
                  style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
                >
                  <Image
                    source={{ uri: item.albumCover }}
                    style={{ width: 50, height: 50, borderRadius: 5, marginRight: 10 }}
                  />
                  <View style={{flexDirection: "column"}}>
                    <Text>{item.title}</Text>
                    <Text>{item.artist}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Swipeable>
          ))
        ) : (
          <Text>No history available</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}