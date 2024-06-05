import { useEffect, useReducer, useState } from "react"
import { userService } from "../services/user"
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  import { Main } from '../pages/main';
import { GenreId } from "../pages/genreId";
import { Genre } from "../pages/genre";
import { Wrapper } from "./layouts/Wrapper";
import { BookById } from "../pages/bookId";
import { ProfilePage } from "../pages/profile";
import { BookReaderById } from "../pages/bookReader";
import { AuthWrap } from "../pages/AuthWrap";
import { PopularPage } from "../pages/popular";
import { AboutUsPage } from "../pages/aboutUs";
import { AdminBooksPage } from "../pages/adminBooks";
import { AdminBookPage } from "../pages/adminBook";
import { Admin } from "../pages/admin";
import { AdminGenresPage } from "../pages/adminGenres";
import { AdminGenre } from "../pages/adminGenre";
import { UnpublishPage } from "../pages/unPublish";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/genre/:id",
      element: <GenreId />,
    },
    {
      path: "/genre/",
      element: <Genre />,
    },
    {
      path: "/book/:id",
      element: <BookById />,
    },
    {
      path: "/book-reader/:id",
      element: <BookReaderById />,
    },
    {
      path: "/profile/",
      element: <ProfilePage />,
    },
    {
      path: "/popular/",
      element: <PopularPage />,
    },
    {
      path: "/about/",
      element: <AboutUsPage />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "/admin/book",
      element: <AdminBooksPage />,
    },
    {
      path: "/unpublish",
      element: <UnpublishPage />,
    },
    {
      path: "/admin/genre",
      element: <AdminGenresPage />,
    },
    {
      path: "/admin/book/:id",
      element: <AdminBookPage />,
    },
    {
      path: "/admin/genre/:id",
      element: <AdminGenre />,
    },
    {
      path: "*",
      element: <Wrapper enableHeader><div>Not found</div></Wrapper>
    }
  ]);
  
  
export const Auth = () => {
    const [isAuth, toggleIsAuth] = useReducer((prev) => !prev, false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      userService
        .auth()
        .then((data) => {
          if(data && data.token){
            localStorage.setItem('token',data.token)
            userService.getMe()
            toggleIsAuth()
            return
          }
        })
        .finally(() => setIsLoading())
    }, [])

    if(isLoading){
      return <h2>Загрузка...</h2>
    }

    return (
      isAuth ? <RouterProvider router={router} /> : <AuthWrap />
    )
}