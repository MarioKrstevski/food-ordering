import styles from './Chart.module.css'
import React from 'react'
import { Pie } from 'react-chartjs-2'

const Chart = ({ choices }) => {
    const getLabels = objects => {
        const izbori = new Set()
        choices.forEach(choice => {
            izbori.add(choice.place)
        })
        const izboryArray = Array.from(izbori)
        return izboryArray
    }

    const getData = (labels, objects) => {
        const outputArray = []
        labels.forEach(label => {
            const labelArray = objects.filter(choice => choice.place === label)
            outputArray.push(labelArray.length)
        })

        return outputArray
    }
    const getColors = data => {
        const dolzina = data.length
        const colorChoices = [
            'red',
            'blue',
            'pink',
            'green',
            'purple',
            'organge',
            'yellow',
            'gray',
            'white',
        ]
        return colorChoices.splice(0, dolzina)
    }
    const labels = getLabels(choices)
    const data = getData(labels, choices)
    const colors = getColors(data)
    const pieData = {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: colors,
                hoverBackgroundColor: colors,
            },
        ],
    }
    return (
        <div id="piechart" className={styles.Piechart}>
            <h2>Pie Example</h2>
            <div className={styles.center}>
                {choices.length ? (
                    <Pie data={pieData} />
                ) : (
                    <div className>Seuste nema naracki</div>
                )}
            </div>

            <button className={styles.orderButton}>Create Order</button>
        </div>
    )
}

export default Chart
