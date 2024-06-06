import React, {useCallback, useState} from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import {useRouter } from 'expo-router';

import getFeed from './hooks/getFeed';
import FeedCardType from './cards/feedCardType';


const Feed = ({userId, activeTab}) => {
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    
    
    const { data, isLoading, error, reFetch} = getFeed(userId);
    
    let n = 0;

    const backgroundColorChooser = () => {
        options = ["#FAFAFC", ""]
        if(n === 0){
            n = 1
            return options[0]
        } else if(n === 1){
            n = 0
            return options[1]
        }
    }

    const index = () => {
        return Math.floor(Math.random() * 1000)
    }
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        reFetch()
        setRefreshing(false)
    }, []);


    const displayedFeed = () => {
        if(userId === null){
            return (
                data.map((list) => {
                    return <FeedCardType data={list} key={index()} userId={userId} backgroundColor={backgroundColorChooser()} />
                })
            )
        }
        if(activeTab === "Discover" && data[0] !== undefined ){
            return (
                data[0].map((list) => {
                    return <FeedCardType data={list} key={index()} userId={userId} backgroundColor={backgroundColorChooser()} />
                })
            )
        } else if(activeTab === "Following" && data[1] !== undefined && data[1].length > 0){
            
            return (
                data[1].map((list) => {
                    return <FeedCardType data={list} key={index()} userId={userId} backgroundColor={backgroundColorChooser()} />
                })
            )
        } else {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20
                }}>
                    <Text style={{fontSize: 20}}>There is no Data to show</Text>
                </View>
            )
        }
    }

    
    return (
        
            <ScrollView showsVerticalScrollIndicator={false}  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                
                <View style={{margin: 0}}>
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
                    ) : displayedFeed()}

                </View>
            </ScrollView>
    );
};

export default Feed;