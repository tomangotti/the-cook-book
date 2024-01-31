import React from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';

const RecipeCard = ({item, handleNavigate, user_id}) => {

    return(
        <>
        <TouchableOpacity onPress={handleNavigate} style={{ 
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 5,
            paddingTop:0,
            borderRadius: 16,
            backgroundColor: "#FFF",
            width: 350,
            margin: 5,
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
                width: 150,
                height: 150,
                backgroundColor: "#F3F4F8",
                borderRadius: 16,
                justifyContent: "center",
                alignItems: "center",
                margin: 0,
            }}>
                <Image
                    source={{
                        uri: item.image
                        ? item.image
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ83aBZygUGIMqHLcMhhY9VhE283tGv61pOf-boYo9WnQ&s"
                        }}
                        resizeMode="cover" style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 16,
                        }}/>
            </View>
            <View style={{flex: 1, paddingLeft: 25, alignItems: "center"}}>
                <Text style={{fontSize: 20}}>{item.name}</Text>
            
                <Text style={{fontSize: 14, marginTop: 3}}>{item.description}</Text>
            </View>
            
        </TouchableOpacity>
        </>
    )
}

export default RecipeCard