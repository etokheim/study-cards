import React, { useEffect, useState } from 'react'
import {
	View, Text, ScrollView, Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-paper'
import Constants from 'expo-constants'
import Header from './Header'
import { updateFab } from '../actions/fab'
import toArray from '../helpers/toArray'
import CardItem from './CardItem'

const mapStateToProps = ({ decks }) => ({ decks })

export default connect(mapStateToProps)(({
	navigation, dispatch, route, decks
}) => {
	const { deckId } = route.params
	const deck = decks[deckId]
	const windowHeight = Dimensions.get('window').height

	// State
	const [headerHeight, setHeaderHeight] = useState(60)

	const questionPadding = headerHeight + Constants.statusBarHeight + 128

	let unsubscribe

	useEffect(() => {
		unsubscribe = navigation.addListener('focus', () => {
			dispatch(updateFab(false))
		})

		return () => {
			unsubscribe()
		}
	})

	const handleOnLayout = (event) => {
		const { height } = event.nativeEvent.layout
		console.log('Layout is running', height)
		setHeaderHeight(height)
	}

	return (
		<>
			{/* Mimic position fixed by putting an absolutely positioned element behind the ScrollView */}
			<View style={{ position: 'absolute', width: '100%' }}>
				<Header backButton={false} text={deck.name} noMargin handleOnLayout={handleOnLayout} />
				<View style={{ alignItems: 'center' }}>
					<Text>Last score</Text>
					<Text>76%</Text>
					<Button onPress={() => navigation.navigate('New Card', { deckId: deck.id })}>+ New card</Button>
				</View>
				{/* TODO: Maybe add a delete button here as well */}
			</View>
			<ScrollView>
				<View style={{ paddingTop: windowHeight - 64 }}>
					{
						toArray(deck.cards).map((card) => (
							<CardItem key={card.id} card={card} questionPadding={questionPadding} />
						))
					}
				</View>
			</ScrollView>
		</>
	)
})
