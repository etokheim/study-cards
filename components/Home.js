import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import Header from './Header'
import toArray from '../helpers/toArray'
import DeckItem from './DeckItem'
import { toggleAppbar, selectItem, deselectItem } from '../actions/appbar'

const mapStateToProps = ({ decks, liftNavigation, appbar, user }) => { return { decks, liftNavigation, appbar, user } }

export default connect(mapStateToProps)(class Home extends Component {
	state = {
		// TODO: Consider consolidating the state's selected object with the appbar's
		// selected object (Redux)
		selected: {}
	}

	componentDidMount() {
		const { user, route, navigation } = this.props

		route.params.liftNavigation(navigation)
		
		if(!user.name) {
			navigation.navigate('Register')
		}
	}

	handleLongPress = (id) => {
		const { selected } = this.state
		const { appbar, dispatch } = this.props

		// Toggle selected state
		if(selected[id]) {
			delete selected[id]
			dispatch(deselectItem(id))
		} else {
			selected[id] = true
			dispatch(selectItem(id))
		}

		// Toggle appbar visibility
		const selectedLength = toArray(selected).length

		if(selectedLength > 0 && !appbar.visible) {
			dispatch(toggleAppbar(true))
		} else if(selectedLength === 0) {
			dispatch(toggleAppbar(false))
		}

		this.setState({
			selected
		})
	}

	render() {
		const { navigation, decks, user } = this.props
		const { selected } = this.state
		return (
			<>
				<ScrollView>
					<Header text={`Good morning, ${user.name}`} />
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
