import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RootNavigation from './src/navigation/rootNavigation'
import Login from './src/auth/Login/LoginPage'

const App = () => {
  return (
    <View>
      {/* <RootNavigation /> */}
      <Login />
    </View>
  )
}

export default App

const styles = StyleSheet.create({})