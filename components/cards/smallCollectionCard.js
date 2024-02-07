import React from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';

const SmallCollectionCard = ({item, handleNavigate}) => {

    return(
        <>
            <TouchableOpacity onPress={handleNavigate} style={{ 
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "column",
                margin: 15,
                borderRadius: 16,
                backgroundColor: "#FFF",
                width: 175,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                    },
                shadowOpacity: 0.25,
                shadowRadius: 5.84,
                elevation: 5,
                }}>
                {/* <View style={{
                    width: 175,
                    height: 150,
                    backgroundColor: "#F3F4F8",
                    borderRadius: 16,
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 0,
                }}>
                    <Image
                        source={{
                            uri: item.image
                            ? item.image
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ83aBZygUGIMqHLcMhhY9VhE283tGv61pOf-boYo9WnQ&s"
                            }}
                            resizeMode="cover" style={{
                                width: "100%",
                                height: "100%",
                                borderTopLeftRadius: 16,
                                borderTopRightRadius: 16,
                            }}/>
                </View> */}
                <View style={{ padding: 10, alignItems: "center"}}>
                    <Text style={{fontSize: 28, textAlign: "center"}}>{item.name}</Text>
                </View>
                
            </TouchableOpacity>
        </>
    )
}

export default SmallCollectionCard