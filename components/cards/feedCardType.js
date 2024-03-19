import React from "react";
import {  View, Text, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native';
import {Stack, useRouter } from 'expo-router';

import PopularRecipeCard from "./popularRecipeCard";
import SmallCollectionCard from "./smallCollectionCard";

const FeedCardType = ({data, userId}) => {
    const router = useRouter();

    return(
        <View>
            <View style={{ marginTop: 5, alignItems: "left"}}>
                        <Text style={{fontSize: 20, marginLeft: 10}}>{data.name}</Text>
            </View>
            {data.data.length === 0 ? <Text style={{fontSize: 16, alignSelf: 'center'}}>No {data.name} to display</Text> : null}
            <View style={{
                margin: 5,
                gap: 0
            }}>
                <FlatList data={data.data} renderItem={({item}) => {
                        if(data.name.toLowerCase().includes("collection") === true){
                            return (<SmallCollectionCard item={item} key={item.id} handleNavigate={() => router.push(`/collection-detail-page/${item.id}`)} />)
                        } else {
                            return (<PopularRecipeCard item={item} key={item.id} user_id={userId} handleNavigate={() => router.push(`/recipe-details/${item.id}`)} />)
                        }
                }} 
                keyExtractor={item => item?.id}
                contentContainerStyle={{columnGap: 8}}
                horizontal
                />
                
            </View>
        </View>
    )
}

export default FeedCardType;