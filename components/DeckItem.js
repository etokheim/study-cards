import React from 'react'
import {
	Card, Paragraph, TouchableRipple
} from 'react-native-paper'

export default function DeckItem(props) {
	const { deck, navigation } = props
	return (
		<Card
			style={{ backgroundColor: 'white', marginBottom: 16 }}
		>
			<TouchableRipple
				rippleColor='rgba(0, 0, 0, .32)'
				onPress={() => navigation.navigate('Deck')}
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
