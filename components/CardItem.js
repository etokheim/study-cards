import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Button, Paragraph } from 'react-native-paper'
import { Dimensions, StyleSheet } from 'react-native'
import FlipCard from 'react-native-flip-card'

function CardItem({
	card, questionPadding = 80, cardNumber, numberOfCards
}) {
	const [flipped, setFlipped] = useState(false)
	const windowHeight = Dimensions.get('window').height

	const handleAnswer = (correct) => {
		console.log('You answered', correct ? 'correctly' : 'wrongly')
	}

	return (
		<FlipCard
			flipHorizontal
			flipVertical={false}
			clickable={false}
			flip={flipped}
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
					<Button onPress={() => handleAnswer(true)}>Correct</Button>
					<Button onPress={() => handleAnswer(false)}>Incorrect</Button>
					<Button onPress={() => setFlipped(false)} style={styles.button}>Back</Button>
					<Paragraph style={styles.cardsCounter}>{`${cardNumber} / ${numberOfCards}`}</Paragraph>
				</Card.Content>
			</Card>
		</FlipCard>
	)
}

CardItem.propTypes = {

}

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

export default CardItem
