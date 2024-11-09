import { createContext, useReducer } from "react";

const createDataContext = (reducer: any, actions: any, initialState: any) => {
    const Context = createContext(initialState);

    const Provider = ({ children }: any) => {
        const [state, dispatch] = useReducer(reducer, initialState);

        const boundActions: any = {};
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch);
        }

        return (
            <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        );
    };

    return { Context, Provider };
}

export default createDataContext;