import * as React from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { API_Test } from '../API/getAPI';
export default function Home() {
    const [text, setText] = useState('')
    const [image, setImage] = useState('')
    const [data, setData] = useState([])
    const onData = () => {
        fetch(API_Test + '/getData')
            .then(item => item.json())
            .then(item => setData(item))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        onData()
    }, [])

    const getData = () => {
        data.map(item => {
            setText(item.text)
            setImage(item.image)
        })
    }
    return (
        <View style={{
            justifyContent: "center", alignItems: "center",
            flex: 1
        }}>
            <TextInput
                value={text}
                style={{
                    marginBottom: 40
                }} placeholder='Text Input' />
            <Button
                onPress={() => {
                    getData()
                }}
                title='Buttom' />
            {image.length > 0 ? <Image
                style={{
                    width: 60, height: 60, marginTop: 30
                }} source={{uri:image}} /> : <Image
                style={{
                    width: 60, height: 60, marginTop: 30
                }} source={require('../assets/OIP.jpg')} />}
        </View>
    )
}