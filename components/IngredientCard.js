import React from "react";
import { View, Text, Linking, TouchableOpacity } from 'react-native';


const IngredientCard = ({item, recipeName}) => {

    const searchQuery = item.name;
    const encodedQuery = encodeURIComponent(searchQuery);
    const walmartSearchURL = `https://www.walmart.com/search/?query=${encodedQuery}`;


    function walmartSearch() {
        Linking.openURL(walmartSearchURL)
    }

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
                <Text style={{fontSize: 16, margin: 10}}>{item.quantity} {item.quantity_type} - {item.name}</Text>
                {recipeName ? <Text style={{marginBottom: 5, marginLeft: 5}}>{recipeName}</Text> : null}
            </View>
            <TouchableOpacity onPress={walmartSearch}
            style={{
                width: "20%",
                marginRight: 5,
                marginTop: 5,
                marginBottom: 5,
                borderRadius: 15,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                    },
                shadowOpacity: 0.25,
                shadowRadius: 5.84,
                elevation: 5,
            }}>
                <Text style={{ textAlign: "center", padding: 5, backgroundColor: "blue", color: "white", borderRadius: 15, fontSize: 12}}>Find on Walmart</Text>
            </TouchableOpacity>
        </View>
        </>
    )
}

export default IngredientCard