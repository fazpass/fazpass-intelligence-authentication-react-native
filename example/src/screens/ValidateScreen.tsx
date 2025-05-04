import { Text, View, TextInput, Button, Alert } from 'react-native';
import { FiaService } from '../FiaService';
import { useState } from 'react';
import { Styles } from './Styles';
import { OtpAuthType } from '../../../src/enums/OtpAuthType';

const fiaService = FiaService.getInstance();

export const ValidateScreen = ({navigation}: any) => {
    const [otp, setOtp] = useState('')
    return (
        <View style={Styles.container}>
            <Text style={{ paddingBottom: 24 }}>validate otp type: {fiaService.lastPromise?.authType}</Text>
            <VanishingTextInput
                show={
                    fiaService.lastPromise?.authType == OtpAuthType.Message 
                    || fiaService.lastPromise?.authType == OtpAuthType.Miscall
                }
                value={otp}
                onChangeText={setOtp} />
            <Button 
                title='Validate'
                onPress={() => {
                    if (fiaService.lastPromise?.authType == OtpAuthType.He) {
                        validateHe(navigation)
                    } else if (fiaService.lastPromise?.authType == OtpAuthType.FIA) {
                        navigation.navigate('Home')
                    } else {
                        validateOtp(otp, navigation)
                    }
                }} />
        </View>
    )
}

type VanishingTextInputProps = {
    show: boolean, 
    value?: string, 
    onChangeText?: (text: string) => void
} 

const VanishingTextInput = (props: VanishingTextInputProps) => {
    if (props.show) {
        return <TextInput
            style={[
                Styles.textInput, 
                { marginBottom: 24, }
            ]}
            placeholder='1234'
            value={props.value}
            onChangeText={props.onChangeText} />
    }
    return null
}

const validateOtp = (otp: string, navigation: any) => {
  fiaService.validateOtp(
    otp, 
    (error) => {
      console.error(error)
      Alert.alert(
        'Error Validating OTP',
        error,
        [{text: 'OK', onPress: () => {}}]
      )
    },
    () => navigation.navigate('Home')
  )
};

const validateHe = (navigation: any) => {
    fiaService.validateHe(
      (error) => {
        console.error(error)
        Alert.alert(
          'Error Validating HE',
          error,
          [{text: 'OK', onPress: () => {}}]
        )
      },
      () => navigation.navigate('Home')
    )
  };