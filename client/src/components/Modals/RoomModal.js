import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ADD_ROOM } from '../../graphql/mutations/roomMutations'
import { FormButton, Input, TextArea } from '../GlobalStyles/FormStyles'
import { ModalBox, ModalContainer, ModalTitle, RoomSelectionBox } from '../GlobalStyles/ModalStyles'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';
import "./animation.css"
import { GET_HOTEL } from '../../graphql/queries/hotelQueries'

const RoomModal = (props) => {

    const [addRoom] = useMutation(ADD_ROOM, {
        refetchQueries: [
            GET_HOTEL,
            { variables: { id: props.hotel.id } }
        ],
    })

    const [hide, setHide] = useState(false)

    const [room, setRoom] = useState({
        name: '',
        description: '',
        hotel: props.hotel.id,
        images: [],
        others: [],
        occupancy: null,
        price: null,
        roomNumbers: []
    })

    const addNewRoom = (e) => {
        e.preventDefault()
        addRoom({
            variables: {
                name: room.name,
                description: room.description,
                hotel: room.hotel,
                images: room.images,
                others: room.others,
                occupancy: room.occupancy,
                price: room.price,
                roomNumbers: room.roomNumbers
            }
        })
            .then(res => {
                toast.success("New room added", {
                    autoClose: 5500,
                    pauseOnHover: true,
                    onClose: props.setRoomModal(false)
                })
                setHide(true)
            })
            .catch(err => {
                toast.error(err, {
                    autoClose: 5500,
                    pauseOnHover: true
                })
            })
    }

    const roomSlots = Array.from({ length: props.hotel.totalRooms }, (x, i) => {
        const s = {
            number: i + 1,
            assigned: props.hotel.roomsMap[`${i + 1}`]
        }
        return s
    })

    const addNumber = (n, assigned) => {
        if (room.roomNumbers.includes(n) && !assigned) {
            let ns = room.roomNumbers.filter(s => s !== n)
            setRoom({ ...room, roomNumbers: ns })
        }
        else if (!assigned) {
            let ns = room.roomNumbers
            ns.push(n)
            setRoom({ ...room, roomNumbers: ns })
        }
        else return
    }


    return (
        <ModalContainer>
            <ModalBox className="modal-box">
                <CloseIcon className="close-icon" onClick={() => props.setRoomModal(false)} />
                <ToastContainer />
                <ModalTitle>{props.title}</ModalTitle>
                <form onSubmit={addNewRoom}>
                    <Input required="true" style={{ marginBottom: '16px' }}
                        value={room.name} onChange={(e) => setRoom({ ...room, name: e.target.value })}
                        placeholder="Room name">
                    </Input>

                    <TextArea required="true" style={{ marginBottom: '16px' }}
                        value={room.description} onChange={(e) => setRoom({ ...room, description: e.target.value })}
                        placeholder="Room description"></TextArea>

                    <Input required="true" style={{ marginBottom: '16px' }}
                        type="number"
                        value={room.occupancy} onChange={(e) => setRoom({ ...room, occupancy: Number(e.target.value) })}
                        placeholder="Occupancy"></Input>

                    <TextArea required="true" style={{ marginBottom: '16px' }}
                        value={room.others}
                        onChange={(e) => setRoom({ ...room, others: e.target.value.split(',') })}
                        placeholder="Room specifications (Add using ',')"></TextArea>

                    <Input required="true" style={{ marginBottom: '16px' }}
                        type="number"
                        value={room.price} onChange={(e) => setRoom({ ...room, price: Number(e.target.value) })}
                        placeholder="Price"></Input>

                    <RoomSelectionBox>
                        {roomSlots.map(t => (
                            <div className={`${t.assigned ? 'assigned' :
                                room.roomNumbers.includes(t.number) ? 'selected' : ''}`}
                                onClick={() => addNumber(t.number, t.assigned)}
                            >{t.number}</div>
                        ))}
                    </RoomSelectionBox>

                    {!hide && (
                        <FormButton type="submit"
                            style={{ marginLeft: 'auto', marginTop: '40px' }}>
                            {props.title}
                        </FormButton>
                    )}
                </form>
            </ModalBox>
        </ModalContainer>
    )
}

export default RoomModal
