import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import Header from './Header'
import toArray from '../helpers/toArray'
import DeckItem from './DeckItem'
import { toggleAppbar } from '../actions/appbar'

const mapStateToProps = ({ decks, liftNavigation, appbar }) => { return { decks, liftNavigation, appbar } }

export default connect(mapStateToProps)(class Home extends Component {
	state = {
		selected: {}
	}

	componentDidMount() {
		this.props.route.params.liftNavigation(this.props.navigation)
	}

	handleLongPress = (id) => {
		const { selected } = this.state
		const { appbar } = this.props

		// Toggle selected state
		if(selected[id]) {
			delete selected[id]
		} else {
			selected[id] = true
		}

		// Toggle appbar visibility
		const selectedLength = toArray(selected).length

		if(selectedLength > 0 && !appbar.visible) {
			this.props.dispatch(toggleAppbar(true))
		} else if(selectedLength === 0) {
			this.props.dispatch(toggleAppbar(false))
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
