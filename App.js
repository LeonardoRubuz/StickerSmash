import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import * as ImagePicker from "expo-image-picker";
import { useState } from 'react';

const PlaceHolderImage = require('./assets/images/background-image.png')

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing : true,
      quality : 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      setShowAppOptions(true);
      console.log(result);
    }else{
      alert('You did not select any image.')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceHolderImage} selectedImage={selectedImage} />
      </View>
      {
        showAppOptions ? (
          <View /> ) :
          (
          <View style={styles.footerContainer}>
            <Button label="Choose a photo" theme="primary" onPress={pickImageAsync}/>
            <Button label="Use this photo" onPress={() => setShowAppOptions(true)}/>
          </View>
          )
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer : {
    flex : 1,
    paddingTop: 58,
  },
  footerContainer : {
    flex : 1 / 3,
    alignItems : 'center'
  }
});
