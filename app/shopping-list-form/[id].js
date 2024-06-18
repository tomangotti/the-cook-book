import React, { useEffect, useState } from 'react';
import { View, TextInput, Text,  SafeAreaView, ScrollView, } from 'react-native';
import { Stack, useRouter, useGlobalSearchParams} from "expo-router";

import ImageHeaderButton from '../../components/buttons/ImageHeaderButton';
import ButtonTemplate from "../../components/buttons/buttonTemplate";
import getShoppingLists from "../../components/hooks/shopping-lists-fetchs/getShoppingLists";

const ShoppingListForm = () => {
    const router = useRouter();
    const params = useGlobalSearchParams();
    const [name, setName] = useState("")


    const handleSubmit = async () => {
        console.log("submitted")
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
                <View>
                    <TextInput 
                        placeholder="Name"
                        value={name}
                        onChangeText={(text) => setName(text)}
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