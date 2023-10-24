import react from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';
import RemoveCartItem from "../hooks/removeCartItem";

const CartRecipeCard = ({item, userId, reFetch}) => {
    
    const handleRemoveRecipe = async () => {
        const cartItem = {
            recipe: item.id,
            user: userId,
        }
        const removeItem = await RemoveCartItem(cartItem)
        if(removeItem){
            reFetch()
        } else {
            alert(`Could not remove item`)
        }
    }


    return(
        
            <View style={{ 
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                paddingBottom: 10,
                paddingLeft: 20,
                paddingRight: 5,
                paddingTop:10,
                borderRadius: 12,
                backgroundColor: "#FFF",
                width: "90%",
                marginTop: 10,
                marginHorizontal: 10,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                    },
                shadowOpacity: 0.25,
                shadowRadius: 5.84,
                elevation: 5,
                }}>
                <View style={{flex: 1, paddingLeft: 25}}>
                    <Text style={{fontSize: 16}}>{item.name}</Text>
                
                    <Text style={{fontSize: 14, marginTop: 3}}>{item.description}</Text>
                </View>
                <TouchableOpacity onPress={handleRemoveRecipe} style={{
                        backgroundColor: "red",
                        height: "100%",
                        borderRadius: 5,
                        }}>
                    <Text style={{margin: 10}}>Remove</Text>
                </TouchableOpacity>
            </View>
            
        
    )
}

export default CartRecipeCard