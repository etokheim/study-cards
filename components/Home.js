import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import Header from './Header'
import toArray from '../helpers/toArray'
import DeckItem from './DeckItem'

const mapStateToProps = ({ decks, liftNavigation }) => { return { decks, liftNavigation } }

export default connect(mapStateToProps)(class Home extends Component {
	state = {

	}

	componentDidMount() {
		this.props.route.params.liftNavigation(this.props.navigation)
	}

	render() {
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
			</>
		)
	}
})
