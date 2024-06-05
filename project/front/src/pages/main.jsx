import { Suspense } from "react"
import { Wrapper } from "../components/layouts/Wrapper"
import { Genre } from "../modules/genre"
import { Background } from "../modules/main/Background"
import { PopularBooks } from "../modules/popular"
import { UnpublishedList } from "../modules/unpublished"

export const Main = () => {
    return (
        <Wrapper disableMargin enableHeader>
            <Background />
            <Suspense><Genre /></Suspense>
            <Suspense><PopularBooks /></Suspense>
            <Suspense><UnpublishedList /> </Suspense>
        </Wrapper>
    )
}   