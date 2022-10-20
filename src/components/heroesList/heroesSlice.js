import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';


const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

export const fetchHeroes = createAsyncThunk(                                //принимает 2 аргумента ('type', payloadCreator())
    'heroes/fetchHeroes',                                                   //"имя среза к котор относится/тип действия"
    async () => {                                                           //функция с асинхронным запросом 
        const {request} = useHttp();
        return await request("http://localhost:3001/heroes")                //возврaщаем промис с сост(pending,fulfilled,rejected)
    }
);

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroCreated: (state, action) => {
            state.heroes.push(action.payload);                          
        },
        heroDeleted: (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder 
            //из fetchHeroes получаем промис с тремя состояниямиб(экшнкрейтерами) далее обрабатываем их
            .addCase(fetchHeroes.pending, (state) => {
                state.heroesLoadingStatus = 'loading';
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle'; 
                state.heroes = action.payload;                              //мутируем напрямую благодаря createSlice
            })
            .addCase(fetchHeroes.rejected, state => {state.heroesLoadingStatus = 'error'})
            .addDefaultCase(() => {})                                       //если нет экшнкрейтерров ничего не меняем
    }
});

const {actions, reducer} = heroesSlice;                                     //деструктурируем полученные сущности

export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted,
} = actions;                                                                       