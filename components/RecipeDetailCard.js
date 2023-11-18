import React from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';

const RecipeDetailCard = ({item}) => {
    console.log(item.image)
    return(
        <>
        <View  style={{ 
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,

            borderRadius: 12,
            backgroundColor: "#FFF",
            width: "90%",
            margin: 20,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
                },
            shadowOpacity: 0.25,
            shadowRadius: 5.84,
            elevation: 5,
            }}>
            <Text style={{fontSize: 32, marginTop: 5, marginBottom: 15}}>{item.name}</Text>
            <View style={{
                width: 300,
                height: 300,
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
            </View>
            <View style={{flex: 1}}>
                <Text style={{fontSize: 20, margin: 20}}>{item.description}</Text>
                <Text style={{fontSize: 16, margin: 20, backgroundColor: "#F3F4F8",}}>{item.instructions}</Text>
            </View>
            
        </View>
        </>
    )
}

export default RecipeDetailCard