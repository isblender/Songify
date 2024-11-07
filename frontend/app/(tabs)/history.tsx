import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, SafeAreaView } from "react-native";

export default function History() {
  const [history, setHistory] = useState([]);
  const userId = "672ad3a01aa455690fa533bc"; // Replace with the actual user ID

  useEffect(() => {
    // Fetch user history when the component mounts
    async function fetchUserHistory() {
      try {
        const response = await fetch(`http://131.179.84.179:3000/api/history/${userId}`);
        const data = await response.json();

        // Convert the photo data to Base64 string
        const updatedHistory = data.map(item => {
          const base64Photo = btoa(
            new Uint8Array(item.photo.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          return { ...item, photo: base64Photo };
        });

        setHistory(updatedHistory);
      } catch (error) {
        console.error("Error fetching user history:", error);
      }
    }

    fetchUserHistory();
  }, []);

  return (
    <SafeAreaView>
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
    </SafeAreaView>
  );
}

export function HistoryContent() {
  return <History />;
}