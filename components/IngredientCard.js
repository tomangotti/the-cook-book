import React from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';

const IngredientCard = ({item}) => {
    return(
        <>
        <View  style={{ 
            justifyContent: "space-between",
            alignItems: "center",
            padding: 5,
            flexDirection: "row",
            borderRadius: 12,
            backgroundColor: "#F3F4F8",
            width: "85%",
            marginTop: 10,
            marginBottom: 5,
            marginLeft: "auto",
            marginRight: "auto",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
                },
            shadowOpacity: 0.25,
            shadowRadius: 5.84,
            elevation: 5,
            }}>
            <View style={{alignSelf: "center"}}>
                <Text style={{fontSize: 20, margin: 20}}>{item.quantity} : {item.quantity_type} X {item.name}</Text>
            </View>
            
        </View>
        </>
    )
}

export default IngredientCard