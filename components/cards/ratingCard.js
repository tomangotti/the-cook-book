import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import postNewRating from '../hooks/postNewRating';

const RatingCard = ({userId, recipeId}) => {
    const [rating, setRating] = useState(0);

    const handleRating = (value) => {
        setRating(value);
        const newRating = {
            rating: value,
            user: userId,
            recipe: recipeId,
        }

        const postRating = async () => {
            const response = await postNewRating(newRating);
            console.log(response);
        }
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
                        <Ionicons
                            name={star <= rating ? 'star' : 'star-outline'}
                            size={32}
                            color="gold"
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default RatingCard;
