import React, {useState, useEffect} from 'react'
import { View, Text, FlatList, SafeAreaView } from 'react-native'
import { useGlobalSearchParams, useRouter, Stack } from 'expo-router'

import getFetch from '../../components/hooks/shopping-lists-fetchs/getFetch'
import AddNewItemForm from './addNewItemForm'
import ImageHeaderButton from '../../components/buttons/ImageHeaderButton'
const ShoppingListDetail = () => {
    const params = useGlobalSearchParams();
    const router = useRouter();
    const {data, isLoading, error, refetch} = getFetch(`shopping-list/get/details/${params.id}`)
    const [listItems, setListItems] = useState([])
    const [listInfo, setListInfo] = useState({})

    useEffect(() => {
        if(data !== null){
            console.log(data)
            setListInfo(data)
            setListItems(data.items)
        }
    },[data])


    const styles = {
        listContainer: {
            width: "100%",
            paddingVertical: 10,
            alignItems: "center",
            justifyContent: "center",
        },
        listItem: {
            width: "100%",
            padding: 10,
            borderWidth: 1,
            borderColor: "#000",
            marginVertical: 5,
        },
        itemName: {},
        titleContainer: {},
        title: {},
        pageContainer: {},
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
                            <Text style={styles.itemName}>{item.name}</Text>
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
                <Text style={styles.listContainer} >{listInfo.name}</Text>
                <AddNewItemForm listItems={listItems} setListItems={setListItems} list_id={params.id} />
                {list()}
            </View>
        )
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
                headerTitle: "Shopping List Details",
                headerTitleAlign: "center"
            }}/>
            {isLoading ? <Text>Loading...</Text> : error ? <Text>There was an error</Text> : body()}
        </SafeAreaView>
    )
}

export default ShoppingListDetail