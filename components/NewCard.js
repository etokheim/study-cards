import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import Header from './Header'

export default function NewCard({ dispatch }) {
	// Declare new state variables
	const [cardName, setCardName] = useState(0)

	const handleSubmit = () => {
		console.log('cardName:', cardName)
		// dispatch(handleNewCard(cardName))
	}

	return (
		<ScrollView>
			<Header backButton text='Create card' />
			<TextInput placeholder='Anatomy' label='Card name' onChangeText={(text) => setCardName(text)} value={cardName} />
			<Button
				mode='contained'
				onPress={handleSubmit}
				style={{
					width: 200, marginTop: 8
				}}
			>
				Submit
			</Button>
		</ScrollView>
	)
}
