import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',                                               //задается название нашего редюсера / необязательный метод
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),    //метод содержит ф-ю с запросом
    tadTypes: ['Heroes'],                                             //теги / метки   может быть несколько
    endpoints: builder => ({
        getHeroes: builder.query({                                    //запрос на получения данных
            query: () => '/heroes', 
            providesTags: ['Heroes'],                                 //к какому тегу относятся запрошенные данные
        }),
        createHero: builder.mutation({
            query: hero => ({                                         //hero приходит аргументом при вызове createHero в др компон
                url: '/heroes',
                method: 'POST',
                body: hero                                            //автоматически преобразуется в JSON формат
            }),
            invalidatesTags: ['Heroes'],                              //определяем по тегу в каких данных делать мутацию
        }), 
        deleteHero: builder.mutation({
            query: id => ({
                url: `/heroes/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Heroes'],
        })
    })
});

//генерируем хук: сразу use после название и далее действие
export const {useGetHeroesQuery, useCreateHeroMutation, useDeleteHeroMutation} = apiSlice