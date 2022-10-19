import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesFetching: (state) => {state.heroesLoadingStatus = 'loading'},         //не соблюдая имутабельности, гл без return
        heroesFetched: (state, action) => {                     
            state.heroesLoadingStatus = 'idle'; 
            state.heroes = action.payload;                                          //изменяем напрямую благодаря createSlice
        },
        heroesFetchingError: state => {
            state.heroesLoadingStatus = 'error'
        },
        heroCreated: (state, action) => {
            state.heroes.push(action.payload);                          
        },
        heroDeleted: (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        }
    }
});

const {actions, reducer} = heroesSlice;                                            //деструктурируем полученные сущности

export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted,
} = actions;                                                                       