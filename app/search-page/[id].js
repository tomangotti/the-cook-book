import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { Stack, router,} from "expo-router";

import SearchUsersCard from '../../components/cards/searchUsersCard';
import SearchRecipesCard from '../../components/cards/searchRecipesCard';
import SearchCollectionsCard from '../../components/cards/searchCollectionsCard';
import HorizontalLine from '../../components/styleComponents/HorizontalLine';
import ImageHeaderButton from '../../components/buttons/ImageHeaderButton';

const SearchPage = () => {

    const [activeTab, setActiveTab] = useState("Recipes");
    const tabs = ["Recipes", "Collections", "Users"]
    
    

    function TabButton({name, onHandleSearchType}) {
        return (
            <TouchableOpacity  onPress={onHandleSearchType} style={{
                paddingVertical: 16,
                paddingHorizontal: 10,
                backgroundColor: name === activeTab ? "#312651" : "#F3F4F8",
                borderRadius: 16,
                marginLeft: 18,
                shadowColor: "#000",
                shadowOffset: {
                width: "35%",
                },
                shadowOpacity: 0.25,
                shadowRadius: 5.84,
                elevation: 5,
                shadowColor: "#F3F4F8",
            }}>
                <Text style={{
                    fontSize: 16,
                    color: name === activeTab ? "#C3BFCC" : "#AAA9B8",
                }}
                    >{name}</Text>
            </TouchableOpacity>
        )
    }

    const displayTabContent = () => {
        switch (activeTab) {
            case "Recipes":
                return (<SearchRecipesCard />)
            case "Collections":
                return (<SearchCollectionsCard />)
            case "Users":
                return (<SearchUsersCard />)    
        }
    }

    

    return (
        <SafeAreaView>
            <Stack.Screen options={{
                headerStyle: {backgroundColor: "#FAFAFC"},
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft: () => (
                    <ImageHeaderButton imageTitle={"back"} handlePress={() => router.back()} />
                ),
                headerTitle: `Search ${activeTab}`,
                headerTitleAlign: "center"
            }}/>
        
        <View style={{backgroundColor: "white", margin: 15, borderRadius: 15, paddingBottom: 20}}>
            <View style={{alignItems: 'center', marginTop: 25}}>
                <FlatList 
                    data={tabs}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                        <TabButton name={item} onHandleSearchType={() => setActiveTab(item)} />
                    )}
                />
            </View>
            <View style={{width: "80%", alignSelf: "center"}}>     
                <HorizontalLine />
            </View>
            
            {displayTabContent()}
        </View>
        </SafeAreaView>
    );
};

export default SearchPage;
