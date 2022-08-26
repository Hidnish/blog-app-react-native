import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
	switch (action.type) {
		case 'GET_BLOGPOST': 
			return action.payload
		// case 'ADD_BLOGPOST':
		// 	return [
		// 		...state,
		// 		{
		// 			id: Math.floor(Math.random() * 99999),
		// 			title: action.payload.title,
		// 			content: action.payload.content
		// 		},
		// 	];
		case 'EDIT_BLOGPOST':
			return state.map(blogPost => {
				return blogPost.id === action.payload.id ? action.payload : blogPost;
			});
		case 'DELETE_BLOGPOST':
			return state.filter(blogPost => blogPost.id !== action.payload);
		default:
			return;
	}
};

const getBlogPosts = dispatchPlaceHolder => async () => { 
	const response = await jsonServer.get('/blogposts');

	dispatchPlaceHolder({type: 'GET_BLOGPOST', payload: response.data})
}

const addBlogPost = () => async (title, content, callback) => {
	await jsonServer.post('/blogposts', { title, content });
	// dispatchPlaceHolder({ type: 'ADD_BLOGPOST', payload: { title, content } }); -> NOT NEEDED ANYMORE

	if (callback) {
		callback(); // in this case: to navigate to IndexScreen page after dispatching
	}
};

const deleteBlogPost = dispatchPlaceHolder => async id => {
	await jsonServer.delete(`/blogposts/${id}`)
	dispatchPlaceHolder({ type: 'DELETE_BLOGPOST', payload: id });
};

const editBlogPost = dispatchPlaceHolder => async (id, title, content, callback) => {
	await jsonServer.put(`blogposts/${id}`, { title, content });
	dispatchPlaceHolder({ type: 'EDIT_BLOGPOST', payload: { id, title, content } });

	if (callback) {
		callback();
	}
};

export const { Context, Provider } = createDataContext(
	blogReducer,
	{ addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
	[]
);


//1 the dispatch() func is what is actually called inside the component that calls it

