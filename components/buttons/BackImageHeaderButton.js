import React from "react";
import { TouchableOpacity, View, Image } from "react-native";

const BackImageHeaderButton = ({handlePress}) => {
    const image = require("../../assets/images/back.png");
    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={{
                    width: 75, 
                    height: 60,
                    margin: 5,
                    justifyContent: "center", 
                    flex: 1, 
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#EAEAF2",
                    borderRadius: 10}}>
            <Image source={image} style={{
                width: "75%", 
                height: "75%",
                }} />
            </View>
        </TouchableOpacity>
    );
};

export default BackImageHeaderButton;