import React from 'react'
import {
	Card, Paragraph, TouchableRipple
} from 'react-native-paper'

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
				onPress={() => navigation.navigate('Deck', { deck })}
				style={{
					height: 180
				}}
			>
				<>
					<Card.Title title={deck.name} />
					<Card.Content>
						<Paragraph>Not played through</Paragraph>
					</Card.Content>
				</>
			</TouchableRipple>
		</Card>
	)
}
