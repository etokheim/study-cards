import React, { useEffect, useState } from 'react'
import {
	View, Text, ScrollView, Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import { Button, Paragraph } from 'react-native-paper'
import Constants from 'expo-constants'
import Header from './Header'
import { updateFab } from '../actions/fab'
import toArray from '../helpers/toArray'
import CardItem from './CardItem'
import { handleAnswerCard, handleFinishQuiz } from '../actions/decks'

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
	const [quizStartTime, setQuizStartTime] = useState(Date.now())
	const [answers, setAnswers] = useState({})

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

	const handleAnswer = (cardId, deckIdLocalScope, correct) => {
		dispatch(handleAnswerCard(cardId, deckIdLocalScope, correct))

		answers[cardId] = {
			correct
		}

		setAnswers(answers)
		nextCard()
	}

	const nextCard = (index) => {
		// If index is a number, keep it, else set it to currentCard + 1
		const newCardIndex = !isNaN(index) ? index : currentCard + 1

		// If it was the last card, then finish the quiz,
		// else show the next card
		if (newCardIndex >= numberOfCards) {
			finishQuiz()
		} else {
			setCurrentCard(newCardIndex)
			scrollViewRef.scrollTo({ x: 0, y: cardLayouts[newCardIndex].y, animated: true })
		}
	}

	const handleLiftLayout = (layout, index) => {
		const newCardLayouts = cardLayouts.map((cardHeight) => cardHeight)
		newCardLayouts[index] = layout
		setCardLayouts(newCardLayouts)
	}

	const startQuiz = () => {
		nextCard(0)
	}

	const finishQuiz = () => {
		console.log('Finished quiz')

		const correctCount = toArray(answers).filter((answer) => answer.correct).length

		dispatch(handleFinishQuiz(deckId, quizStartTime, numberOfCards, correctCount))
		scrollViewRef.scrollTo({ x: 0, y: 0, animated: true })
	}

	// Calculate previous score
	const resultArray = toArray(deck.results)
	const playedBefore = !!resultArray.length
	const previousResult = playedBefore ? resultArray.sort((a, b) => a.startTime - b.startTime)[0] : undefined
	const previousCorrectRatio = playedBefore ? Math.round((100 / previousResult.questionCount) * previousResult.correctCount) : undefined

	return (
		<>
			{/* Mimic position fixed by putting an absolutely positioned element behind the ScrollView */}
			<View style={{ position: 'absolute', width: '100%' }}>
				<Header backButton={false} text={deck.name} noMargin handleOnLayout={handleOnLayout} />
				<View style={{ alignItems: 'center', zIndex: 10 }}>
					{
						playedBefore
							? (
								<>
									<Paragraph>Last score</Paragraph>
									<Paragraph>
										{
											`${previousCorrectRatio}%`
										}
									</Paragraph>
								</>
							)
							: (
								<Paragraph>You have not played this quiz yet</Paragraph>
							)
					}
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
								<CardItem handleAnswer={handleAnswer} liftLayout={handleLiftLayout} key={card.id} card={card} questionPadding={questionPadding} cardNumber={index + 1} numberOfCards={numberOfCards} deckId={deck.id} nextCard={nextCard} />
							))
					}
				</View>
			</ScrollView>
		</>
	)
})
