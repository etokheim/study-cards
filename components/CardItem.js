import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Button, Paragraph } from 'react-native-paper'
import { Dimensions, StyleSheet } from 'react-native'
import FlipCard from 'react-native-flip-card'

export default function CardItem({
	card, questionPadding = 80, cardNumber, numberOfCards, dispatch, deckId, nextCard, liftLayout, handleAnswer
}) {
	const styles = StyleSheet.create({
		button: {
			position: 'absolute',
			bottom: 16,
			right: 16
		},

		cardContent: {
			height: '100%'
		},

		card: {
			marginBottom: 128
		},

		cardsCounter: {
			opacity: 0.5,
			position: 'absolute',
			left: 16,
			bottom: 16
		}
	})

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
			<Card style={[styles.card, { height: windowHeight - questionPadding }]}>
				<Card.Content style={styles.cardContent}>
					<Paragraph>{ card.question }</Paragraph>
					<Button onPress={() => setFlipped(true)} style={styles.button}>Answer</Button>
					<Paragraph style={styles.cardsCounter}>{`${cardNumber} / ${numberOfCards}`}</Paragraph>
				</Card.Content>
			</Card>
			{/* Back Side */}
			<Card style={[styles.card, { height: windowHeight - questionPadding }]}>
				<Card.Content style={styles.cardContent}>
					<Paragraph>{ card.answer }</Paragraph>
					<Button onPress={() => handleAnswer(card.id, deckId, true)}>Correct</Button>
					<Button onPress={() => handleAnswer(card.id, deckId, false)}>Incorrect</Button>
					<Button onPress={() => setFlipped(false)} style={styles.button}>Back</Button>
					<Paragraph style={styles.cardsCounter}>{`${cardNumber} / ${numberOfCards}`}</Paragraph>
				</Card.Content>
			</Card>
		</FlipCard>
	)
}
