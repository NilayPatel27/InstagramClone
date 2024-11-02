import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface HeaderLeftProps {
    navigation: any,
    onBack: any
}

const HeaderLeft = ({ navigation, onBack }: HeaderLeftProps) => {
    return (
        <MaterialIcons
            name="keyboard-backspace"
            size={30}
            color={'black'}
            onPress={onBack}
        />
    )
}

export default HeaderLeft