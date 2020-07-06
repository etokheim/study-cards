import React from 'react'
import { View, Text } from 'react-native'
import { TextInput, HelperText, Button } from 'react-native-paper'
import Header from './Header'

export default function NewDeck() {
	return (
		<View>
			<Header backButton text='Create deck' />
			<TextInput placeholder='Anatomy' label='Deck name' />
			<Button
				mode='contained'
				onPress={() => {}}
				style={{
					width: 200, marginTop: 8
				}}
			>
				Submit
			</Button>
		</View>
	)
}
