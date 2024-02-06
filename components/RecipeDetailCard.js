import React from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from "expo-router";

import HorizontalLine from "./styleComponents/HorizontalLine";
import RatingCard from "./cards/ratingCard";
import FavoriteCard from "./cards/favoriteCard";

const RecipeDetailCard = ({item, userId}) => {
    const router = useRouter();

    const rating = () => {
        if(item.average_rating === undefined) return (
            <View>
                <Text style={{fontSize: 16, margin: "auto", backgroundColor: "#F3F4F8", marginTop: 20}}>Rating Unavailable</Text>
            </View>
        )
        else return (
            <View>
                <Text style={{fontSize: 16, margin: "auto", backgroundColor: "#F3F4F8", marginTop: 20}}>Rating: {item.average_rating}</Text>
            </View>
        )
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
                width: 350,
                height: 350,
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
                        width: "95%",
                        height: "95%",
                        borderRadius: 12,
                    }}/>
            </View>
            <View>
                <Text style={{fontSize: 20, margin: "auto", textAlign: "center", marginTop: 10}}>{item.description}</Text>
                    <TouchableOpacity style={{backgroundColor: "#F3F4F8", borderRadius: 10, marginTop: 10, marginHorizontal: 30}} onPress={() => router.push(`/profile-page/${item.user}`)}>
                        <Text style={{fontSize: 16, textAlign: "center"}}>By: {item.user_username}</Text>
                    </TouchableOpacity>
                    <View style={{alignItems: "center"}}>
                        {userId && userId !== item.id ? <FavoriteCard recipeId={item.id} userId={userId}/> : null}
                    </View>
                <HorizontalLine />
            </View>
        
                {rating()}
                <View>
                    <Text style={{fontSize: 16, margin: "auto", backgroundColor: "#F3F4F8", marginTop: 10}}>Cook Time: {item.cook_time}</Text>
                </View>
                <View>
                    <Text style={{fontSize: 16, margin: "auto", backgroundColor: "#F3F4F8", marginTop: 10}}>Servings: {item.servings}</Text>
                </View>
                <View style={{marginTop: 35}}>
                    {userId ? <RatingCard userId={userId} recipeId={item.id}/> : null}
                </View>
            
            <View style={{flex: 1}}>
                <HorizontalLine />
                <Text style={{fontSize: 25, margin: "auto", textAlign: "center", marginTop: 35}}>Instructions</Text>
                <Text style={{fontSize: 20, margin: "auto", backgroundColor: "#F3F4F8", textAlign: "left", marginTop: 15, lineHeight: 35, padding: 10, borderRadius: 10 }}>{item.instructions}</Text>
            </View>
            
        </View>
        </>
    )
}

export default RecipeDetailCard