import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError, heroRemove } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './heroList.scss'

const HeroesList = () => {
    const {heroes, heroesLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();
    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const onHeroRemove = (id) => {                                              //удаление героя по клику
        dispatch(heroRemove(heroes, id))
        request(`http://localhost:3001/heroes/${id}`, "DELETE")                 //удаление из бызы данных
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <CSSTransition key={id} timeout={500} classNames="transition"> 
                        <HeroesListItem key={id} {...props} onHeroRemove={()=> onHeroRemove(id)}/>
                    </CSSTransition>
        })
    }

    const elements = renderHeroesList(heroes);
    return (
        <ul>
            <TransitionGroup component={null}> 
                {elements}
            </TransitionGroup>
        </ul>
    )
}

export default HeroesList;