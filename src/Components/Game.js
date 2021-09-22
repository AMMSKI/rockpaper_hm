import React from "react";
import { Container } from "react-bootstrap";
import Player from "./Player";

const Game = () => {

  return ( 
    <div>
      <h1>Game</h1>
      <Container>
        <Player />
      </Container>
    </div>
  )
}

export default Game