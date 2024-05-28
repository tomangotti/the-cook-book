import React from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';

const SmallCollectionCard = ({item, handleNavigate}) => {
    
    
    return(
        <>
            <TouchableOpacity onPress={handleNavigate} style={{ 
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "column",
                margin: 15,
                borderRadius: 16,
                backgroundColor: '#FFF',
                width: 175,
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
                    padding: 10, 
                    width: 175,
                    height: 250,
                    justifyContent: "center",
                    borderRadius: 16,
                    borderColor: "blue",
                    borderWidth: 5,

                }}>
                    <Text style={{fontSize: 35, textAlign: "center", color: "blue"}}>{item.name}</Text>
                    <Text style={{fontSize: 12, textAlign: "center", color: "blue", marginTop: 2}}>By: {item.recipes_details[0].user_username}</Text>
                </View>
                
            </TouchableOpacity>
        </>
    )
}


export default SmallCollectionCard