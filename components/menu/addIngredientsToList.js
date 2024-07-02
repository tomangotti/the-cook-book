import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";

import getFetch from "../hooks/shopping-lists-fetchs/getFetch";
import postFetch from "../hooks/shopping-lists-fetchs/postFetch";


const AddIngredientsToList = ({user_id, recipe_id}) => {
    const [isForm, setIsForm] = useState(false)
    const [list, setList] = useState([])
    const {data, isLoading, error} = getFetch(`shopping-list/get/users/${user_id}`)

    useEffect(() => {
        if(data.length > 0){
            console.log(data)
            setList(data)
        }
    },[data])


    const handleAddToList = async (list_id) => {
        console.log('Added to list')
        console.log(list_id)
        console.log(recipe_id)
        const response = await postFetch(`shopping-list/add/recipe_ingredients/shopping_list/${list_id}/${recipe_id}`, null)
        if (response !== null) {
            console.log(response)
            alert("Added to list")

        }else{
            alert("Failed to add to list")
        }
    }

    const listOptions = () => {
        if(isLoading){
            return(
                
                    <ActivityIndicator size="large" />
                
            )
        }else if(list.length > 0){
            return(
                <FlatList
                    data={list}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => handleAddToList(item.id)} style={{
                            borderRadius: 12,
                            margin: 5,
                            padding: 5,
                            borderWidth: 1,
                            }}> 
                            <Text style={{textAlign: 'center',}}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                />
            )
        }else {
            return(
                
                    <Text>No Lists Found</Text>
                
            )
        }

        
    }

    const buttons = () => {
        if(!isForm){
            return (
                
                    <TouchableOpacity onPress={() => setIsForm(!isForm)} style={{
                        backgroundColor: 'blue',
                        borderRadius: 12,
                        margin: 5,
                        padding: 5
                    
                    }}>
                        <Text style={{fontSize: 20, textAlign: "center", padding: 5, color: 'white'}}>Add to Shopping List</Text>
                    </TouchableOpacity>
                
            )
        } else { 
            return (
                
                    <TouchableOpacity onPress={() => setIsForm(!isForm)} style={{
                        backgroundColor: 'lightgray',
                        borderRadius: 12,
                        margin: 5,
                        padding: 5
                    
                    }}>
                        <Text style={{fontSize: 20, textAlign: "center", padding: 5}}>Cancel</Text>
                    </TouchableOpacity>
                
            )
        }
        
    }

    return(
        <View style={{
            backgroundColor: 'lightGray',
            marginTop: 25,
        }}>
            
            <View>
                {buttons()}
            </View>
            {isForm ? (
                <View style={{width: "85%", justifyContent: "center", alignSelf: "center"}}>
                    <Text style={{fontSize: 20, textAlign: "center", padding: 5, borderBottomWidth: 1, marginBottom: 10}}>Select A Shopping List</Text>
                    {listOptions()}
                </View>
            ) : null}
        </View>
    )
}


export default AddIngredientsToList;