import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Button, Text } from 'react-native-paper'
import { Dimensions, StyleSheet, View } from 'react-native'
import FlipCard from 'react-native-flip-card'

export default function CardItem({
	card, totalHeaderHeight, cardNumber, numberOfCards, dispatch, deckId, nextCard, liftLayout, handleAnswer
}) {
	const [flipped, setFlipped] = useState(false)
	const windowHeight = Dimensions.get('window').height

	return (
		<FlipCard
			flipHorizontal
			flipVertical={false}
			clickable={false}
			flip={flipped}
			onLayout={(event) => {
				liftLayout(event.nativeEvent.layout, cardNumber - 1)
			}}
		>
			{/* Face Side */}
			<Card style={[styles.card, { height: windowHeight - totalHeaderHeight }]}>
				<Card.Content style={styles.cardContent}>
					{
						// Display a drag indicator on the first card
						cardNumber === 1
							? (
								<View style={styles.dragIndicator} />
							) : null
					}
					<Text style={styles.question}>{ card.question }</Text>
					<Button onPress={() => setFlipped(true)} style={styles.button}>Answer</Button>
					<Text style={styles.cardsCounter}>{`${cardNumber} / ${numberOfCards}`}</Text>
				</Card.Content>
			</Card>
			{/* Back Side */}
			<Card style={[styles.card, { height: windowHeight - totalHeaderHeight }]}>
				<Card.Content style={styles.cardContent}>
					{
						// Display a drag indicator on the first card
						cardNumber === 1
							? (
								<View style={styles.dragIndicator} />
							) : null
					}
					<Text style={styles.answer}>{ card.answer }</Text>
					<View style={styles.answerButtons}>
						<Button style={styles.answerButton} onPress={() => handleAnswer(card.id, deckId, true)}>Correct</Button>
						<Button style={styles.answerButton} onPress={() => handleAnswer(card.id, deckId, false)}>Incorrect</Button>
					</View>
					<Button onPress={() => setFlipped(false)} style={styles.button}>Back</Button>
					<Text style={styles.cardsCounter}>{`${cardNumber} / ${numberOfCards}`}</Text>
				</Card.Content>
			</Card>
		</FlipCard>
	)
}

const styles = StyleSheet.create({
	dragIndicator: {
		width: 50,
		height: 10,
		backgroundColor: '#eee',
		alignSelf: 'center',
		marginBottom: 16,
		borderRadius: 10
	},
	question: {
		fontSize: 48,
		marginTop: 'auto',
		marginBottom: 'auto',
		bottom: 48,
		padding: 16
	},
	answer: {
		fontSize: 18,
		marginTop: 'auto',
		padding: 16
	},
	answerButtons: {
		flexDirection: 'row',
		marginTop: 'auto',
		marginBottom: 64,
		justifyContent: 'center'
	},
	answerButton: {
		width: 145
	},
	button: {
		position: 'absolute',
		bottom: 16,
		right: 16
	},

	cardContent: {
		height: '100%'
	},

	card: {
		marginBottom: Dimensions.get('window').height / 2
	},

	cardsCounter: {
		opacity: 0.5,
		position: 'absolute',
		left: 16,
		bottom: 16
	}
})
