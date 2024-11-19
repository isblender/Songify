import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
const SplashScreen = () => {
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(10,10,10)' }}>
            <ActivityIndicator size="large" color="white" />
            <Text style={{ color: 'white', marginTop: 10 }}>Loading...</Text>
        </View>
    );
}
export default SplashScreen;