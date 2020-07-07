import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import Header from './Header'
import { updateFab } from '../actions/fab'

export default connect()(({ navigation, dispatch }) => {
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
		</View>
	)
})
