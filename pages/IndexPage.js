import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const IndexPage = ({navigation}) => {
    const [blogData, setBlogData] = useState([])
 
  const getBlogs = async () => {
    let blogs = await AsyncStorage.getItem('blogs');
    blogs = JSON.parse(blogs) || [];
    setBlogData(blogs);
  }
 
  useEffect(() => {
    const subscriber = navigation.addListener('focus', () => {
      getBlogs();
    });
    return subscriber;
  }, [])

  return (
    <View>
      <Image
        source={require('../assets/header.jpg')}
        style={styles.images}
      />
      <Text style={styles.headerTitle}>Mwihoti Blog</Text>
      
      <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('BlogPage')}
        >
          <FontAwesome5 name="sticky-note" size={24} color="white" />
          <Text style={styles.buttonText}>New Blog Entry</Text>
        </TouchableOpacity>
        <ScrollView>
          {/* Blog List */}
          {blogData&&blogData.map((blog) => {
            return (
              <TouchableOpacity
                key={blog.id}
                style={{ marginTop:10, backgroundColor:"white", borderRadius: 10, padding:10}}
                onPress={() => navigation.navigate('BlogPage', { blog: blog })}
              >
                <Text style={{ fontSize: 15, fontWeight:"bold"}}>{blog.title}</Text>
                <Text style={{ }}>{blog.content}</Text>
              </TouchableOpacity>
            )
          })}
 
        </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#031031',
    padding: 10,
  },
  input: {
    color: '#fff',
    fontSize: 20,
  },
});

 
export default IndexPage;