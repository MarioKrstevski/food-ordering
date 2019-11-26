import styles from './Dashboard.module.css'
import React, { useState, useContext } from 'react'
import Orders from '../Orders/Orders'
import Chart from '../Chart/Chart'
import Places from '../Places/Places'

import choicesRepo from '../../repository/choices'
import placesRepo from '../../repository/places'
import ordersRepo from '../../repository/orders'
import AuthContext from '../../context/AuthContext'

import { useGet, useMutate } from 'restful-react'

const Dashboard = () => {
    const [choices, setChoices] = useState(choicesRepo)
    const [places, setPlaces] = useState(placesRepo)
    const [orders, setOrders] = useState(ordersRepo)

    const { data, error, loading } = useGet({ path: 'test' })

    const { mutate: upsertOrder } = useMutate({
        verb: 'POST',
        path: 'posts',
    })

    console.log(data)

    const { user } = useContext(AuthContext)

    // const upsertOrder = id => {}
    const cancelOrder = place => {}

    const makeSelection = id => {
        const idObject = places.find(place => place._id === id)
        const removed = choices.filter(choice => choice.name !== user.name)
        setChoices([
            ...removed,
            {
                name: user.name,
                place: idObject.name,
            },
        ])
    }

    return (
        <div className="App-body ">
            {error && <div>Error detected {error.message}</div>}
            {loading && <div>Data is loading </div>}
            {data && (
                <>
                    <Places places={places} makeSelection={makeSelection} />
                    <Chart choices={choices} />
                    <Orders
                        cancelOrder={cancelOrder}
                        orders={orders}
                        upsertOrder={upsertOrder}
                    />
                </>
            )}
        </div>
    )
}

export default Dashboard
