import * as React from 'react';
import { View, Text, TextInput, Button, Image, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { API_Test } from '../API/getAPI';
export default function Home() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [dec, setDec] = useState('')
    const [data, setData] = useState([])

    const onData = () => {
        fetch(API_Test + '/getData')
            .then(item => item.json())
            .then(item => setData(item))
            .catch(err => console.log(err))
    }
    const onSave = () => {
        fetch(API_Test + '/addData', {
            method: "POST",
            body: JSON.stringify({ name, price, dec }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .catch((err) => console.log(err))
    }

    return (
        <View style={{
            alignItems: "center",
            flex: 1, paddingHorizontal: 40
        }}>
            <TextInput
                onChangeText={(text) => {
                    setName(text)
                }}
                style={{
                    marginBottom: 40, marginTop: 50, borderBottomWidth: 1, height: 40,
                    width: "100%"
                }} placeholder='Tên sản phẩm' />
            <TextInput
                onChangeText={(text) => {
                    setPrice(text);
                }}
                style={{
                    marginBottom: 40, borderBottomWidth: 1, height: 40,
                    width: "100%"
                }} placeholder='Giá sản phẩm' />
            <TextInput
                onChangeText={(text) => {
                    setDec(text);
                }}
                style={{
                    marginBottom: 40, borderBottomWidth: 1, height: 40,
                    width: "100%"
                }} placeholder='Mô tả' />
            <View style={{
                flexDirection: "row"
            }}>
                <Button
                    onPress={() => {
                        onSave()
                    }}
                    title='Insert' />
                <View style={{
                    width: 60
                }} />
                <Button
                    onPress={() => {
                        onData()

                    }}
                    title='Get' />
            </View>
            <FlatList
            style={{
                marginTop:30
            }}
                data={data}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <View style={{
                            flexDirection:"row", marginTop:10
                        }}>
                          <Text>Name:{item.name}     </Text>
                          <Text>price:{item.price}   </Text>
                          <Text>Desription:{item.dec}</Text>
                        </View>
                    )
                }} />

        </View>
    )
}