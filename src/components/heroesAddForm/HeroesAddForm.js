
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { heroAdd } from '../../actions';
import { v4 as uuidv4 } from 'uuid';                                            //библиотека случайных чисел
import { useHttp } from "../../hooks/http.hook";
import './heroesAddForm.scss'                                     
import { useEffect, useState } from "react";

const validate = values => {                                                    //созд ф-ю по валидации
    const errors = {};                                                       //обьект в который собираем ошибки 
    
    if (!/[а-яА-Я]/.test(values.name)) {
        errors.name = 'Веедите буквы!'
    } else if (!/[а-яА-Я]/.test(values.description)) {
        errors.description = 'Веедите буквы!'
    } else if (values.description.length < 10) {
        errors.description = 'Не менее 10 символов!'
    } 
    return errors                                                            //результат попадает в формик
}

const HeroesAddForm = () => {
    const {heroes} = useSelector(store => store);
    const dispatch = useDispatch();
    const {request} = useHttp();
    const [options, setOptions] = useState([]);

    useEffect(()=> {                                                               //получаем options из сервера 
        request("http://localhost:3001/filters/")
        .then(data=> setOptions(data))
    }, [])

    const onHeroAdd = (hero) => {
        let newHero = {...hero, id: uuidv4()}                                      //добавляем в героя уникальный id
        dispatch(heroAdd([...heroes, newHero]))                                    //диспетчим копию массива и доб. в него героя
        request("http://localhost:3001/heroes/", "POST", JSON.stringify(newHero))  //отправка посл героя на сервер
    }

    let listOptoions;
    if(options.length >= 1) {                                                      //пока массив пустой, действий не выполняем
        listOptoions = Object.entries(options[0])
        .map((item, i )=>  <option key={i} value={item[0]}>{item[1]}</option>)    
    }
    
    return (
        <Formik
            initialValues = {{                
                "name": "",
                "description": "",
                "element": ""
            }}
            validate = {validate} 
            onSubmit={(values, {resetForm}) => {                               //{resetForm}-аргумент для сброса прих из Context
                onHeroAdd(values);
                resetForm();                                                   //сброс формы после отправки
            }}           
            >
            <Form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field 
                        required
                        type="text" 
                        name="name" 
                        className="form-control" 
                        id="name" 
                        placeholder="Как меня зовут?"/>
                    <ErrorMessage name='name' component="div" className='validate text-danger' /> 
                </div>

                <div className="mb-3">
                    <label htmlFor="text" className="form-label fs-4">Описание</label>
                    <Field
                        as='textarea'                                            //вставляем Field вместо textarea
                        required
                        name="description" 
                        className="form-control" 
                        id="text" 
                        placeholder="Что я умею?"
                        style={{"height": '130px'}}/>
                    <ErrorMessage name='description' component="div" className='validate text-danger' />
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field 
                        as='select'                                              //вставляем Field вместо select  
                        required
                        className="form-select" 
                        id="element" 
                        name="element">
                        {listOptoions}
                        {/* <option >Я владею элементом...</option>
                        <option value="fire">Огонь</option>
                        <option value="water">Вода</option>
                        <option value="wind">Ветер</option>
                        <option value="earth">Земля</option> */}
                    </Field>
                    <ErrorMessage name='element' component="div" className='validate text-danger' />
                </div>

                <button type="submit" className="btn btn-primary">Создать</button>
            </Form>
        </Formik>
    )
};

export default HeroesAddForm;