import React, {useEffect, useState} from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";
import getUserProfileImage from "../hooks/getUserProfileImage";


const ProfileImageButton = ({handlePress}) => {
    
    const defaultImage = require('../../assets/images/profile.png');
    const [image, setImage] = useState("")
    const userImage = getUserProfileImage();

    useEffect(() => {
        
        if(userImage !== null){
            console.log(userImage.image)
            setImage({uri: userImage.image})
        } else{
            setImage(defaultImage)
        }
    },[userImage])
    
    
    return (
        <View style={{
            margin: 0,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 0,
            borderColor: "#EAEAF2",
            borderRadius: 10}}>

            <TouchableOpacity style={{width:50, height:50}} onPress={handlePress}>
                    <Image source={image}  style={{margin: 0, width: "100%", height:"100%", borderRadius: 90}} />
            </TouchableOpacity>
        </View>
    );
};

export default ProfileImageButton;