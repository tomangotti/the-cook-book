import react from "react";
import { TouchableOpacity,Text } from "react-native";

const ScreenHeaderBtn = ({title, dimension}) => {
    return(
        <TouchableOpacity>
            <Text style={{width: dimension, borderRadius: 10 / 1.25}}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ScreenHeaderBtn