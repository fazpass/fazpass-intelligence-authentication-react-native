import { Text, View, TextInput, Button, Alert } from 'react-native';
import { FiaService } from '../FiaService';
import { useState } from 'react';
import { Styles } from './Styles';

const fiaService = FiaService.getInstance();

export const LoginScreen = ({navigation}: any) => {
    const [phone, setPhone] = useState('')
    return (
        <View style={Styles.container}>
            <Text style={{ paddingBottom: 24 }}>fazpass</Text>
            <TextInput
                style={[Styles.textInput, { marginBottom: 24 }]}
                placeholder='+6281234567890'
                value={phone}
                onChangeText={setPhone} />
            <Button 
                title='Request OTP'
                onPress={() => requestOtp(phone, navigation)} />
        </View>
    )
}

const requestOtp = (phone: string, navigation: any) => {
  fiaService.requestOtp(
    phone, 
    (error) => {
      console.error(error)
      Alert.alert(
        'Error Requesting OTP',
        error,
        [{text: 'OK', onPress: () => {}}]
      )
    },
    () => navigation.navigate('Validate', {phone: phone})
  )
};