import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { TextInput, Button, Paragraph } from 'react-native-paper'
import { connect } from 'react-redux'
import Header from './Header'
import { handleAddCard } from '../actions/decks'

const mapStateToProps = ({ }) => ({ })

export default connect(mapStateToProps)(({ dispatch, route }) => {
	const { deckId } = route.params

	// Declare new state variables
	const [question, setQuestion] = useState(0)
	const [answer, setAnswer] = useState(0)

	const handleSubmit = () => {
		console.log('question:', question)
		console.log('answer:', answer)

		dispatch(handleAddCard(question, answer, deckId))
	}

	return (
		<ScrollView>
			<Header backButton text='Create card' />
			<Paragraph>{ deckId }</Paragraph>
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
})
