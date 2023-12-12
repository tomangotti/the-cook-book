import React, {useState, useEffect} from "react";


const postNewMessage = async (message) => {
    
        try{
            const response = await fetch(`https://mysite-p4xg.onrender.com/messaging/post-new-message`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(message)
            })

            if(response.ok) {
                return response.json()
            } else {
                return ""
            }
        } catch(err){
            console.log(err)
        }
}

export default postNewMessage;