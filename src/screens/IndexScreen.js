import React, { useContext, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import { Feather } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
	// props passed by the createStackNavigatior()'s object

	const { state, deleteBlogPost, getBlogPosts } = useContext(BlogContext);

	useEffect(() => {
		getBlogPosts();

		const listener = navigation.addListener('didFocus', () =>
			getBlogPosts()
		); // every time user navigates to this screen call getBlogPosts()

		return () => {
			listener.remove();
		}; // clean up after component unmounts (eliminate listeners)

	}, []);

	return (
		<View>
			<FlatList
				data={state}
				keyExtractor={(blogPost) => blogPost.title}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity
							onPress={() =>
								navigation.navigate('Show', { id: item.id })
							}
							activeOpacity={1}
						>
							<View style={styles.row}>
								<Text style={styles.title}>
									{item.title} - ID: {item.id}
								</Text>
								<TouchableOpacity
									onPress={() => deleteBlogPost(item.id)}
								>
									<Feather
										style={styles.icon}
										name="trash-2"
									/>
								</TouchableOpacity>
							</View>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
};

IndexScreen.navigationOptions = ({ navigation }) => {
	return {
		headerRight: () => (
			<TouchableOpacity onPress={() => navigation.navigate('Create')}>
				<Feather name="plus" size={30} />
			</TouchableOpacity>
		),
	};
};

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 20,
		paddingHorizontal: 15,
		borderBottomWidth: 1,
		borderColor: 'grey',
	},
	title: {
		fontSize: 18,
	},
	icon: {
		fontSize: 24,
	},
});

export default IndexScreen;
