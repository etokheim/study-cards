import React from 'react'
import { StyleSheet } from 'react-native'
import { Card, Text, TouchableRipple } from 'react-native-paper'
import toArray from '../helpers/toArray'

export default function DeckItem({
	deck, navigation, onLongPress, selected
}) {
	// Calculate stats
	const resultArray = toArray(deck.results)
	const playedBefore = !!resultArray.length
	const previousResult = playedBefore ? resultArray.sort((a, b) => a.startTime - b.startTime)[resultArray.length - 1] : undefined
	const previousCorrectRatio = playedBefore ? Math.round((100 / previousResult.questionCount) * previousResult.correctCount) : undefined
	const averageResult = playedBefore ? Math.round(
		resultArray
			.map((result) => (100 / result.questionCount) * result.correctCount)
			.reduce((a, b) => a + b)
			/ resultArray.length
	) : 0

	return (
		<Card
			style={{ marginBottom: 16, backgroundColor: selected ? 'green' : 'white' }}
		>
			<TouchableRipple
				rippleColor='rgba(0, 0, 0, .32)'
				onLongPress={() => onLongPress(deck.id)}
				onPress={() => navigation.navigate('Deck', { deckId: deck.id })}
				style={{
					height: 180
				}}
			>
				<>
					<Card.Title title={deck.name} />
					<Text style={styles.deckInfo}>{`Plays ${resultArray.length}  |  ${previousCorrectRatio || 0}% correct  |  ${averageResult || 0}% ratio  |  ${toArray(deck.cards).length} cards`}</Text>
				</>
			</TouchableRipple>
		</Card>
	)
}

const styles = StyleSheet.create({
	deckInfo: {
		position: 'absolute',
		bottom: 16,
		left: 16,
		right: 16,
		opacity: 0.6
	}
})
