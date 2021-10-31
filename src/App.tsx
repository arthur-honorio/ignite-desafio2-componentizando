import { useEffect, useState } from "react"

import { SideBar } from "./components/SideBar"
import { Content } from "./components/Content"

import { api } from "./services/api"

import "./styles/global.scss"
interface GenreResponse {
    id: number
    name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family"
    title: string
}
interface Movie {
    imdbID: string
    Title: string
    Poster: string
    Ratings: Array<{
        Source: string
        Value: string
    }>
    Runtime: string
}

export function App() {
    const [selectedGenreId, setSelectedGenreId] = useState(1)
    const [genres, setGenres] = useState<GenreResponse[]>([])
    const [movies, setMovies] = useState<Movie[]>([])
    const [selectedGenre, setSelectedGenre] = useState<GenreResponse>(
        {} as GenreResponse
    )

    useEffect(() => {
        api.get<GenreResponse[]>("genres").then(response => {
            setGenres(response.data)
        })
    }, [])

    useEffect(() => {
        api.get<Movie[]>(`movies/?Genre_id=${selectedGenreId}`).then(
            response => {
                setMovies(response.data)
            }
        )

        api.get<GenreResponse>(`genres/${selectedGenreId}`).then(response => {
            setSelectedGenre(response.data)
        })
    }, [selectedGenreId])

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <Content movies={movies} selectedGenre={selectedGenre} />
            <SideBar
                genres={genres}
                selectedGenreId={selectedGenreId}
                setSelectedGenreId={setSelectedGenreId}
            />
        </div>
    )
}
