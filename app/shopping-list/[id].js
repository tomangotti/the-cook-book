import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, ActivityIndicator, SafeAreaView, ScrollView, } from 'react-native';
import { Stack, useRouter, useGlobalSearchParams} from "expo-router";

import ImageHeaderButton from '../../components/buttons/ImageHeaderButton';
import ButtonTemplate from "../../components/buttons/buttonTemplate";
import getShoppingLists from "../../components/hooks/shopping-lists-fetchs/getShoppingLists";
import getFetch from '../../components/hooks/shopping-lists-fetchs/getFetch';

const ShoppingListPage = () => {
    const router = useRouter();
    const params = useGlobalSearchParams();
    // const {data, isLoading, error, reFetch} = getShoppingLists(params.id)
    const {data, isLoading, error, reFetch} = getFetch(`shopping-list/get/users/${params.id}`)

    const [shoppingLists, setShoppingLists] = useState([])

    useEffect(() => {
        if(data !== null){
            setShoppingLists(data)
        }
    },[data])

    const listsBody = () => {
        if(shoppingLists.length === 0){
            return(
                <Text>No Shopping Lists</Text>
            )
        }
        return(
            <FlatList
                data={shoppingLists}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => router.push(`shopping-list-detail/${item.id}`)}>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            />
        )
    }


    return(
        <SafeAreaView>
            <Stack.Screen options={{
                headerStyle: {backgroundColor: "#FAFAFC"},
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft: () => (
                    <ImageHeaderButton imageTitle={"back"} handlePress={() => router.back()} />
                ),
                headerTitle: "Shopping Lists",
                headerTitleAlign: "center"
            }}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <ButtonTemplate title="Create New List" color="blue" pressed={() => router.push(`shopping-list-form/${params.id}`)} />
                </View>
                <View>
                    <Text>Shopping List Page</Text>
                </View>
                {isLoading ? <ActivityIndicator size="large" /> : error ? <Text>{error}</Text> : listsBody()}
            </ScrollView>
        </SafeAreaView>
        
    )
}

export default ShoppingListPage;