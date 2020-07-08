import React from 'react'
import PropTypes from 'prop-types'
import { Card, Button } from 'react-native-paper'
import { Text } from 'react-native'

function CardItem({ card }) {
	return (
		<Card style={{ marginBottom: 16, height: 200 }}>
			<Text>{ card.question }</Text>
			<Text>{ card.answer }</Text>
		</Card>
	)
}

CardItem.propTypes = {

}

export default CardItem
