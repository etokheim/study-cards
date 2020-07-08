import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-paper'
import Header from './Header'
import { updateFab } from '../actions/fab'

const mapStateToProps = ({ }) => ({ })

export default connect(mapStateToProps)(({ navigation, dispatch, route }) => {
	const { deck } = route.params

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
		<View>
			<Header backButton={false} text='Anatomy' />
			<Text>Deck screen</Text>
			<Button onPress={() => navigation.navigate('New Card')}>+ New card</Button>
		</View>
	)
})
