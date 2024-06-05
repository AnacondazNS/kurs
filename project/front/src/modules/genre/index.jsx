import useSWR from 'swr'
import './style.css'
import { useEffect, useState } from 'react'
import { genreService } from '../../services/genre'
import { GenreCard } from './components/Card'

export const Genre = () => {
    
    const [page] = useState(1)

    const {data, isLoading, error} = useSWR(page, genreService.list)

    useEffect(() => {
        if(!isLoading && error){
            console.error(error)
        }
    }, [isLoading, error])

    if(isLoading){
        return null
    }

    return (
        <div className='genre-container'>
            <h2>Поджранры:</h2>
            <div>
                {data?.rows?.map(item =>
                    <GenreCard key={item.id} {...item} />
                )}
            </div>
        </div>
    )
}