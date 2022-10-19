import heroes from '../reducers/heroes';
import filters from '../reducers/filters';
import { configureStore } from '@reduxjs/toolkit';

const stringMiddleware = () => (next) => (action) => {
    if(typeof action === 'string') {
        return next ({
            type: action
        })    
    }
    return next(action)
}
// const store = createStore ( 
//                         combineReducers({heroes, filters}),                   //комбинируем redusers
//                         compose(applyMiddleware(ReduxThunk),                  //комбинируем ф-и (Middleware и REDUX_DEVTOOLS)     
//                             window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// )

const store = configureStore({
    reduser: {heroes, filters},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware)
})

export default store;