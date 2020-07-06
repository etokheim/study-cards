import React from 'react'
import { View, Text } from 'react-native'
import Header from './Header'

export default function Deck() {
	return (
		<View>
			<Header backButton={false} text='Anatomy' />
			<Text>Deck screen</Text>
		</View>
	)
}
