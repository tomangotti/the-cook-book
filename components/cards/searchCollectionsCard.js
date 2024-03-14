import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from "expo-router";


import getCollections from '../hooks/getCollections';


const SearchCollectionsCard = () => {
    const router = useRouter();
    const [searchText, setSearchText] = useState('');
    const [collections, setCollections] = useState([]);
    const {data, isLoading, error} = getCollections();
    const [filteredCollections, setFilteredCollections] = useState([]);

    useEffect(() => {
        setCollections(data)
    },[data])

    useEffect(() => {
        setFilteredCollections(collections.filter((collections) => collections.name.toLowerCase().includes(searchText.toLowerCase())))
    },[collections, searchText])

    
    function handlePress(id) {
        router.push(`/collections-details/${id}`)
    } 

    return (
        <View>
            <View>
                <TextInput
                    placeholder="Search by Collection name"
                    value={searchText}
                    style={{ backgroundColor: 'lightgrey', width: '75%', marginTop: 25, alignSelf: 'center', fontSize: 20 }}
                    onChangeText={(text) => setSearchText(text)}
                />
            </View>    
            
            

            <View style={{marginVertical: 10}}>
                <Text style={{fontSize: 18, alignSelf: "center"}}>Results</Text>
            </View>

            
            {isLoading ? (
                    <ActivityIndicator size="large" />
                ) : error ? (
                    <View>
                        <Text>Something Went Wrong:</Text>
                        <Text>{error}</Text>
                    </View>
                        ) : 
            <FlatList
                data={filteredCollections}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handlePress(item.id)} style={{marginHorizontal: 15, marginVertical:5, padding: 5, width: '75%', borderWidth: 1, borderColor: 'black', borderRadius: 5, alignSelf: "center"}}>
                    <Text style={{marginLeft: 10}}>{item.name} - by: {item.user_username}</Text>
                </TouchableOpacity>
                )}
            />
                }
        </View>
        
    )
}

export default SearchCollectionsCard;