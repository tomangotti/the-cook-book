import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from "expo-router";


import getUsers from '../hooks/getUsers';


const SearchUsersCard = () => {
    const router = useRouter();
    const [searchText, setSearchText] = useState('');
    const [users, setUsers] = useState([]);
    const {data, isLoading, error} = getUsers();
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        setUsers(data)
    },[data])

    useEffect(() => {
        if(searchText === "") {
            setFilteredUsers([])
        } else {    
            setFilteredUsers(users.filter((users) => users.username.toLowerCase().includes(searchText.toLowerCase())))
        }    
        },[users, searchText])

    
    function handlePress(id) {
        router.push(`/profile-page/${id}`)
    } 

    return (
        <View>
            <View>
                <TextInput
                    placeholder="Search by Username"
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
                        ) : filteredUsers.length === 0 ? (
                            <View style={{alignSelf: "center"}}>
                                <Text>No Results Found</Text>
                            </View>
                        ) :
            <FlatList
                data={filteredUsers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handlePress(item.id)} style={{marginHorizontal: 15, marginVertical:5, padding: 5, width: '75%', borderWidth: 1, borderColor: 'black', borderRadius: 5, alignSelf: "center"}}>
                    <Text style={{marginLeft: 10}}>{item.username}</Text>
                </TouchableOpacity>
                )}
            />
                }
        </View>
        
    )
}

export default SearchUsersCard;