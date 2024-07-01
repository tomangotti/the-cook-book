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
    console.log(params.id)
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
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>No Lists Found</Text>
                </View>
            )
        }
        return(
            <View style={styles.listContainer}>
                <FlatList
                    data={shoppingLists}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => router.push(`shopping-list-detail/${item.id}`)} style={styles.itemContainer}> 
                            <Text style={styles.listItems}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
        )
    }


    const styles = {
        listContainer: {
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            borderTopWidth: 3,
            borderBottomWidth: 3,
            borderColor: "#000",
            paddingVertical: 10,
        },
        listItems: {},
        itemContainer: {
            backgroundColor: "#F0F0F0",
            padding: 10,
            margin: 5,
            width: 200,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#000",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        titleContainer: {
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
        },
        title: {
            fontSize: 20,
            fontWeight: "bold",

        },

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
                
                {isLoading ? <ActivityIndicator size="large" /> : error ? <Text>{error} help</Text> : listsBody()}
            </ScrollView>
        </SafeAreaView>
        
    )
}

export default ShoppingListPage;