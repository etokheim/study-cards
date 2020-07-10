import React, { Component } from 'react'
import { Text, ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import Header from './Header'
import toArray from '../helpers/toArray'
import DeckItem from './DeckItem'
import { toggleAppbar, selectItem, deselectItem } from '../actions/appbar'
import globalStyles from '../styles/global'

const mapStateToProps = ({ decks, liftNavigation, appbar, user }) => { return { decks, liftNavigation, appbar, user } }

export default connect(mapStateToProps)(class Home extends Component {
	state = {
		// TODO: Consider consolidating the state's selected object with the appbar's
		// selected object (Redux)
		selected: {},
		welcomingPhrase: ""
	}

	componentDidMount() {
		const { route, navigation } = this.props

		route.params.liftNavigation(navigation)

		this.setWelcomingPhrase()
	}

	componentDidUpdate() {
		const { user, navigation } = this.props

		if(user.receivedUser && !user.name) {
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

	setWelcomingPhrase = () => {
		const hours = new Date().getHours()
		let welcomingPhrase = ""

		if(hours < 4) {
			welcomingPhrase = "It's bedtime"
		} else if(hours < 12) {
			welcomingPhrase = 'Good morning'
		} else if(hours < 18) {
			welcomingPhrase = 'Good afternoon'
		} else {
			welcomingPhrase = 'Good evening'
		}

		this.setState({
			welcomingPhrase
		})
	}

	render() {
		const { navigation, decks, user } = this.props
		const { selected, welcomingPhrase } = this.state
		return (
			<>
				<ScrollView style={ globalStyles.main }>
					<Header text={`${welcomingPhrase}, ${user.name}`} />
					{
						toArray(decks)
							.sort((a, b) => a.created - b.created)
							.reverse()
							.map((deck) => (
								<DeckItem deck={ deck } navigation={ navigation } key={ deck.id } onLongPress={ this.handleLongPress } selected={ selected[deck.id] } />
							))
					}
					{/* Some padding bottom to account for the FAB */}
					<View style={{ marginBottom: 96 }} />
				</ScrollView>
			</>
		)
	}
})
