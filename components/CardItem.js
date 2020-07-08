import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Card, Button } from 'react-native-paper'
import { Text, Animated, Easing } from 'react-native'
import FlipCard from 'react-native-flip-card'

function CardItem({ card }) {
	return (
		<FlipCard
			flipHorizontal
			flipVertical={false}
			clickable
		>
			{/* Face Side */}
			<Card style={{ height: 200, marginBottom: 16 }}>
				<Text>{ card.question }</Text>
			</Card>
			{/* Back Side */}
			<Card style={{ height: 200, marginBottom: 16 }}>
				<Text>{ card.answer }</Text>
			</Card>
		</FlipCard>
	)
}

CardItem.propTypes = {

}

export default CardItem
