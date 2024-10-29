import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import React from "react";
import styles from "../styles";

const user = {
  username: "YourUsername",
  avatarUrl: "https://your-avatar-url.com/avatar.png",
};

const playlist = [
  { id: "1", title: "Song One", artist: "Artist One" },
  { id: "2", title: "Song Two", artist: "Artist Two" },
];

const history = [
  { id: "1", title: "Previous Song One", artist: "Previous Artist One" },
  { id: "2", title: "Previous Song Two", artist: "Previous Artist Two" },
];

const MyAccount = () => {
  return (
    <View style={styles.container}>
      {/* User Info Section */}
      <View style={styles.userInfo}>
        <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
        <Text style={styles.username}>{user.username}</Text>
      </View>

      {/* Playlist Section */}
      <Text style={styles.sectionTitle}>Your Playlist</Text>
      <FlatList
        data={playlist}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.songItem}>
            <Text style={styles.songTitle}>{item.title}</Text>
            <Text style={styles.songArtist}>{item.artist}</Text>
          </View>
        )}
      />

      {/* History Section */}
      <Text style={styles.sectionTitle}>History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.songItem}>
            <Text style={styles.songTitle}>{item.title}</Text>
            <Text style={styles.songArtist}>{item.artist}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default MyAccount;
