import { createReducer } from "@reduxjs/toolkit"
import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted
    } from '../actions'

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroes = createReducer(initialState, builder => {
    builder
        .addCase(heroesFetching, state => {                              //обязательно соблюдать синтаксис, ф-я не долж ретернить
            state.heroesLoadingStatus = 'loading';                       //либо следить за иммутабельностью state
        })
        .addCase(heroesFetched, (state, action) => {                     
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;                               //изменяем напрямую благодаря createReduser
        })
        .addCase(heroesFetchingError, state => {
            state.heroesLoadingStatus = 'error'
        })
        .addCase(heroCreated, (state, action) => {
            state.heroes.push(action.payload);                          //так как не нужно соблюдать иммутабельность, просто пушим 
        })
        .addCase(heroDeleted, (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        })
        .addDefaultCase(() => {})                                       //если нет совпадений по actionCreaters выз пуст ф-ю
})

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'HERO_CREATED':
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload]
//             }
//         case 'HERO_DELETED': 
//             return {
//                 ...state,
//                 heroes: state.heroes.filter(item => item.id !== action.payload),
//             }
//         default: return state
//     }
// }

export default heroes;