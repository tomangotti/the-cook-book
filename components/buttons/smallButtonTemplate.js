import react from "react";
import { TouchableOpacity, Text } from "react-native";

const SmallButtonTemplate = ({title, pressed, color}) => {
    return (
        <TouchableOpacity onPress={pressed}
            style={{
                width: "45%",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 5,
                marginBottom: 0,
                borderRadius: 15,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                    },
                shadowOpacity: 0.25,
                shadowRadius: 5.84,
                elevation: 5,
            }}>
            <Text style={{ textAlign: "center", padding: 10, backgroundColor: color, color: "white", borderRadius: 15, fontSize: 18}}>{title}</Text>
        </TouchableOpacity>
    )
}

export default SmallButtonTemplate