import React, {useState, useEffect} from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"

import postFetch from "../../components/hooks/shopping-lists-fetchs/postFetch"

const AddNewItemForm = ({listItems, setListItems, list_id}) => {
    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState("")
    const [quantityType, setQuantityType] = useState("")
    const [showForm, setShowForm] = useState(false)


    const handlePress = async () => {
        console.log(name, quantity, quantityType)

        const body = {
            name: name,
            quantity: quantity,
            quantity_type: quantityType
        }

        const response = await postFetch(`shopping-list/add/item/to/shopping_list/${list_id}`, body)

        if(response !== null){
            console.log(response)
            setListItems([...listItems, response])
            setName("")
            setQuantity("")
            setQuantityType("")
        } else {
            alert("failed to add item, try again later")
        }
    }

    const handleShowForm = () => {
        setShowForm(!showForm)
    }

    const styles = {
        formContainer: {
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            paddingVertical: 10,
            borderTopWidth: 3,
            borderBottomWidth: 3,
        },
        input: {
            borderWidth: 1,
            borderColor: "#000",
            paddingVertical: 10,
            marginVertical: 10,
            width: "90%",
        },
        title: {
            fontSize: 20,
            fontWeight: "bold"
        },
        button: {
            backgroundColor: "blue",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            marginVertical: 10
        },
        buttonTitle: {
            color: "#FFF",
            textAlign: "center",
        },
        buttonContainer: {
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            paddingVertical: 10
        },
    }

    const formBody = () => {
        return (
            <View style={styles.formContainer} >
                <Text style={styles.title} >Add New Item</Text>
                <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Quantity"
                    value={quantity}
                    onChangeText={(text) => setQuantity(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Quantity Type"
                    value={quantityType}
                    onChangeText={(text) => setQuantityType(text)}
                    style={styles.input}
                />
                <TouchableOpacity onPress={handlePress} style={styles.button}>
                    <Text style={styles.buttonTitle}>Add Item</Text>
                </TouchableOpacity>
            </View>
        )
    }



    return (
        <View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleShowForm} style={styles.button}>
                    <Text style={styles.buttonTitle}>{showForm ? "Hide Form" : "Show Form"}</Text>
                </TouchableOpacity>
            </View>
            {showForm ? formBody() : null}
        </View>
    )
}

export default AddNewItemForm