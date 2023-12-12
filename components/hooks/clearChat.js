import React from "react";

const ClearChat = async (id) => {
        console.log("id", id)
        const response = await fetch(`https://mysite-p4xg.onrender.com/messaging/clear/${id}`, {
            method: 'DELETE'
        })
        
        if(response.ok) {
            return true
        } else {
            return false
        }
}



export default ClearChat;