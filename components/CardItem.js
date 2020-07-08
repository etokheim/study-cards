import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Button, Paragraph } from 'react-native-paper'
import { Text, Animated, Easing } from 'react-native'
import FlipCard from 'react-native-flip-card'

function CardItem({ card }) {
	const [flipped, setFlipped] = useState(false)

	return (
		<FlipCard
			flipHorizontal
			flipVertical={false}
			clickable={false}
			flip={flipped}
		>
			{/* Face Side */}
			<Card style={{ height: 200, marginBottom: 16 }}>
				<Card.Content>
					<Paragraph>{ card.question }</Paragraph>
					<Button onPress={() => setFlipped(true)}>Answer</Button>
				</Card.Content>
			</Card>
			{/* Back Side */}
			<Card style={{ height: 200, marginBottom: 16 }}>
				<Card.Content>
					<Paragraph>{ card.answer }</Paragraph>
					<Button onPress={() => setFlipped(false)}>Back</Button>
				</Card.Content>
			</Card>
		</FlipCard>
	)
}

CardItem.propTypes = {

}

export default CardItem
