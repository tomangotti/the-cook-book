import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

const BackImageHeaderButton = ({handlePress}) => {
    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={{justifyContent: "center", flex: 1, alignItems: "center"}}>
                <Image source={require("../../assets/images/back.png")} style={{width: "100%", height: "100%"}} />
            </View>
        </TouchableOpacity>
    );
};

export default BackImageHeaderButton;