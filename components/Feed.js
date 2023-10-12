import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native';
import { useRouter } from 'expo-router';

import getRecipes from './hooks/getRecipes';
import RecipeCard from './RecipeCard';

const Feed = ({userId}) => {
    const router = useRouter();
    const { data, isLoading, error, reFetch} = getRecipes('recipes/all');

    return (
        <View style={{margin: 24}}>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 12
            }}>
                <Text style={{
                    fontSize: 16,
                    color: "#312651"
                }}>Popular/New recipes</Text>
            </View>
            <View style={{
                marginTop: 16,
                gap: 12
            }}>
                {isLoading ? (
                    <ActivityIndicator size="large" />
                ) : error ? (
                    <View>
                        <Text>Something Went Wrong:</Text>
                        <Text>{error}</Text>
                        <TouchableOpacity onPress={reFetch}>
                            <Text>Retry</Text>
                        </TouchableOpacity>
                    </View>
                ) : ( data?.map((item) => (
                        <RecipeCard item={item} key={item.id} handleNavigate={() => router.push(`/recipe-details/${item.id}`, {user_id: userId, id: item.id})} />
                    ))
                )}
            </View>
        </View>
    );
};

export default Feed;