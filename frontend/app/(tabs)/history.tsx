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
import { io } from "socket.io-client"; // Import Socket.IO client
import { useAuth } from "../AuthContext";
import { Swipeable } from "react-native-gesture-handler"; // Import Swipeable

export default function History() {
  const [localHistory, setLocalHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuth();
  
  // Array of refs for each Swipeable component
  const swipeableRefs = useRef([]);

  // Function to fetch user history
  const getHistory = async () => {
    try {
      if (userId !== null) {
        setLoading(true);
        console.log(`Attempting to get history of user ${userId}`);
        const response = await fetch(`https://imagetosong.onrender.com/api/history/${userId}`);
        const data = await response.json();

        console.log(`History fetched for ${userId}`);
        console.log(data);

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

      // Close all open swipeable views
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
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center", padding: 20 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#accaa1" />
        ) : localHistory.length > 0 ? (
          localHistory.slice().reverse().map((item, index) => (
            <Swipeable
              key={index}
              ref={(ref) => (swipeableRefs.current[index] = ref)} // Assign ref to each Swipeable
              renderLeftActions={() => renderDeleteAction(index)}
            >
              <View style={{ marginBottom: 20, alignItems: "center" }}>
                <Image
                  source={{ uri: item.photo }}
                  style={{ width: 250, height: 250, borderRadius: 10 }}
                />
                <Text style={{ marginTop: 10 }}>{item.songName}</Text>
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