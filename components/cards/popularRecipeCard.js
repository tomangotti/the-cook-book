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
            paddingTop:15,
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
            <TouchableOpacity style={{
                width: 250,
                height: 250,
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
                    : "https://media.istockphoto.com/id/148013107/vector/my_plate_dinner.jpg?s=612x612&w=is&k=20&c=iuqT-RX-MxMXiuvozXktNViCK744rzn7al7DdIxkyO8="
                    }}
                    resizeMode="contain" style={{
                        width: "90%",
                        height: "90%",
                        borderRadius: 12,
                    }}/>
            </TouchableOpacity>
            <View style={{flex: 1, paddingLeft: 25}}>
                <Text style={{fontSize: 16, marginTop:5}}>{item.name}</Text>
            
                <Text style={{fontSize: 14, marginTop: 3}}>{item.description}</Text>
            </View>
            
        </TouchableOpacity>
        </>
    )
}

export default PopularRecipeCard