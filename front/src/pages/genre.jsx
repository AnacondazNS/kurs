import { Wrapper } from '../components/layouts/Wrapper'
import {Genre as GenreBlock} from '../modules/genre'

export const Genre = () => {
    return (
        <Wrapper enableHeader> 
            <GenreBlock />
        </Wrapper>
    )
}