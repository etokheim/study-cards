import React, { useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-paper'
import Header from './Header'
import { updateFab } from '../actions/fab'
import toArray from '../helpers/toArray'

const mapStateToProps = ({ decks }) => ({ decks })

export default connect(mapStateToProps)(({
	navigation, dispatch, route, decks
}) => {
	const { deckId } = route.params
	const deck = decks[deckId]

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
		<ScrollView>
			<Header backButton={false} text={deck.name} />
			<Button onPress={() => navigation.navigate('New Card', { deckId: deck.id })}>+ New card</Button>
			{
				toArray(deck.cards).map((card) => (
					<View style={{ marginBottom: 16 }} key={card.id}>
						<Text>{ card.question }</Text>
						<Text>{ card.answer }</Text>
					</View>
				))
			}
		</ScrollView>
	)
})
