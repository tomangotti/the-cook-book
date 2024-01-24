import React from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';


const PopularRecipeCard = ({item, handleNavigate, user_id}) => {

    
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
            width: 325,
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
                width: 325,
                height: 325,
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
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ83aBZygUGIMqHLcMhhY9VhE283tGv61pOf-boYo9WnQ&s"
                    }}
                    resizeMode="contain" style={{
                        width: "100%",
                        height: "100%",
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                    }}/>
            </View>
            <View style={{flex: 1, alignItems:"center"}}>
                <Text style={{fontSize: 24, margin:2, textAlign: "center"}}>{item.name}</Text>
            </View>
            <View style={{flex: 1, alignItems:"center"}}>
                <Text style={{fontSize: 16, margin:0}}>Rating: {item.average_rating}</Text>
            </View>
            <View style={{flex: 1, alignItems:"center"}}>
                <Text style={{fontSize: 12, margin:0}}>Cook: {item.user_username}</Text>
            </View>
            
        </TouchableOpacity>
        </>
    )
}

export default PopularRecipeCard