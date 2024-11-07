import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView } from "react-native";

export default function History() {
  const [history, setHistory] = useState([]);
  const userId = "672ad3a01aa455690fa533bc"; // Replace with the actual user ID

  useEffect(() => {
    // Fetch user history when component mounts
    async function fetchUserHistory() {
      try {
        const response = await fetch(`http://localhost:3000/api/history/${userId}`);
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error("Error fetching user history:", error);
      }
    }

    fetchUserHistory();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginVertical: 20 }}>
        History
      </Text>
      {history.length > 0 ? (
        history.map((item, index) => (
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
  );
}

export function HistoryContent() {
  return <History />;
}