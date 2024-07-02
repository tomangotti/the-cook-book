import React, {useState, useEffect} from 'react'
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, ScrollView, Linking } from 'react-native'
import { useGlobalSearchParams, useRouter, Stack } from 'expo-router'

import getFetch from '../../components/hooks/shopping-lists-fetchs/getFetch'
import AddNewItemForm from './addNewItemForm'
import ImageHeaderButton from '../../components/buttons/ImageHeaderButton'
import deleteFetch from '../../components/hooks/shopping-lists-fetchs/deleteFetch'


const ShoppingListDetail = () => {
    const params = useGlobalSearchParams();
    const router = useRouter();
    const {data, isLoading, error, refetch} = getFetch(`shopping-list/get/details/${params.id}`)
    const [listItems, setListItems] = useState([])
    const [listInfo, setListInfo] = useState(null)

    useEffect(() => {
        if(data !== null){
            setListInfo(data)
            setListItems(data.items)
        }
    },[data])



    const styles = {
        listContainer: {
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 0,
            paddingBottom: 0,
        },
        listItem: {
            justifyContent: "space-between",
            height: 80,
            alignItems: "center",
            padding: 5,
            flexDirection: "row",
            borderRadius: 12,
            backgroundColor: "#F3F4F8",
            width: "85%",
            marginVertical: 5,
            marginLeft: "auto",
            marginRight: "auto",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
                },
            shadowOpacity: 0.25,
            shadowRadius: 5.84,
            elevation: 5,
        },
        itemName: {
            fontSize: 16, 
            margin: 2.5
        },
        itemQuantity: {
            fontSize: 16, 
            margin: 2.5
        },
        titleContainer: {
            borderBottomWidth: 3,
            borderColor: "black"
        },
        title: {
            fontSize: 25,
            fontWeight: "bold",
            textAlign: "center",
            backgroundColor: "lightGray",
            padding: 20,
        },
        pageContainer: {},
        buttonContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "50%",
            position: "right"
        },
        deleteButton: {
            width: "40%",
            marginRight: 5,
            marginTop: 5,
            marginBottom: 5,
            borderRadius: 5,
        },
        deleteButtonText: {
            textAlign: "center", 
            paddingVertical: 10, 
            backgroundColor: "red", 
            color: "white", 
            borderRadius: 5, 
            fontSize: 12
        },
        walmartButton: {
            width: "50%",
            marginRight: 5,
            marginTop: 5,
            marginBottom: 5,
            borderRadius: 5,
        },
        walmartButtonText: {
            textAlign: "center", 
            paddingVertical: 10, 
            backgroundColor: "blue", 
            color: "white", 
            borderRadius: 5, 
            fontSize: 12
        },
        itemText: {
            alignSelf: "center",
            width: "50%",
        },
        
    }

    const list = () => {
        if(listItems.length === 0){
            return(
                <Text>No Items</Text>
            )
        }
        return(
            <View style={styles.listContainer}>
                <FlatList
                    data={listItems}

                    renderItem={({item}) => (
                        <View style={styles.listItem}>
                            <View style={styles.itemText}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemQuantity}>{item.quantity} : {item.quantity_type} </Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={() => handleWalmart(item.name)} style={styles.walmartButton}>
                                    <Text style={styles.walmartButtonText}>Walmart</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                                    <Text style={styles.deleteButtonText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                />
            </View>
            
        )
        
    }

    const body = () => {
        return(
            <View style={styles.pageContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title} >{listInfo.name}</Text>
                </View>
                <AddNewItemForm listItems={listItems} setListItems={setListItems} list_id={params.id} />
                {list()}
                
                

                
                
            </View>
        )
    }

    const handleDelete = async (item_id) => {
        const response = await deleteFetch(`shopping-list/delete/item/${item_id}`)
        if(response !== null){
            setListItems(listItems.filter(item => item.id !== item_id))
        } else {
            alert("failed to delete item, try again later")
        }
    }

    const handleWalmart = (item_name) => {
        const encodedQuery = encodeURIComponent(item_name);
        const walmartSearchURL = `https://www.walmart.com/search/?query=${encodedQuery}`;
        Linking.openURL(walmartSearchURL);
    }

    const handleDeleteList = async () => {
        const response = await deleteFetch(`shopping-list/delete/shopping_list/${params.id}`)
        if(response !== null){
            router.replace(`../shopping-list/${listInfo.user}`)
        } else {
            alert("failed to delete list, try again later")
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
                headerRight: () => (
                    <ImageHeaderButton imageTitle={"trash"} handlePress={() => handleDeleteList()} />
                ),
                headerTitle: "List Details",
                headerTitleAlign: "center"
            }}/>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                {isLoading ? <Text>Loading...</Text> : error ? <Text>There was an error</Text> : body()}
            </ScrollView>
            
        </SafeAreaView>
    )
}

export default ShoppingListDetail