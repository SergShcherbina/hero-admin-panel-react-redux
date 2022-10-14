
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useSelector, useDispatch } from "react-redux";
import { heroesFilter, heroesFetched } from "../../actions";
import { useHttp } from "../../hooks/http.hook";
import { useEffect, useState } from "react";

const HeroesFilters = () => {

    const {heroes} = useSelector(store => store);
    const dispatch = useDispatch();
    const {request} = useHttp();
    const [dataHeroes, setDataHerois] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(()=> {
        request("http://localhost:3001/heroes/")
        .then(data=> setDataHerois(data))
    },[heroes])

    useEffect(()=> {
        request("http://localhost:3001/filters/")
        .then(data=> setOptions(data))
    },[])
    
    let listOptoions;
    if(options.length >= 1) {                                                      //пока массив пустой, действий не выполняем
        listOptoions = Object.entries(options[0])
        .map((item, i)=> {
        
        let elementClassName;                                                     //динамическое формирование класса

        switch (item[0]) {
            case 'fire':
                elementClassName = 'btn-danger';
                break;
            case 'water':
                elementClassName = 'btn-primary';
                break;
            case 'wind':
                elementClassName = 'btn-success';
                break;
            case 'earth':
                elementClassName = 'btn-secondary';
                break;
            default:
                elementClassName = 'btn-outline-dark';
        }

    return <button onClick={()=>onHeroesFilter(item[0])} className={`btn ${elementClassName} active`} key={i}>
            {item[1]}
            </button>    
    })}

    const onHeroesFilter = (arg) => {                                              //фильтруем героев по совпадени element
        const res  = arg === 'all'? dataHeroes: dataHeroes.filter(item => item.element === arg) 
        dispatch(heroesFilter(res))
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {listOptoions}                    
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;