import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import Constants from 'expo-constants'

export default function Header(props) {
	return (
		<View style={{ backgroundColor: 'teal', height: Constants.statusBarHeight }}>
			<StatusBar translucent backgroundColor='teal' {...props} />
		</View>
	)
}
