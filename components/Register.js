import React, { useState, useEffect } from 'react'
import {
	Card, Paragraph, TextInput, Button
} from 'react-native-paper'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native'
import Header from './Header'
import { updateFab } from '../actions/fab'
import { handleCreateUser } from '../actions/user'
import globalStyles from '../styles/global'

export default connect()(({ dispatch, navigation }) => {
	// Declare new state variables
	const [username, setUsername] = useState('')

	const handleSubmit = () => {
		console.log('Registering with the name', username)
		dispatch(handleCreateUser(username))

		navigation.navigate('Home')
	}

	let unsubscribe

	useEffect(() => {
		unsubscribe = navigation.addListener('focus', () => {
			dispatch(updateFab(false))
		})

		return () => {
			unsubscribe()
		}
	})

	return (
		<ScrollView style={[globalStyles.main]}>
			<Header text='Welcome!' />
			<Card>
				<Card.Title title='Registration' />
				<Card.Content>
					<TextInput placeholder='Your name' label='Name' onChangeText={(text) => setUsername(text)} value={username} />
					<Button mode='contained' onPress={handleSubmit} style={{ marginTop: 16 }}>Register</Button>
				</Card.Content>
			</Card>
			<Paragraph style={{
				opacity: 0.5, marginTop: 32, fontStyle: 'italic', textAlign: 'center'
			}}
			>
				The data you provide never leaves your phone. It is stored locally and never sent to a remote server.
			</Paragraph>
		</ScrollView>
	)
})
