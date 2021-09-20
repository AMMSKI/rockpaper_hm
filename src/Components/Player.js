import Button from "@restart/ui/esm/Button";
import React, { useReducer, useState } from "react";
import { Form } from "react-bootstrap";

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
    const arr = ["ROCK", "PAPER", "SCISSOR"]
    const randomNum = () => {
      return Math.floor(Math.random() * 4)
    }
    if(randomNum() === 3){
      return "ROCK"
    }else if(randomNum() === 2){
      return "SCISSOR"
    }else if(randomNum() === 1){
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
      <div>
        <h1>Player</h1>
        <Button onClick={()=> dispatch({type: "ROCK"})}>Rock</Button>
        <Button onClick={()=> dispatch({type: "PAPER"})}>Paper</Button>
        <Button onClick={()=> dispatch({type: "SCISSOR"})}>Scissors</Button>
        {play && <h1>{play}</h1>}
      </div>
      <div>
      <h1>Cpu</h1>
        {play && <Button onClick={()=> CPUdispatch({type: renderCPUPlay()})}>CPU Play</Button>}
        {CPUplay && <h1>{CPUplay}</h1>}
      </div>
      <div>
        <Button type={'submit'}>Submit</Button>
      </div>
      <div>
        {renderScore()}
      </div>
    </Form>
  )
}

export default Player