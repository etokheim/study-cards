import React, { useEffect, useState } from 'react'
import {
	View, Dimensions, Animated, StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import { Button, Paragraph, Text } from 'react-native-paper'
import Constants from 'expo-constants'
import Header from './Header'
import { updateFab } from '../actions/fab'
import toArray from '../helpers/toArray'
import CardItem from './CardItem'
import { handleAnswerCard, handleFinishQuiz } from '../actions/decks'
import globalStyles from '../styles/global'

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
	const [scrollYPosition, setScrollYPosition] = useState(new Animated.Value(0))

	const questionPadding = headerHeight + Constants.statusBarHeight + 128

	let unsubscribe

	// TODO: Figure out why this works and not the assigning it to a variable.
	// I had a problem with scrollViewRef being set then becoming null instantly.
	// Moving it to state somehow fixed the problem.
	const [scrollViewRef, setScrollViewRef] = useState(React.createRef())

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

	const styles = StyleSheet.create({
		deck: {
			position: 'absolute',
			width: '100%'
		},
		deckInfo: {
			alignItems: 'center',
			height: windowHeight - questionPadding - 8
		},
		score: {
			fontSize: 72,
			marginTop: 48
		},
		scoreSubtitle: {
			opacity: 0.6,
			fontSize: 18
		},
		keyPoints: {
			marginTop: 32,
			marginBottom: 'auto',
			flexDirection: 'row'
		},
		keyPoint: {
			minWidth: 48,
			marginRight: 32,
			marginLeft: 32,
			opacity: 0.6
		},
		keyPointLabel: {
			fontSize: 16,
			textAlign: 'center'
		},
		keyPointValue: {
			fontSize: 32,
			textAlign: 'center'
		},
		keyPointValueOperator: {
			fontSize: 16
		},
		secondaryActions: {
			flexDirection: 'row',
			marginBottom: 8
		},
		secondaryAction: {
			marginLeft: 8,
			marginRight: 8,
			width: 150
		},
		startQuiz: {
			width: '70%',
			height: 56,
			// marginTop: 'auto',
			marginBottom: 16,
			justifyContent: 'center',
			borderRadius: 32
		},
		cards: {
			paddingTop: windowHeight - 104
		}
	})

	return (
		<Animated.ScrollView
			ref={setScrollViewRef}
			scrollEventThrottle={1}
			onScroll={Animated.event(
				[{ nativeEvent: { contentOffset: { y: scrollYPosition } } }],
				{ useNativeDriver: true }
			)}
			style={globalStyles.main}
		>
			{/*
				Mimic position fixed offsetting the view equal to scroll distance.
				It's an ugly hack, but even though it's a simple thing and a common UI pattern, I
				can't figure out how to do it properly.

				1. The react-native-touch-through-view seemed very promising, but requires ejecting
				Expo, which is a no go at this time.

				2. ScrollView doesn't seem to accept pointerEvents attribute, so we can't use that.
			*/}
			<Animated.View style={[ styles.deck, {
				transform: [
					{ translateY: scrollYPosition }
				]
			}]}
			>
				<Header navigation={navigation} backButton text={deck.name} noMargin handleOnLayout={handleOnLayout} />
				<Animated.View style={[styles.deckInfo, {
					// Fade out while scrolling
					opacity: scrollYPosition.interpolate({
						inputRange: [0, 500],
						outputRange: [1, 0]
					}),

					// Scale down while scrolling
					transform: [{
						scale: scrollYPosition.interpolate({
							inputRange: [0, 500],
							outputRange: [1, 0.9]
						})
					}]
				}]}
				>
					{
						playedBefore
							? (
								<>
									<Text style={styles.score}>
										{
											`${previousCorrectRatio}%`
										}
									</Text>
									<Paragraph style={styles.scoreSubtitle}>correct on your last try!</Paragraph>
								</>
							)
							: (
								<Paragraph>You have not played this quiz yet</Paragraph>
							)
					}
					<View style={styles.keyPoints}>
						<View style={styles.keyPoint}>
							<Text style={[styles.keyPointValue, styles.number]}>2</Text>
							<Text style={styles.keyPointLabel}>Tries</Text>
						</View>
						<View style={styles.keyPoint}>
							<Text style={[styles.keyPointValue, styles.number]}>4</Text>
							<Text style={styles.keyPointLabel}>Cards</Text>
						</View>
						<View style={styles.keyPoint}>
							<Text style={[styles.keyPointValue, styles.number]}>
								53
								<Text style={[styles.keyPointValueOperator]}>%</Text>
							</Text>
							<Text style={styles.keyPointLabel}>Average</Text>
						</View>
					</View>
					<Button mode='contained' onPress={startQuiz} style={styles.startQuiz}>Start quiz</Button>
					<View style={styles.secondaryActions}>
						<Button style={styles.secondaryAction} onPress={() => navigation.navigate('New Card', { deckId: deck.id })}>+ New card</Button>
						<Button style={styles.secondaryAction} onPress={() => alert('Coming soon')}>Share</Button>
					</View>
					{/* TODO: Maybe add a delete button here as well */}
				</Animated.View>
			</Animated.View>
			<View style={styles.cards}>
				{
					toArray(deck.cards)
						.sort((a, b) => a.created - b.created)
						.map((card, index) => (
							<CardItem handleAnswer={handleAnswer} liftLayout={handleLiftLayout} key={card.id} card={card} questionPadding={questionPadding} cardNumber={index + 1} numberOfCards={numberOfCards} deckId={deck.id} nextCard={nextCard} />
						))
				}
			</View>
		</Animated.ScrollView>
	)
})
