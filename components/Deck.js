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
	const numberOfCards = toArray(deck.cards).length

	// State
	const [headerHeight, setHeaderHeight] = useState(60)
	const [currentCard, setCurrentCard] = useState(0)
	const [cardLayouts, setCardLayouts] = useState([])

	const questionPadding = headerHeight + Constants.statusBarHeight + 128

	let unsubscribe
	let scrollViewRef

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

	const nextCard = (index) => {
		// If index is a number, keep it, else set it to currentCard + 1
		const newCardIndex = !isNaN(index) ? index : currentCard + 1
		setCurrentCard(newCardIndex)
		scrollViewRef.scrollTo({ x: 0, y: cardLayouts[newCardIndex].y, animated: true })
	}

	const handleLiftLayout = (layout, index) => {
		const newCardLayouts = cardLayouts.map((cardHeight) => cardHeight)
		newCardLayouts[index] = layout
		setCardLayouts(newCardLayouts)
	}

	const startQuiz = () => {
		console.log('Start quiz')
		nextCard(0)
	}

	return (
		<>
			{/* Mimic position fixed by putting an absolutely positioned element behind the ScrollView */}
			<View style={{ position: 'absolute', width: '100%' }}>
				<Header backButton={false} text={deck.name} noMargin handleOnLayout={handleOnLayout} />
				<View style={{ alignItems: 'center', zIndex: 10 }}>
					<Text>Last score</Text>
					<Text>76%</Text>
					<Button onPress={() => navigation.navigate('New Card', { deckId: deck.id })}>+ New card</Button>
					<Button mode='contained' onPress={startQuiz}>Start quiz</Button>
				</View>
				{/* TODO: Maybe add a delete button here as well */}
			</View>
			<ScrollView ref={(element) => scrollViewRef = element}>
				<View style={{ paddingTop: windowHeight - 64 }}>
					{
						toArray(deck.cards)
							.sort((a, b) => a.created - b.created)
							.map((card, index) => (
								<CardItem liftLayout={handleLiftLayout} key={card.id} card={card} questionPadding={questionPadding} cardNumber={index + 1} numberOfCards={numberOfCards} deckId={deck.id} nextCard={nextCard} />
							))
					}
				</View>
			</ScrollView>
		</>
	)
})
