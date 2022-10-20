import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';


const heroesAdapter = createEntityAdapter();                                //плучаем обьект адаптера c методавми в heroesAdapter

const initialState = heroesAdapter.getInitialState({                        //форм нач сост на основе адаптера 
    heroesLoadingStatus: 'idle',                                            //добавляем свее свойство в обект initialState
});

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
            heroesAdapter.addOne(state, action.payload);                   //используем метод адаптера(CRUD function)доб 1героя     
        },
        heroDeleted: (state, action) => {
            heroesAdapter.removeOne(state, action.payload)
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
                heroesAdapter.setAll(state, action.payload)                //с пом.метода адаптера записываю в state получ heroes
            })
            .addCase(fetchHeroes.rejected, state => {state.heroesLoadingStatus = 'error'})
            .addDefaultCase(() => {})                                      //если нет экшнкрейтерров ничего не меняем
    }
});

const {actions, reducer} = heroesSlice;                                    //деструктурируем полученные сущности

export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted,
} = actions;  
//получаем ф-ю селектор (Selector Functions) из адаптера и привязываем конкретно к state.heroes 
//selectAll-возвращает массив сущностей из state в том же порядке.)
export const { selectAll } = heroesAdapter.getSelectors(state => state.heroes)