import { AppLoading, SplashScreen, Updates } from 'expo'
import { Asset } from 'expo-asset'
import Constants from 'expo-constants'
import React from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Main from './components/Main'
import reducer from './reducers'
import middleware from './middleware'

const store = createStore(reducer, middleware)

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHide()

export default function App() {
	return (
		<AnimatedAppLoader image={{ uri: Constants.manifest.splash.image }}>
			<Provider store={store}>
				<Main />
			</Provider>
		</AnimatedAppLoader>
	)
}

function AnimatedAppLoader({ children, image }) {
	const [isSplashReady, setSplashReady] = React.useState(false)

	const startAsync = React.useMemo(
		// If you use a local image with require(...), use `Asset.fromModule`
		() => () => Asset.fromURI(image).downloadAsync(),
		[image]
	)

	const onFinish = React.useMemo(() => setSplashReady(true), [])

	if (!isSplashReady) {
		return (
			<AppLoading
				startAsync={startAsync}
				onError={console.error}
				onFinish={onFinish}
			/>
		)
	}

	return (
		<AnimatedSplashScreen image={image}>
			{children}
		</AnimatedSplashScreen>
	)
}

function AnimatedSplashScreen({ children, image }) {
	const animation = React.useMemo(() => new Animated.Value(1), [])
	const [isAppReady, setAppReady] = React.useState(false)
	const [isSplashAnimationComplete, setAnimationComplete] = React.useState(
		false
	)

	React.useEffect(() => {
		if (isAppReady) {
			Animated.timing(animation, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true
			}).start(() => setAnimationComplete(true))
		}
	}, [isAppReady])

	const onImageLoaded = React.useMemo(() => async () => {
		SplashScreen.hide()
		try {
			// Load stuff
			await Promise.all([])
		} catch (e) {
			// handle errors
		} finally {
			setAppReady(true)
		}
	})

	return (
		<View style={{ flex: 1 }}>
			{isAppReady && children}
			{!isSplashAnimationComplete && (
				<Animated.View
					pointerEvents='none'
					style={[
						StyleSheet.absoluteFill,
						{
							backgroundColor: Constants.manifest.splash.backgroundColor,
							opacity: animation
						}
					]}
				>
					<Animated.Image
						style={{
							width: '100%',
							height: '100%',
							resizeMode: Constants.manifest.splash.resizeMode || 'contain',
							transform: [
								{
									scale: animation
								}
							]
						}}
						source={require('./img/logo.png')}
						onLoadEnd={onImageLoaded}
						fadeDuration={0}
					/>
				</Animated.View>
			)}
		</View>
	)
}
