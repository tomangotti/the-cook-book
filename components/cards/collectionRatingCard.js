import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import GetUserCollecionRating from '../hooks/getUserCollectionRating';
import postNewCollectionRating from '../hooks/postNewCollectionRating';
// import postNewRating from '../hooks/postNewRating';
// import GetUserRecipeRating from '../hooks/getUserRecipeRating';

const CollectionRatingCard = ({userId, collectionId}) => {

    const {data, isLoading, error} = GetUserCollecionRating(userId, collectionId);
    const [rating, setRating] = useState(0)

    useEffect(()=> {
        if(data.collection){
            setRating(data.rating)
        }
    },[data])


    const handleRating = async (value) => {
        setRating(value);
        const newRating = {
            rating: value,
            user: userId,
            collection: collectionId,
        }
        
        const response = await postNewCollectionRating(newRating);
        console.log(response);
        
    };

    return (
        <View>
            <Text style={{fontSize: 16}}>Rate this Collection:</Text>
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

export default CollectionRatingCard;