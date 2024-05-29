import { Footer } from "../footer"
import { Header } from "../header/Header"

export const Wrapper = ({children, enableHeader, className, disableMargin}) => {
    return (
        <>
            {enableHeader && <Header disableMargin={disableMargin} />}
            <section className={`wrapper ${className}`}>
                {children}
            </section> 
            {enableHeader && <Footer />}
        </>
    )
}