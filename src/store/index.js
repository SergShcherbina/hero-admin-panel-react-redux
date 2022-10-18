import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import ReduxThunk from 'redux-thunk'                                //библиотека которая позволяет диспетчить не объекты а функции
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

const store = createStore ( 
                        combineReducers({heroes, filters}),                   //комбинируем redusers
                        compose(applyMiddleware(ReduxThunk),                  //комбинируем ф-и (Middleware и REDUX_DEVTOOLS)     
                            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

export default store;