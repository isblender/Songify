import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, SafeAreaView } from "react-native";
import { io } from "socket.io-client"; // Import Socket.IO client

export default function History() {
  const [localHistory, setLocalHistory] = useState([]);
  const userId = "672ad3a01aa455690fa533bc";

  // Function to fetch user history
  const getHistory = async () => {
    try {
      const response = await fetch(`http://131.179.35.190:3000/api/history/${userId}`);
      const data = await response.json();

      // Convert the photo data to Base64 string
      const updatedHistory = data.map((item) => {
        const base64Photo = btoa(
          new Uint8Array(item.photo.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        return { ...item, photo: base64Photo };
      });

      setLocalHistory(updatedHistory);
    } catch (error) {
      console.error("Error fetching user history:", error);
    }
  };

  // Connect to the WebSocket server and join the user-specific room
  useEffect(() => {
    const socket = io("131.179.35.190:3000");

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
      socket.emit("joinRoom", userId); // Join the room with userId
    });

    // Listen for the "refreshHistory" event
    socket.on("refreshHistory", () => {
      console.log("Received refreshHistory event, fetching history...");
      getHistory(); // Fetch updated history
    });

    // Initial fetch of history
    getHistory();

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginVertical: 20 }}>
          History
        </Text>
        {localHistory.length > 0 ? (
          localHistory.map((item, index) => (
            <View key={index} style={{ marginBottom: 20, alignItems: "center" }}>
              <Image
                source={{ uri: `data:image/jpeg;base64,${item.photo}` }}
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