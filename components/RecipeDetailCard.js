import React from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';

const RecipeDetailCard = ({item}) => {

    const rating = () => {

        if(item.ratings === undefined) return (
        <View> </View>
            )

        if(item.ratings.length > 1) {
            const average = item.ratings.reduce((a, b) => a + b, 0) / item.ratings.length 
            return (<View>
                <Text style={{fontSize: 16, margin: "auto", backgroundColor: "#F3F4F8", marginTop: 10}}>Rating: {average}</Text>
            </View>)
        } else if(item.ratings.length === 1){
            return (<View>
                <Text style={{fontSize: 16, margin: "auto", backgroundColor: "#F3F4F8", marginTop: 10}}>Rating: {item.ratings[0]}</Text>
            </View>)
        } else if(item.ratings.length === 0){
            return (<View>
                <Text style={{fontSize: 16, margin: "auto", backgroundColor: "#F3F4F8", marginTop: 10}}>Rating: No ratings yet</Text>
            </View>)
        }
    }

    
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
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ83aBZygUGIMqHLcMhhY9VhE283tGv61pOf-boYo9WnQ&s"
                    }}
                    resizeMode="contain" style={{
                        width: "90%",
                        height: "90%",
                        borderRadius: 12,
                    }}/>
            </View>
            {rating()}
            <View>
                <Text style={{fontSize: 16, margin: "auto", backgroundColor: "#F3F4F8", marginTop: 10}}>Cook Time: {item.cook_time}</Text>
            </View>
            <View>
                <Text style={{fontSize: 16, margin: "auto", backgroundColor: "#F3F4F8", marginTop: 10}}>Servings {item.servings}</Text>
            </View>
            <View style={{flex: 1}}>
                <Text style={{fontSize: 20, margin: "auto", textAlign: "center", marginTop: 10}}>{item.description}</Text>
                <Text style={{fontSize: 16, margin: 20, backgroundColor: "#F3F4F8",}}>{item.instructions}</Text>
            </View>
            
        </View>
        </>
    )
}

export default RecipeDetailCard