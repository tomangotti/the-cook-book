import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { View, Text, ScrollView, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";

const ChatBot = () => {
    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState([
        { text: "Hello, Chef Bot!", fromUser: true },
        { text: "Hi there! How can I help you today?", fromUser: false },
        { text: "I'd like a recipe for spaghetti.", fromUser: true },
        { text: "Sure! Here's a simple spaghetti recipe:", fromUser: false },
        { text: "Ingredients:", fromUser: false },
        { text: "- 1 pound spaghetti", fromUser: false },
        { text: "- 2 cups tomato sauce", fromUser: false },
        { text: "- 1/2 cup grated Parmesan cheese", fromUser: false },
        { text: "Instructions:", fromUser: false },
        { text: "1. Boil the spaghetti according to package instructions.", fromUser: false },
        { text: "2. Heat the tomato sauce in a pan.", fromUser: false },
        { text: "3. Drain the spaghetti and mix it with the sauce.", fromUser: false },
        { text: "4. Serve with grated Parmesan cheese on top.", fromUser: false },
        { text: "Enjoy your meal!", fromUser: false },
    ]);

    useEffect(() => {
        
    },[])

    function handleClearChat() {
        setMessages([]);
    }

    function handleSendMessage() {
        if (inputMessage.trim() !== "") {
            setMessages([...messages, { text: inputMessage, fromUser: true }]);
            setInputMessage("");
            // You can add logic here to handle the response from the other side (e.g., Chef Bot).
        }
    }

    const renderMessages = () => {
        return messages.map((message, index) => (
            <View
                key={index}
                style={{
                    alignSelf: message.fromUser ? "flex-end" : "flex-start",
                    backgroundColor: message.fromUser ? "#312651" : "lightgrey",
                    borderRadius: 10,
                    padding: 10,
                    margin: 5,
                    maxWidth: "80%", // Limiting the width of the message box
                }}
            >
                <Text style={{ color: message.fromUser ? "white" : "black" }}>{message.text}</Text>
            </View>
        ));
    };

    const styles = {
        container: {
            flex: 1,
            flexDirection: "column",
        },
        chatWindow: {
            flex: 1,
            backgroundColor: "white",
            borderRadius: 10,
            padding: 10,
            margin: 10,
            shadowColor: "rgba(0,0,0,0.2)",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 10,
            elevation: 2, // Android shadow
        },
        chatHeader: {
            height: 50,
            backgroundColor: "lightgrey",
            borderRadius: 10,
            padding: 10,
            margin: 10,
            alignItems: "center",
        },
        chatBody: {
            flex: 1,
            backgroundColor: "lightgrey",
            borderRadius: 10,
            padding: 10,
            margin: 10,
        },
        chatFooter: {
            flexDirection: "row", // Set flexDirection to row
            alignItems: "center", // Align items in the center vertically
            height: 50,
            backgroundColor: "lightgrey",
            borderRadius: 10,
            padding: 10,
            margin: 10,
        },
        textInput: {
            flex: 1, // Take up the available space
        },
        sendButton: {
            marginLeft: 10, // Add some space between text input and button
            backgroundColor: "#312651",
            padding: 10,
            borderRadius: 5,
        },
        sendButtonText: {
            color: "white",
            height: 20,
        },
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{
                headerShadowVisible: false,
                headerStyle: {backgroundColor: "#FAFAFC"},
                headerLeft: () => (
                    <ScreenHeaderBtn title={"<-- Back"} dimension='100%' handlePress={() => router.back()} />
                ),
                headerRight: () => (
                    <ScreenHeaderBtn title={"Clear Chat"} dimension='100%' handlePress={() => handleClearChat()} />
                ),
                headerTitle: "Chef Bot",
                headerTitleAlign: "center",
            
            }}/>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.chatWindow}>
                <View>
                    <View style={styles.chatHeader}>
                        <Text style={{fontSize: 24}}>Live Chat</Text>
                    </View>
                    <View style={styles.chatBody}>{renderMessages()}</View>
                </View>
            </ScrollView>
            <View style={styles.chatFooter}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Type a message..."
                    value={inputMessage}
                    onChangeText={(text) => setInputMessage(text)}
                />
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={() => handleSendMessage()}
                >
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ChatBot;