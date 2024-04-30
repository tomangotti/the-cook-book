import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import postNewRating from '../hooks/postNewRating';
import GetUserRecipeRating from '../hooks/getUserRecipeRating';

const RatingCard = ({userId, recipeId}) => {

    const {data, isLoading, error} = GetUserRecipeRating(userId, recipeId);
    const [rating, setRating] = useState(0)

    useEffect(()=> {
        if(data.recipe){
            setRating(data.rating)
        }
        
    },[data])

    

    const handleRating = async (value) => {
        setRating(value);
        const newRating = {
            rating: value,
            user: userId,
            recipe: recipeId,
        }
        
        const response = await postNewRating(newRating);
        console.log(response);
        
    };

    return (
        <View>
            <Text style={{fontSize: 16}}>Rate this recipe:</Text>
            <View style={{ flexDirection: 'row' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                        key={star}
                        onPress={() => handleRating(star)}
                        style={{ marginRight: 5 }}
                    >
                        <Text style={{ fontSize: 32, color: star <= rating ? 'gold' : 'gray' }}>
                            ★
                        </Text>
                        {/* <Ionicons
                            name={star <= rating ? 'star' : 'star-outline'}
                            size={32}
                            color="gold"
                        /> */}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default RatingCard;
