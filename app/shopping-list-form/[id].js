import React, { useEffect, useState } from 'react';
import { View, TextInput, Text,  SafeAreaView, ScrollView, } from 'react-native';
import { Stack, useRouter, useGlobalSearchParams} from "expo-router";

import ImageHeaderButton from '../../components/buttons/ImageHeaderButton';
import ButtonTemplate from "../../components/buttons/buttonTemplate";
import getShoppingLists from "../../components/hooks/shopping-lists-fetchs/getShoppingLists";
import postFetch from '../../components/hooks/shopping-lists-fetchs/postFetch';

const ShoppingListForm = () => {
    const router = useRouter();
    const params = useGlobalSearchParams();
    const [name, setName] = useState("")


    const handleSubmit = async () => {
        body = {
            name: name,
            user: params.id
        }
        
        const response = await postFetch(`shopping-list/create/new/shopping_list`, body)
        
        if(response !== null){
            router.replace(`shopping-list/${params.id}`)
        } else {
            alert("Shopping list was not create, try again later")
        }

    }


    const styles = {
        titleContainer: {
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            paddingVertical: 10,
        },
        title: {
            fontSize: 20,
            fontWeight: "bold"
        },
        input: {
            borderWidth: 1,
            borderColor: "#000",
            paddingVertical: 10,
            marginVertical: 10,
            width: "90%",
        },
        inputContainer: {
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            paddingVertical: 10,

        }
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
                headerTitle: "Create Shopping List",
                headerTitleAlign: "center"
            }}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Enter Name</Text>
                </View>
                <View style={styles.inputContainer} >
                    <TextInput 
                        placeholder="Name"
                        value={name}
                        onChangeText={(text) => setName(text)}
                        style={styles.input}
                    />
                </View>
                <View>
                    <ButtonTemplate title="Submit" color="blue" pressed={handleSubmit} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ShoppingListForm