import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import {
  useUser
} from './UserContext'
import Container from 'react-bootstrap/Container'
import { Card } from 'react-bootstrap'

export default function Home() {
  const user = useUser()
  const [assets, setAssets] = useState([])
  const fetchData = useCallback(async () => {
    // fetch data
    const dataAll = await Promise.all(user?.assets?.map?.(async ({ ticker, cost, share, type }) => {
      const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2020-10-21/2020-10-22?apiKey=${process.env.REACT_APP_API_KEY}`
      const { data } = await axios({
        method: 'get',
        url
      })
      return {
        ticker,
        cost,
        avgCost: cost / share,
        share,
        type,
        prices: data.results.map(val => val.c)
      }
    }) ?? [])
    setAssets(dataAll)
  }, [user])

  useEffect(() => {
    fetchData()
  }, [user])

  return (
    <Container className="mt-4">
      { assets.map(asset => {
        const value = asset.prices[0]
        const bg = value > asset.avgCost ? 'success' : 'danger'
        return (
          <Card
            bg={bg}
            key={asset.ticker}
            text='light'
            className="mb-2"
          >
            <Card.Body className="px-2 d-flex justify-content-between">
              <Card.Title>{ asset.ticker }</Card.Title>
              <Card.Text>
                Average Cost: ${ asset.avgCost }
              </Card.Text>
              <Card.Text>
                Value: ${ value }
              </Card.Text>
            </Card.Body>
          </Card>
        )
      }) }
    </Container>
  )
}