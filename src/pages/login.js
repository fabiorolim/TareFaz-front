import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Text,
    TextInput,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { login } from '../api/providers'

export default function Login({ navigation }) {

    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')

    function handleSubmit() {
        login(usuario, senha)
            .then((token) => AsyncStorage.setItem('token', token))
            .then(() => navigation.navigate('List'))
    }

    return (
        <KeyboardAvoidingView enabled={Platform.OS === "ios"} behavior="padding" style={style.container}>
            <View>
                <Text style={style.logo}>TareFaz</Text>
            </View>
            <View style={style.form}>
                <Text style={style.label}>Usuário</Text>
                <TextInput
                    style={style.input}
                    placeholder="usuario"
                    placeholderTextColor="#999"
                    // keyboardType="email-address"
                    autoCapitalize="none"
                    value={usuario}
                    onChangeText={usuario => setUsuario(usuario)}
                    autoCorrect={false}>
                </TextInput>
                <Text style={style.label}>Senha</Text>
                <TextInput
                    style={style.input}
                    placeholder="senha"
                    placeholderTextColor="#999"
                    secureTextEntry
                    autoCapitalize="none"
                    value={senha}
                    onChangeText={senha => setSenha(senha)}
                    autoCorrect={false}>
                </TextInput>
                <TouchableOpacity onPress={handleSubmit} style={style.button}>
                    <Text style={style.textButton}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        fontWeight: "bold",
        fontSize: 60,
        color: "orange"
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 20,
        fontSize: 16,
        color: "#444",
        height: 44,
        marginBottom: 20,
        borderRadius: 8,
    },
    button: {
        height: 42,
        backgroundColor: "orange",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,

    },
    textButton: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});