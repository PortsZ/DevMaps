import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

function Profile({navigation}) {
  const githubUsername = navigation.getParam('github_username');
    return (
        <WebView style={{ flex: 1,}} source={{ uri: `https://github.com/${githubUsername}` }} />
    )

}
export default Profile;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#111',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    }
  });
  