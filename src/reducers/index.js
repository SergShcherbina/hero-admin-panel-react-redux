const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',                                // статус загрузки idle -бездействие
    filters: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HEROES_REMOVE': 
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HERO_ADD':                                  
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FILTER':                                  
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }        
        default: return state
    }
}

export default reducer;