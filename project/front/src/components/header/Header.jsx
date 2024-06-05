import { useNavigate } from 'react-router-dom'
import './style.css'
import { useEffect, useState } from 'react'
import { bookService } from '../../services/book'
import useDebounce from '../../utils/useDebounce'

export const Header = ({disableMargin}) => {

    const navigate = useNavigate()

    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const value = useDebounce(search, 500)

    useEffect(() => {
        if(value){
            bookService.search(value).then(setData)
        }else{
            setData([])
        }
    }, [value])
    
    return (
        <div className={`container-header ${disableMargin && 'disable-margin'}`}>
            <header>
                <span onClick={() => navigate('/')}>Главная</span>
                <span onClick={() => navigate('/genre')}>Поджанры</span>
                <span onClick={() => navigate('/popular')}>Популярное</span>
                <h2 className='logo-text'>Фантастика</h2>
                <span onClick={() => navigate('/unpublish')}>Скоро выйдет</span>
                <span onClick={() => navigate('/about')}>О нас</span>
                <span onClick={() => navigate('/profile')}>Профиль</span>
            </header>
            <div className='search'>
                <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} placeholder='Поиск' />
            </div>
            <div className='search-result'>
                {data.map(item =>
                    <div key={item.id}>
                        {`${item.type === 'genre' ? 'Жанр': 'Книга'}:${item.name}`}
                        <button className='btn' onClick={() => navigate(`/${item.type === "genre" ? 'genre' : 'book'}/${item.id}`)}>Перейти</button>
                    </div>
                )}
            </div>
        </div>
    )
}
