import React, {useEffect, useState} from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';

const SmallUserCard = ({item, handleNavigate}) => {
    
    const defaultImage = require('../../assets/images/profile.png');
    const [image, setImage] = useState("")

    useEffect(() => {
        if(item.image){
            setImage({uri: item.image})
        } else{
            setImage(defaultImage)
        }
    },[item])
    


    return(
        <>
        <TouchableOpacity onPress={handleNavigate} style={{ 
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            paddingBottom: 10,
            paddingLeft: 5,
            paddingRight: 5,
            paddingTop:0,
            borderRadius: 12,
            backgroundColor: "#FFF",
            width: 300,
            margin: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
                },
            shadowOpacity: 0.25,
            shadowRadius: 5.84,
            elevation: 5,
            }}>
            <View style={{
                width: 300,
                height: 200,
                backgroundColor: "white",
                borderRadius: 25,
                justifyContent: "center",
                alignSelf: "center",
                alignItems: "center",
                marginTop: 0,
            }}>
            <Image
                source={image}
                    resizeMode="cover" style={{
                        
                        width: "100%",
                        height: "100%",
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,

                    }}/>
            </View>
            <View style={{justifyContent: "center", flex: 1, padding: 5}}>
                <View style={{alignItems:"center", justifyContent: "center"}}>
                    <Text style={{fontSize: 20, margin:2, textAlign: "center"}}>{item.username}</Text>
                </View>
            </View>
            
        </TouchableOpacity>
        </>
    )
}

export default SmallUserCard;