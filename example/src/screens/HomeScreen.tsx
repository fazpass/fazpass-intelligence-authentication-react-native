import { Button, Text, View } from "react-native"
import { Styles } from "./Styles"
import { FiaService } from "../FiaService";

const fiaService = FiaService.getInstance();

export const HomeScreen = ({navigation}: any) => {
    const phone = fiaService.phone

    return (
        <View style={Styles.container}>
            <Text style={{ marginBottom: 24  }}>Welcome,</Text>
            <Text style={{ marginBottom: 24  }}>{phone}</Text>
            <Button 
                title="Logout"
                onPress={() => navigation.goBack()}/>
        </View>
    )
}