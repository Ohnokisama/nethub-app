import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import requests from '../Request'

function Home() {
  return (
    <>
      <Main />
      <Row rowID='1' title='Upcoming' fetchURL={requests.requestUpcoming} />
      <Row rowID='2' title='Now Playing' fetchURL={requests.requestNowPlaying} />
      <Row rowID='3' title='Popular' fetchURL={requests.requestPopular} />
      <Row rowID='4' title='Top Rated' fetchURL={requests.requestRated} />
    </>
  )
}

export default Home