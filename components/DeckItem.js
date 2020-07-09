import React from 'react'
import { StyleSheet } from 'react-native'
import { Card, Text, TouchableRipple } from 'react-native-paper'

export default function DeckItem({
	deck, navigation, onLongPress, selected
}) {
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
					<Text style={styles.deckInfo}>Played 5  |  Correct 73%  |  Average 54%</Text>
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
