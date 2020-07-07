import React, { Component } from 'react'
import { PaperProvider, FAB } from 'react-native-paper'
import { Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import Header from './Header'
import toArray from '../helpers/toArray'
import DeckItem from './DeckItem'

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
					{
						toArray(decks).map((deck) => (
							<DeckItem deck={ deck } navigation={ navigation } key={ deck.id } />
						))
					}
				</ScrollView>
				<FAB
					icon='plus'
					label='Add new deck'
					onPress={() => { navigation.navigate('New Deck') }}
					visible={visible}
					style={{
						width: 180,
						bottom: 32,
						right: 32,
						position: 'absolute'
					}}
				/>
			</>
		)
	}
})
