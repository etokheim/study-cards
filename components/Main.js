import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { connect } from 'react-redux'
import { PaperProvider, FAB, Appbar } from 'react-native-paper'
import PropTypes from 'prop-types'
import HomeStack from '../routes/HomeStack'
import StatusBar from './StatusBar'
import { updateFab } from '../actions/fab'
import { receiveDecks, handleDeleteItems } from '../actions/decks'
import { toggleAppbar } from '../actions/appbar'
import { getAllDecks } from '../utils/api'

const mapStateToProps = ({ decks, fab, appbar }) => { return { decks, fab, appbar } }

export default connect(mapStateToProps)(class Main extends Component {
	static propTypes = {
		// prop: PropTypes
	}

	state = {
		navigation: null
	}

	liftNavigation = (navigation) => {
		this.setState({
			navigation
		})
	}

	async componentDidMount() {
		// Display FAB on mount
		this.props.dispatch(updateFab(true))

		// TODO: Fix this hack
		// Wait for the children to lift up their navigation object.
		setTimeout(() => {
			this._unsubscribe = this.state.navigation.addListener('focus', () => {
				// Also display the FAB when the user navigates back to Main
				this.props.dispatch(updateFab(true))
			});
		}, 500)

		this.props.dispatch(receiveDecks(await getAllDecks()))
	}

	componentWillUnmount() {
		this._unsubscribe();
	}

	handleDelete = () => {
		const { appbar, dispatch } = this.props

		dispatch(handleDeleteItems(appbar.selected))
		dispatch(toggleAppbar(false))
	}

	render() {
		const { fab, appbar } = this.props
		const { navigation } = this.state
		return (
			<>
				<NavigationContainer>
					<StatusBar />
					<HomeStack liftNavigation={this.liftNavigation} />
				</NavigationContainer>
				<FAB
					icon='plus'
					label='Add new deck'
					onPress={() => { navigation.navigate('New Deck') }}
					visible={ fab.visible }
					style={{
						width: 180,
						// Add appbar height if it's visible
						bottom: appbar.visible ? 56 + 32 : 32,
						right: 32,
						position: 'absolute'
					}}
				/>
				 <Appbar style={{
					 position: 'absolute',
					 bottom: appbar.visible ? 0 : -56,
					 transition: '250ms bottom ease-out',
					 left: 0,
					 right: 0
				 }}>
					<Appbar.Content title={ `${appbar.selected.length} decks`} />
					<Appbar.Action
						icon="delete"
						onPress={() => this.handleDelete()}
					/>
				</Appbar>
			</>
		)
	}
})