import { useState } from "react"

export const FormData = ({formData, isCreate, onSave, onCancel}) => {

    const [name, setName] = useState(formData?.name ?? '')
    const [desc, setDesc] = useState(formData?.desc ?? '')
    const [preview, setPreview] = useState(null)

    const onHandleSave = () => {
        onSave({name, desc, preview})
    }

    return(
        <div className="Form">
            <label htmlFor="">Название:</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="">Описание:</label>
            <input value={desc} onChange={(e) => setDesc(e.target.value)} />
            <br />
            {isCreate &&
                <>
                    <label htmlFor="">Превью:</label>
                    <input onChange={(e) => setPreview(e.target.files[0])} type="file" />
                    {preview && <p>Selected file: {preview.name}</p>}
                </>
            }
            <br />
            <button onClick={onHandleSave}>Сохранить</button>
            <button onClick={onCancel}>Отменить</button>
        </div>
    )
}