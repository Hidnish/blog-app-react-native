import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const BlogPostForm = ({ initialValues, onSubmit }) => {
    const [title, setTitle] = useState(initialValues.title);
	const [content, setContent] = useState(initialValues.content);
    
    return (
		<View>
			<Text style={styles.label}>Enter Title: </Text>
			<TextInput
				style={styles.input}
				value={title}
				onChangeText={(text) => setTitle(text)}
			/>
			<Text style={styles.label}>Enter Content: </Text>
			<TextInput
				style={styles.input}
				value={content}
				onChangeText={(text) => setContent(text)}
			/>
			<Button
				title="Submit"
                onPress={() => onSubmit(title, content)}
			/>
		</View>
	);
}

BlogPostForm.defaultProps = {
    initialValues: {
        title: '',
        content: ''
    }
}

const styles = StyleSheet.create({
    input: {
		fontSize: 18,
		borderWidth: 1,
		borderColor: 'grey',
		marginBottom: 15,
		padding: 5,
		margin: 10,
	},
	label: {
		fontSize: 20,
		marginVertical: 5,
		marginLeft: 10,
	},
})

export default BlogPostForm;