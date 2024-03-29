import React from "react";
import { TouchableOpacity, View, Image } from "react-native";

const BackImageHeaderButton = ({handlePress}) => {
    const image = require("../../assets/images/back.png");
    // const image = "https://cdn.icon-icons.com/icons2/953/PNG/512/back-button-left-arrow-symbol-in-a-square_icon-icons.com_74325.png"
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