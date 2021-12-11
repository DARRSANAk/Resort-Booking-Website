import React, { useState } from 'react'
import styled from 'styled-components'
import Loader from '../../components/Loaders/Loader'
import SearchBar from '../../components/SearchBar/SearchBar'
import ListHeader from './ListHeader'
import ListItem from "./ListItem"

const Container = styled.div`
    margin-top: 20px;

`

const RoomsList = (props) => {
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const listItems = ['Image', 'Room Name', 'Description', "Price", 'Occupancy', 'Ratings', 'Added On', 'Actions']

    return (
        <Container>
            <SearchBar
                query={query}
                setQuery={setQuery}
                placeholder="Search rooms by names..." />

            <ListHeader list={listItems} />
            {!loading ? props.rooms.map(room =>
                <ListItem key={room.id} data={room}
                    setRoomModal={props.setRoomModal}
                    setLoading={setLoading} />)
                : <Loader />}
        </Container>
    )
}

export default RoomsList
