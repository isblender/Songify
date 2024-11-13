import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, SafeAreaView, ActivityIndicator } from "react-native";
import { io } from "socket.io-client"; // Import Socket.IO client
import { useAuth } from "../AuthContext";

export default function History() {
  const [localHistory, setLocalHistory] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading indicator
  const { userId } = useAuth();

  // Function to fetch user history
  const getHistory = async () => {
    try {
      if (userId !== null) {
        setLoading(true); // Show loading indicator
        console.log(`Attempting to get history of user ${userId}`);
        const response = await fetch(`https://imagetosong.onrender.com/api/history/${userId}`);
        const data = await response.json(); // Correctly await and parse JSON

        console.log(`History fetched for ${userId}`);
        console.log(data);

        setLocalHistory(data);
      } else {
        throw new Error("User ID is null");
      }
    } catch (error) {
      console.error("Error fetching user history:", error);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  // Connect to the WebSocket server and join the user-specific room
  useEffect(() => {
    if (!userId) {
      console.error("User ID is not available yet");
      return;
    }

    const socket = io("https://imagetosong.onrender.com");

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
      socket.emit("joinRoom", userId);
      getHistory();
    });

    socket.on("refreshHistory", () => {
      console.log("Received refreshHistory event, fetching history...");
      getHistory();
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginVertical: 20 }}>
          History
        </Text>
        {loading ? ( // Show loading indicator while loading
          <ActivityIndicator size="large" color="#0000ff" />
        ) : localHistory.length > 0 ? (
          localHistory.map((item, index) => (
            <View key={index} style={{ marginBottom: 20, alignItems: "center" }}>
              <Image
                source={{ uri: item.photo }} // Use the URL directly
                style={{ width: 200, height: 200, borderRadius: 10 }}
              />
              <Text style={{ marginTop: 10 }}>{item.songName}</Text>
            </View>
          ))
        ) : (
          <Text>No history available</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}