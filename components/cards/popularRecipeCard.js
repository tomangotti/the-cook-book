import React from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';


const PopularRecipeCard = ({item, handleNavigate, user_id}) => {
    const imageAddress = ["https://freesvg.org/img/mealplate.png", "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA0L2pvYjk3MC1lbGVtZW50LTIwMi14LmpwZw.jpg"]
    const randomAddress = imageAddress[Math.floor(Math.random() * imageAddress.length)];
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
            width: 350,
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
                width: 350,
                height: 350,
                backgroundColor: "#F3F4F8",
                borderRadius: 12,
                justifyContent: "center",
                alignItems: "center",
                margin: 0,
                padding:0,
            }}>
            <Image
                source={{
                    uri: item.image
                    ? item.image
                    : randomAddress
                    }}
                    resizeMode="cover" style={{
                        width: "100%",
                        height: "100%",
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                    }}/>
            </View>
            <View style={{justifyContent: "center", flex: 1, padding: 5}}>
                <View style={{alignItems:"center", justifyContent: "center"}}>
                    <Text style={{fontSize: 20, margin:2, textAlign: "center"}}>{item.name}</Text>
                </View>
                <View style={{flex: 2, alignItems:"center", justifyContent: "center" }}>
                    <Text style={{fontSize: 12, margin:2}}>Cook: {item.user_username} - Rating: {item.average_rating}</Text>
                </View>
            </View>
            
        </TouchableOpacity>
        </>
    )
}

export default PopularRecipeCard