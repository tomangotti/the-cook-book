import React from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";


const ImageHeaderButton = ({handlePress, imageTitle}) => {

    const menuImage = require('../../assets/images/menuIcon.png');
    const backImage = require('../../assets/images/back.png');
    const editImage = require('../../assets/images/editIcon.png');
    const trashImage = require('../../assets/images/trashIcon.png');
    
    let image;

    if(imageTitle === "back") {
        image = backImage
    } else if(imageTitle === "edit") {
        image = editImage
    } else if(imageTitle === "trash") {
        image = trashImage
    } else if(imageTitle === "menu") {
        image = menuImage
    }
    
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

export default ImageHeaderButton;