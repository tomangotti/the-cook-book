import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, FlatList } from "react-native";

const FooterMenu = ({buttons, activeTab, setActiveTab}) => {
    // const [activeTab, setActiveTab] = useState("Discover");
    // const buttons = ["Discover", "Following"]




    const styles = StyleSheet.create({
        container: {
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            zIndex: 1,
            borderTopColor: 'grey',
            borderTopWidth: 1,
            alignItems: 'center',
            padding: 0,
            width: '100%',
        },
        listItem: {
            paddingVertical: 10,
            paddingHorizontal: 40,
            backgroundColor: "white",
            marginHorizontal: 0,
        },
        activeListItem: {
            paddingVertical: 10,
            paddingHorizontal: 40,
            backgroundColor: "#F3F4F8",
            marginHorizontal: 0,
        },
        text: {
            fontSize: 24,
            width: '100%',
            textAlign: 'center',
            color: 'black',
        },
        activeText: {
            fontSize: 24,
            width: '100%',
            textAlign: 'center',
            color: 'blue',
        }
    })





    return(
        <View style={styles.container}>
            <FlatList
                data={buttons}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                    <TouchableOpacity style={activeTab === item ? styles.activeListItem : styles.listItem} onPress={() => setActiveTab(item)} >
                        <Text style={activeTab === item ? styles.activeText : styles.text}>{item}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>)


}

export default FooterMenu;