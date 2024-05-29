import { useNavigate } from "react-router-dom"
import { Wrapper } from "../../components/layouts/Wrapper"
import { pages } from "./const"
import './styles.css'

export const AdminPanel = () => {

    const navigate = useNavigate()

    return (
        <Wrapper enableHeader>
            <div className="admin container">
                {pages.map(page =>
                    <div key={page.id} onClick={() => navigate(page.path)} className="card">
                        <span>{page.title}</span>
                        <p>{page.desc}</p>
                        <button className="btn">Открыть</button>
                    </div>
                )}
            </div>
        </Wrapper>
    )
}