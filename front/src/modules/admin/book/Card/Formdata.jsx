import { useState } from "react"
import './style.css'
import AsyncSelect from 'react-select/async';
import { genreService } from "../../../../services/genre";

export const BookFormData = ({formData, onSave, onCancel, isCreate}) => {

    const [name, setName] = useState(formData?.name ?? '')
    const [desc, setDesc] = useState(formData?.desc ?? '')
    const [author, setAuthor] = useState(formData?.author ?? '')
    const [publishingHouse, setPublishingHouse] = useState(formData?.publishingHouse ?? '')
    const [series, setSeries] = useState(formData?.series ?? '')
    const [genre, setGenre] = useState(formData?.genre ?? null)
    const [isPublish, setIsPublish] = useState(formData?.isPublished ?? false)
    const [preview, setPreview] = useState(null)
    const [pdf, setPdf] = useState(null)

    const genreLoadOptions = async (inputValue) => {
        const res = await genreService.listSelect(1, 20)
        return res.rows.map(item => ({value: item.id, label: item.name}))
    }

    const onHandleSave = () => {
        onSave({name, desc, author, publishingHouse, series, genre, preview, pdf, isPublish})
    }

    return (
        <div className="Form">
            <label htmlFor="">Название:</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="">Описание:</label>
            <input value={desc} onChange={(e) => setDesc(e.target.value)} />
            <label htmlFor="">Автор:</label>
            <input value={author} onChange={(e) => setAuthor(e.target.value)} />
            <label htmlFor="">Издательство:</label>
            <input value={publishingHouse} onChange={(e) => setPublishingHouse(e.target.value)} />
            <label htmlFor="">Серия:</label>
            <input value={series} onChange={(e) => setSeries(e.target.value)} />
            <label htmlFor="">Жанр:</label>
            <AsyncSelect value={genre} onChange={setGenre} placeholder="Жанр:" loadOptions={genreLoadOptions} cacheOptions defaultOptions   />
            <br />
            <>
                <label htmlFor="">Превью:</label>
                <input onChange={(e) => setPreview(e.target.files[0])} type="file" />
                {preview && <p>Selected file: {preview.name}</p>}
                <label htmlFor="">ПДФ-файл книги:</label>
                <input onChange={(e) => setPdf(e.target.files[0])} type="file" />
                {pdf && <p>Selected file: {pdf.name}</p>}

            </>
            <label htmlFor="">Опубликован:</label>
            <input checked={isPublish} type="checkbox" onChange={(e) => setIsPublish(e.target.checked)} />
            <br />
            <button onClick={onHandleSave}>Сохранить</button>
            <button onClick={onCancel}>Отменить</button>
        </div>
    )
}