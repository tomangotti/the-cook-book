import React from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { useRouter } from "expo-router";

// import HorizontalLine from "./styleComponents/HorizontalLine";
// import RatingCard from "./cards/ratingCard";
// import FavoriteCard from "./cards/favoriteCard";
import SmallRecipeCard from "./smallRecipeCard";

const CollectionCardDetails = ({item, userId}) => {
    const router = useRouter();
    console.log(item.recipes_details);
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
                <Text style={{fontSize: 16, marginBottom: 15}}>By: {item.user_username}</Text>
            
            
                
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