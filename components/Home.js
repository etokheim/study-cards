import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import Header from './Header'

const mapStateToProps = ({ decks }) => { return { decks } }

export default connect(mapStateToProps)(class Home extends Component {
	state = {

	}

	render() {
	const visible = true
		const { navigation, decks } = this.props
	return (
		<>
			<ScrollView>
				<Header text='Good morning, Erling' />
				<Card
					style={{ backgroundColor: 'white' }}
				>
					<TouchableRipple
						rippleColor='rgba(0, 0, 0, .32)'
						onPress={() => navigation.navigate('Deck')}
						style={{
							height: 180
						}}
					>
						<>
							<Card.Title title='Anatomy' />
							<Card.Content>
								<Paragraph>Not played through</Paragraph>
							</Card.Content>
						</>
					</TouchableRipple>
				</Card>
			</ScrollView>
			<FAB
				icon='plus'
				label='Add new deck'
				onPress={() => { navigation.navigate('New Deck') }}
				visible={visible}
				style={{
					width: 180,
					marginBottom: 32,
					marginLeft: 'auto',
					marginRight: 32
				}}
			/>
		</>
	)
}
})
