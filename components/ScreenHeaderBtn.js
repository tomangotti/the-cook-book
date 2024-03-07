import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

const ScreenHeaderBtn = ({ title, dimension, handlePress }) => {
    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={{justifyContent: "center", flex: 1, alignItems: "center"}}>
            <Text
                style={{
                    marginTop: 5,
                    marginBottom: 5,
                    width: 75,
                    textAlign: "center",
                    borderRadius: 10,
                    height: 60,
                    paddingTop: 10,
                    paddingBottom: 10,
                    fontSize: 16,
                    backgroundColor: "#F3F4F8",
                    borderWidth: 1,
                    borderColor: "#EAEAF2",
                }}
            >
                {title}
            </Text>
            </View>
        </TouchableOpacity>
    );
};

export default ScreenHeaderBtn;


