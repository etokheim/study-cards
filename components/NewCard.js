import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { TextInput, Button, Paragraph } from 'react-native-paper'
import { connect } from 'react-redux'
import Header from './Header'
import { handleAddCard } from '../actions/decks'
import globalStyles from '../styles/global'

export default connect()(({ dispatch, route, navigation }) => {
	const { deckId } = route.params

	// Declare new state variables
	const [question, setQuestion] = useState('')
	const [answer, setAnswer] = useState('')

	const handleSubmit = () => {
		console.log('question:', question)
		console.log('answer:', answer)

		dispatch(handleAddCard(question, answer, deckId))
		navigation.navigate('Deck')
	}

	return (
		<ScrollView style={[globalStyles.main]}>
			<Header navigation={navigation} backButton text='Create card' />
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
