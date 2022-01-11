import React, { useContext, useEffect } from 'react'
import { PageContainer } from '../../components/GlobalStyles/PageStyles'
import { GlobalContext } from '../../utils/Context'
import ProgressBar from './ProgressBar'
import CustomerInfo from './CustomerInfo'
import { useQuery } from '@apollo/client'
import { GET_ROOM } from '../../graphql/queries/roomQueries'
import {useParams, useLocation, Navigate} from 'react-router-dom'
import PaymentScreen from './PaymentScreen'
import BookingConfirmed from './BookingConfirmed'
import PageLoader from '../../components/Loaders/PageLoader'
import PageError from '../../components/Error/PageError'


const Payment = () => {

    const { setPage } = useContext(GlobalContext)

    useEffect(() => {
        setPage("Payment")
    }, [])

    const {hotelId, roomId, step} = useParams()
    const location = useLocation()

    const {data, loading, error} = useQuery(GET_ROOM, {variables: {id: roomId}})

    if(loading) return <PageLoader />
    if (error) return <PageError error={error} />

    if(!location.state) return <Navigate to="/"/>

    const user = JSON.parse(localStorage.getItem('user'))
    const room = data.getRoom
    const bookingData = location.state

    return (
        <PageContainer>
            <ProgressBar step={step}/>
            {step === '1' && (<CustomerInfo user={user} room={room} booking={bookingData}/>)}
            {step === '2' && (<PaymentScreen user={user} room={room} booking={bookingData}/>)}
            {step === '3' && (<BookingConfirmed user={user} room={room} booking={bookingData}/>)}
        </PageContainer>
    )
}

export default Payment
