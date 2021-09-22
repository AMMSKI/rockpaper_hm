import Button from "@restart/ui/esm/Button";
import React, { useReducer, useState } from "react";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import styled from "styled-components";

const Player = () => {
  const [win, setWin]= useState(0)
  const [loss, setLoss]= useState(0)
  const [tie, setTie]= useState(0)

  const playReducer = (state , action) => {
    switch(action.type){
      case "ROCK":
        return 'rock'
      case "PAPER":
        return 'paper'
      case "SCISSOR":
        return 'scissor'
      case "RESET":
        return ''
      default:
        return state
    }
  }
  const CPUplayReducer = (state , action) => {
    switch(action.type){
      case "ROCK":
        return 'rock'
      case "PAPER":
        return 'paper'
      case "SCISSOR":
        return 'scissor'
      case "RESET":
        return ''
      default:
        return state
    }
  }

  const [play, dispatch] = useReducer(playReducer, '')
  const [CPUplay, CPUdispatch] = useReducer(CPUplayReducer, '')

  const renderCPUPlay = () => {
    const randomNum = () => {
      return Math.floor(Math.random() * 3)
    }
    if(randomNum() === 0){
      return "ROCK"
    }else if(randomNum() === 2){
      return "SCISSOR"
    }else{
      return "PAPER"
    }
  }

  const renderScore = () => {
    return (
      <div>
        <h1>Wins:{win}</h1>
        <h1>Losses:{loss}</h1>
        <h1>Ties:{tie}</h1>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(play)
    console.log(CPUplay)

    if(play === CPUplay){
      setTie(tie + 1)
    }
    if(play === 'scissor'){
      if(CPUplay === 'rock'){
        setLoss(loss + 1)
      }else if(CPUplay === 'paper'){
        setWin(win + 1)
      }
    }else if(play === 'rock'){
      if(CPUplay === 'paper'){
        setLoss(loss + 1)
      }else if(CPUplay === 'scissor'){
        setWin(win + 1)
      }
    } else if(play === 'paper'){
      if(CPUplay === 'rock'){
        setWin(win + 1)
      }else if(CPUplay === 'scissor'){
        setLoss(loss + 1)
      }
    }
    dispatch({type: 'RESET'})
    CPUdispatch({type: 'RESET'})
  }
  
  return ( 
    <Form onSubmit={handleSubmit}>
        <div onClick={()=> CPUdispatch({type: renderCPUPlay()})}>
          <h1>Player</h1>
          <Button onClick={()=> dispatch({type: "ROCK"})}>Rock</Button>
          <Button onClick={()=> dispatch({type: "PAPER"})}>Paper</Button>
          <Button onClick={()=> dispatch({type: "SCISSOR"})}>Scissors</Button>
          {play && <h1>Player Choice: ---- {play} ----</h1>}
        </div>
      <h1>Cpu</h1>
        {CPUplay && <h1>Computer Choice:---- {CPUplay} ----</h1>}
      <MyContainer>
      <div>
        <Button type={'submit'}>Save Score</Button>
      </div>
      <div>
        {renderScore()}
      </div>
      </MyContainer>
    </Form>
  )
}

const MyContainer = styled(Container)`
  text-align: center;
`

export default Player