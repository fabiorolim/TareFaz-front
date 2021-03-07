import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { save, update } from '../api/providers';

export default function New({ route, navigation }) {

    const [tarefa, setTarefa] = useState(route.params ? route.params : {});

    async function salvar() {
        if (tarefa.id) {
            AsyncStorage.getItem('token')
                .then(token => update(token, tarefa))
                .then(() => navigation.reset({ index: 0, routes: [{ name: 'List' }] }))
        } else {
            AsyncStorage.getItem('token')
                .then(token => save(token, tarefa))
                .then(() => navigation.reset({ index: 0, routes: [{ name: 'List' }] }))
        }
    }

    return (
        <View style={styles.container}>
            <Text>Descrição</Text>
            <TextInput
                style={styles.input}
                placeholder="descrição"
                value={tarefa.descricao}
                // onChangeText={(descricao) => tarefa.descricao = descricao}
                //Spread
                onChangeText={descricao => setTarefa({ ...tarefa, descricao })}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={salvar}
            >
                <Text style={styles.textButton}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: "#f00"
    },
    button: {
        marginTop: 10,
        padding: 15,
        backgroundColor: "orange",
        width: 120,
        height: 50,
        alignItems: "center",
        borderRadius: 8,
    },
    textButton: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    input: {
        height: 40,
        width: 300,
        borderRadius: 8,
        margin: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "orange",
    }
});