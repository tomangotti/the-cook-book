import React from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { TEST_ID } from "react-native-gifted-chat";

const MenuButton = ({handlePress}) => {
    const image = require("../../assets/images/menuIcon.png");
    
    return (
        <View style={{
            margin: 0,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 0,
            borderColor: "#EAEAF2",
            borderRadius: 10}}>

            <TouchableOpacity style={{width:50, height:50}} onPress={handlePress}>
                
                    <Image source={image}  style={{margin: 0, width: "100%", height:"100%"}} />
                
            </TouchableOpacity>

        </View>
    );
};

export default MenuButton;