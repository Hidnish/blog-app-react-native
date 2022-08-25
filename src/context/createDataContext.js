import React, {useReducer} from 'react';

// createDataContext()
export default (reducer, actions, initalState) => {
    const Context = React.createContext(); // context object accessible by all components nested inside Provider

    const Provider = ({children}) => { // children is a component passed as a prop by App
        const [state, dispatch] = useReducer(reducer, initalState);

        const boundActions = {};
        // actions === { addBlogPost: (dispatch) => {return () => { dispatch() }} }

        for (let key in actions) { // create a copy of ACTIONS called with dispatch()
            boundActions[key] = actions[key](dispatch);
        }

        return (
            <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        )
    }

    return { Context, Provider };
}


// export const { Context, Provider } = createDataContext(
// 	blogReducer,
// 	{ addBlogPost: addBlogPost },
// 	[]
// );