import React from "react";

const postFavoriteCollection = async (user_id, collection_id) => {
    console.log("hello")
    try {
        const response = await fetch(`https://mysite-p4xg.onrender.com/favorites/collections/add/${user_id}/${collection_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            console.log('Failed to post favorite collection');
            return false
        }

        // const data = await response.json();
        // console.log(data);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default postFavoriteCollection;