import React from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';

const SmallCollectionCard = ({item, handleNavigate}) => {
    const colors = ["red", "blue", "green", "purple", "orange", "pink", "brown", "black", "grey", "teal", "cyan", "magenta", "indigo", "lime", "maroon", "navy", "olive", "silver"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    return(
        <>
            <TouchableOpacity onPress={handleNavigate} style={{ 
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "column",
                margin: 15,
                borderRadius: 16,
                backgroundColor: '#FFF',
                width: 200,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 5.84,
                elevation: 5,
            }}>
                <View style={{ 
                    padding: 10, 
                    width: 200,
                    height: 275,
                    justifyContent: "center",
                    borderRadius: 16,
                    borderColor: randomColor,
                    borderWidth: 5,

                }}>
                    <Text style={{fontSize: 35, textAlign: "center", color: randomColor}}>{item.name}</Text>
                    <Text style={{fontSize: 12, textAlign: "center", color: randomColor, marginTop: 2}}>By: {item.recipes_details[0].user_username}</Text>
                </View>
                
            </TouchableOpacity>
        </>
    )
}

// export default SmallCollectionCard

// const SmallCollectionCard = ({item, handleNavigate}) => {
            
//     return(
//         <>
//             <TouchableOpacity onPress={handleNavigate} style={{ 
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 flexDirection: "column",
//                 margin: 15,
//                 borderRadius: 16,
//                 backgroundColor: "blue",
//                 width: 175,
//                 shadowColor: "#000",
//                 shadowOffset: {
//                     width: 0,
//                     height: 2,
//                 },
//                 shadowOpacity: 0.25,
//                 shadowRadius: 5.84,
//                 elevation: 5,
//             }}>
//                 <View style={{ 
//                     padding: 10, 
//                     width: 175,
//                     height: 150,
//                     justifyContent: "center", // Added to center the text vertically
//                     borderRadius: 16,
//                     borderColor: '#FFF',
//                     borderWidth: 5,

//                 }}>
//                     <Text style={{fontSize: 28, textAlign: "center", color: "#FFF"}}>{item.name}</Text>
//                 </View>
                
//             </TouchableOpacity>
//         </>
//     )
// }

export default SmallCollectionCard