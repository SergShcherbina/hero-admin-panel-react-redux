import { filtersFetching, filtersFetched, filtersFetchingError } from "../components/heroesFilters/filtersSlice";
import { heroesFetched, heroesFetching, heroesFetchingError } from "../components/heroesList/heroesSlice";

export const fetchHeroes = (request) => (dispatch) => {                //формируем комплексный actionCreater 
    console.log();
    dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilters = (request) => (dispatch) => {               //при исп-ии ReduxThunk dispatch как арг прих автоматически
    dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))
}