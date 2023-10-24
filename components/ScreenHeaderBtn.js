import react from "react";
import { TouchableOpacity,Text } from "react-native";

const ScreenHeaderBtn = ({title, dimension, handlePress}) => {
    return(
        <TouchableOpacity onPress={handlePress}>
            <Text style={{width: dimension, borderRadius: 10 / 1.25, height: 15}}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ScreenHeaderBtn