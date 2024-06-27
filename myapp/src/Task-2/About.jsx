import React from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
function About() {
  const { id } = useParams()
  const obj = useOutletContext()
  return (
    <>
    <h1>Item {id}</h1>
    <p>{obj.hello}</p>
    </>
  )
}

export default About
