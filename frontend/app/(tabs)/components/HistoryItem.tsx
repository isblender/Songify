import React, { useRef } from "react";
import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Audio } from "expo-av";

export default function SwipeableHistoryItem({
  item,
  index,
  swipeableRef,
  deleteConversion,
  toggleAudioPlayback,
}) {
  // Function to render the delete action
  const renderDeleteAction = () => (
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

  return (
    <Swipeable
      key={item._id || index}
      ref={(ref) => (swipeableRef.current[index] = ref)}
      renderLeftActions={renderDeleteAction}
    >
      <View style={{ marginBottom: 20, alignItems: "center" }}>
        <Image
          source={{ uri: item.photo }}
          style={{ width: 250, height: 250, borderRadius: 10 }}
        />

        <TouchableOpacity
          onPress={() => toggleAudioPlayback(item.previewUrl)}
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Image
            source={{ uri: item.albumCover }}
            style={{ width: 50, height: 50, borderRadius: 5, marginRight: 10 }}
          />
          <View style={{ flexDirection: "column" }}>
            <Text>{item.title}</Text>
            <Text>{item.artist}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
}