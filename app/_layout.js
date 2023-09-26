import { Stack } from "expo-router";

export const unstable_settings = {
    initialRouteName: "home",
};

const Layout = () => {
    return (
        <Stack initialRouteName="home">
            <Stack.Screen name="home" />
        </Stack>
    )
}

export default Layout