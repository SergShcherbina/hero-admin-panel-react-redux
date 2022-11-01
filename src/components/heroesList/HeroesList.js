// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice'

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import './heroesList.scss';


const HeroesList = () => {

    const {
        data: heroes = [],
        isLoading,
        isError,
    } = useGetHeroesQuery();                                               //получаем данные нашего хука из apiSlice

    const [deleteHero] = useDeleteHeroMutation();

    const activeFilter = useSelector(state => state.filters.activeFilter)

    const filteredHeroes = useMemo(() => {
        const filteredHeroes = heroes.slice();                             //создаем копию массива чтобы не мутировать оригинал
        
        if(activeFilter === 'all') {                                       //фильтрация по активному фильтру с мимоиз зн из state
            return filteredHeroes
        } else {
            return filteredHeroes.filter((item)=> item.element ===  activeFilter)
        }
    }, [heroes, activeFilter])

    const onDelete = useCallback((id) => {
        deleteHero(id)
        // eslint-disable-next-line
    }, []);

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
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