// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';
import { createSelector } from '@reduxjs/toolkit';
import { heroDeleted, fetchHeroes, selectAll } from './heroesSlice';


const HeroesList = () => {

    const filteredHeroesSelector = createSelector(                       //получаем мемоизирование знач из разн кусочков state
        selectAll,                                                       //получаем массив героев,ф-я приним. арг. state автоматич
        state => state.filters.activeFilter,
        (heroes, filter) => {
            if(filter === 'all') {                                       //фильтрация по активному фильтру с мимоиз зн из state
                return heroes
            } else {
                return heroes.filter((item)=> item.element ===  filter)
            }
        }
    );

    const filteredHeroes = useSelector(filteredHeroesSelector);         

    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes())                                         //диспетчим ф-ю благодаря ReduxThunk в store

        // eslint-disable-next-line
    }, []);

    // Функция берет id и по нему удаляет ненужного персонажа из store
    // ТОЛЬКО если запрос на удаление прошел успешно
    // Отслеживайте цепочку действий actions => reducers
    const onDelete = useCallback((id) => {
        // Удаление персонажа по его id
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(data => console.log(data, 'Deleted'))
            .then(dispatch(heroDeleted(id)))
            .catch(err => console.log(err));
        // eslint-disable-next-line  
    }, [request]);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={500}
                    classNames="transition">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition 
                    key={id}
                    timeout={500}
                    classNames="transition">
                    <HeroesListItem  {...props} onDelete={() => onDelete(id)}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;