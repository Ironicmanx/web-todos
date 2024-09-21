
import { View, Text } from 'react-native'
import {Appbar} from 'react-native-paper'
import * as React from 'react'

const Myappbar = ({navigation,back,route}) => {
  return (
    <Appbar.Header>
        {back && <Appbar.BackAction onPress ={() => {navigation.goBack}} />}
      <Appbar.Content title={route.name} />
        {route.name=== 'Home'  && <Appbar.Action icon="face-man-profile" onPress={() => {navigation.navigate('Profile')}}/>}
    </Appbar.Header>
  )
}

export default Myappbar;