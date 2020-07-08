import React, { useState } from 'react'
import { ScrollView, TextInput as Input } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import Header from './Header'

export default function NewCard({ dispatch }) {
	// Declare new state variables
	const [question, setQuestion] = useState(0)
	const [answer, setAnswer] = useState(0)

	const handleSubmit = () => {
		console.log('question:', question)
		console.log('answer:', answer)
		// dispatch(handleNewCard(cardName))
	}

	return (
		<ScrollView>
			<Header backButton text='Create card' />
			<TextInput placeholder="What's ..." label='Question' onChangeText={(text) => setQuestion(text)} value={question} />
			<TextInput
				style={{
					height: 100,
					marginTop: 16
				}}
				placeholder="It's when ..."
				label='Answer'
				onChangeText={(text) => setAnswer(text)}
				value={answer}
				multiline
			/>
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
