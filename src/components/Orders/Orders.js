import React, { useState, useContext } from 'react'
import styles from './Orders.module.css'

import { Accordion, AccordionTab } from 'primereact/accordion'
import AuthContext from '../../context/AuthContext';

function OrderWindow({ place, upsertOrderr, naracki }) {
    const [inputValue, setInputValue] = useState('')
    const [narackii, setNarackii] = useState(naracki)
    const { user } = useContext(AuthContext)

    const upsertOrder = () => {
        const narackaObject = narackii.find(naracka => naracka.ime === user.name)
        const removed = narackii.filter(naracka => naracka.ime !== user.name)
        setNarackii([
            ...removed,
            {
                ime: user.name,
                content: inputValue,
            },
        ])
        setInputValue('')
    }

    const narackiList = narackii.map(naracka => {
        return (
            <div key={naracka.ime}>
                {naracka.ime}: {naracka.content}
            </div>
        )
    })
    return (
        <div header={place} className={styles.orderWindow}>
            <div className={styles.chat}>{narackiList}</div>
            <div className={styles.input}>
                <input
                    name="input"
                    value={inputValue}
                    placeholder="Your order here"
                    onChange={event => setInputValue(event.target.value)}
                    className={styles.orderInput}
                    onKeyDown={(e)=>{
                        if(e.key === "Enter"){
                          upsertOrder()
                        }
                    }}
                />
                <button className={styles.orderButton} onClick={upsertOrder}>
                    Order
                </button>
            </div>
        </div>
    )
}

const Orders = ({ orders, upsertOrder, cancelOrder }) => {
    const ordersList = orders.map(order => (
        <AccordionTab
            header={
                <div>
                    {order.place}
                    <div
                        style={{
                            marginLeft: '220px',
                            padding: 0,
                            display: 'inline-block',
                        }}
                    >
                        <span
                            onClick={() => cancelOrder(order.place)}
                            style={{
                                transform: 'rotate(45deg)',
                                display: 'inline-block',
                                width: 13,
                                height: 13,
                                fontSize: 16,
                                textAlign: 'center',
                            }}
                        >
                            +
                        </span>
                    </div>
                </div>
            }
            key={order.place}
            place={order.place}
        >
            <OrderWindow naracki={order.naracki} upsertOrder={upsertOrder} />
        </AccordionTab>
    ))
    return (
        <div id="orders">
            {orders.length ? (
                <Accordion className={styles.orderList}>{ordersList}</Accordion>
            ) : (
                <div className={styles.center}> Nema Naracki </div>
            )}
        </div>
    )
}

export default Orders
