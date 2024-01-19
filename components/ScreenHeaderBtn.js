import React from "react";
import { TouchableOpacity, Text } from "react-native";

const ScreenHeaderBtn = ({ title, dimension, handlePress }) => {
    return (
        <TouchableOpacity onPress={handlePress}>
            <Text
                style={{
                    marginTop: 5,
                    marginBottom: 5,
                    width: 75,
                    textAlign: "center",
                    borderRadius: 10,
                    height: 60,
                    paddingTop: 10,
                    paddingBottom: 0,
                    fontSize: 16,
                    display: "flex",
                    backgroundColor: "#F3F4F8",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#EAEAF2",
                }}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default ScreenHeaderBtn;


