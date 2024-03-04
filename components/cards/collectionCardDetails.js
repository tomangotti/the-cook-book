import React from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { useRouter } from "expo-router";

// import HorizontalLine from "./styleComponents/HorizontalLine";
// import RatingCard from "./cards/ratingCard";
// import FavoriteCard from "./cards/favoriteCard";
import SmallRecipeCard from "./smallRecipeCard";
import FavoriteCollectionCard from "./favoriteCollectionCard";
import CollectionRatingCard from "./collectionRatingCard";

const CollectionCardDetails = ({item, userId}) => {
    const router = useRouter();
    console.log(item.recipes_details);

    const rating = () => {
        if(item.average_rating === undefined) return (
            <View>
                <Text style={{fontSize: 16, margin: "auto", backgroundColor: "#F3F4F8", marginTop: 10}}>Rating Unavailable</Text>
            </View>
        )
        else return (
            <View>
                <Text style={{fontSize: 16, margin: "auto", backgroundColor: "#F3F4F8", marginTop: 10}}>Rating: {item.average_rating}</Text>
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
                <Text style={{fontSize: 16, marginBottom: 15}}>{item.description}</Text>
                {rating()}
                <TouchableOpacity style={{backgroundColor: "#F3F4F8", borderRadius: 10, marginTop: 10, marginHorizontal: 30}} onPress={() => router.push(`/profile-page/${item.user}`)}>
                        <Text style={{fontSize: 16, textAlign: "center"}}>By: {item.user_username}</Text>
                </TouchableOpacity>
                <View style={{alignItems: "center"}}>
                        {userId ? <FavoriteCollectionCard collectionId={item.id} userId={userId}/> : null}
                </View>
                <View style={{alignItems: "center"}}>
                    {userId ? <CollectionRatingCard collectionId={item.id} userId={userId}/> : null}
                </View>
                
        </View>
        <FlatList
            data={item.recipes_details}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={{ padding: 0 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <SmallRecipeCard item={item} handleNavigate={() => router.push(`/recipe-details/${item.id}`)} />
            )}
        />
        </>
    )

    
}

export default CollectionCardDetails