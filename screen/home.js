import * as React from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { API_Test } from '../API/getAPI';
export default function Home() {
    const [name, setName] = useState('')
    const [mark , setMark] = useState('')
    const [data, setData] = useState([])
   
    const [textName , setTextName] = useState('')
    const [textMark , setTextMark] = useState('')
    const [count , setCount] = useState(0)
    const onData = () => {
        fetch(API_Test + '/getData')
            .then(item => item.json())
            .then(item => setData(item))
            .catch(err => console.log(err))
    }
    const onSave = () =>{
        fetch(API_Test + '/addData',{
            method:"POST",
            body: JSON.stringify({name , mark}),
            headers:{
                "Content-Type": "application/json"
            }
        })
        .catch((err) => console.log(err))
    }
    

    useEffect(() => {
        onData()
        getData()
    }, [count])

    const getData = async () => {
        
        data.map(item => {
            setTextName(item.name)
            setTextMark(item.mark)
        })
    }
    return (
        <View style={{
         alignItems: "center",
            flex: 1, paddingHorizontal:40
        }}>
            <TextInput
                onChangeText={(text) =>{
                    setName(text)
                }}
                style={{
                    marginBottom: 40,marginTop:80, borderBottomWidth:1, height:40,
                    width:"100%"
                }} placeholder='Enter name' />
            <TextInput
              onChangeText={(text) =>{
                setMark(text);
              }}
                style={{
                    marginBottom: 40, borderBottomWidth:1, height:40,
                    width:"100%"
                }} placeholder='Enter mark' />
            <Button
                onPress={() => {
                    onSave()
                    setCount(count+1)
                }}
                title='Send to API' />
               {data && <Text style={{
                    marginTop:30
                }}>Name: {textName}</Text> }
               {data && <Text>Mark: {textMark}</Text> }
        </View>
    )
}