import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { connect } from 'react-redux'
import { PaperProvider, FAB } from 'react-native-paper'
import PropTypes from 'prop-types'
import HomeStack from '../routes/HomeStack'
import StatusBar from './StatusBar'
import { updateFab } from '../actions/fab'

const mapStateToProps = ({ decks, liftNavigation, fab }) => { return { decks, liftNavigation, fab } }

export default connect(mapStateToProps)(class Main extends Component {
	static propTypes = {
		prop: PropTypes
	}

	state = {
		navigation: null
	}

	liftNavigation = (navigation) => {
		this.setState({
			navigation
		})
	}

	componentDidMount() {
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
	}

	componentWillUnmount() {
		this._unsubscribe();
	}

	render() {
		const { fab } = this.props
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
						bottom: 32,
						right: 32,
						position: 'absolute'
					}}
				/>
			</>
		)
	}
})