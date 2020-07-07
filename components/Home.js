import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import Header from './Header'
import toArray from '../helpers/toArray'
import DeckItem from './DeckItem'

const mapStateToProps = ({ decks, liftNavigation }) => { return { decks, liftNavigation } }

export default connect(mapStateToProps)(class Home extends Component {
	state = {
		selected: {}
	}

	componentDidMount() {
		this.props.route.params.liftNavigation(this.props.navigation)
	}

	handleLongPress = (id) => {
		const { selected } = this.state

		if(selected[id]) {
			delete selected[id]
		} else {
			selected[id] = true
		}

		this.setState({
			selected
		})
	}

	render() {
		const { navigation, decks } = this.props
		const { selected } = this.state
		return (
			<>
				<ScrollView>
					<Header text='Good morning, Erling' />
					{
						toArray(decks).map((deck) => (
							<DeckItem deck={ deck } navigation={ navigation } key={ deck.id } onLongPress={ this.handleLongPress } selected={ selected[deck.id] } />
						))
					}
				</ScrollView>
			</>
		)
	}
})
