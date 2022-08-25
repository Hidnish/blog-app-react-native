import createDataContext from './createDataContext';

const blogReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_BLOGPOST':
			return [
				...state,
				{
					id: Math.floor(Math.random() * 99999),
					title: action.payload.title,
					content: action.payload.content
				},
			];
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

const addBlogPost = dispatchPlaceHolder => (title, content, callback) => {
	dispatchPlaceHolder({ type: 'ADD_BLOGPOST', payload: { title, content } }); //1
	if (callback) {
		callback(); // in this case: to navigate to another page after dispatching
	}
};

const deleteBlogPost = dispatchPlaceHolder => id => {
	dispatchPlaceHolder({ type: 'DELETE_BLOGPOST', payload: id });
};

const editBlogPost = dispatchPlaceHolder => (id, title, content, callback) => {
	dispatchPlaceHolder({ type: 'EDIT_BLOGPOST', payload: { id, title, content } });
	if (callback) {
		callback();
	}
};

export const { Context, Provider } = createDataContext(
	blogReducer,
	{ addBlogPost, deleteBlogPost, editBlogPost },
	[{ title: 'Test Title', content: 'Test Content', id: 1 }]
);


//1 the dispatch() func is what is actually called inside the component that calls it

