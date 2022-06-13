import React from "react"
import Dice from "./components/Dice"
import {nanoid} from "nanoid"

import Confetti from "react-confetti"

export default function App() {

  const [dies, setDies] = React.useState(initializeDies())
  const [tenzies, setTenzies] = React.useState(false);


  React.useEffect(() => {
     const val = dies[0].value
     if (dies.filter(die => die.value === val && die.isHeld === true).length === dies.length) {
        setTenzies(true)
        console.log("w")
      }
      // const allHeld = dice.every(die => die.isHeld)
      // const firstValue = dice[0].value
      // const allSameValue = dice.every(die => die.value === firstValue)
      // if (allHeld && allSameValue) {
      //     setTenzies(true)
      //     console.log("You won!")
      
      }, [dies])
  
  

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6), 
        isHeld: false,
        id: nanoid()
    }
  }

  function initializeDies() {
    const arr = []
    let numOfDie = 10;
    while (numOfDie--) {
      arr.push(generateNewDie())
    }
  
    return arr
  }
  
  function roll() {
    if (tenzies) {
      setDies(initializeDies())
      setTenzies(false)
    } else {
      setDies(prevDies => prevDies.map(die => {
        return die.isHeld ? die : generateNewDie()
      }));
    }
    
  }

  function holdDice( id) {
    setDies(prevDies => prevDies.map(die => {
        return die.id===id ?
          {...die, isHeld: !die.isHeld} :
          die
      }))

  }




  const dieElements = dies.map((die, i) => (
    <Dice key={die.id} value={die.value} isHeld={die.isHeld} clickHandle={() => holdDice(die.id)}/>
  ))

  return(
    <main className="container">
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="container--dice" >
        {dieElements}
      </div>
      <button className="btn--roll" onClick={roll} >{tenzies ? "New Game" : "Roll"}</button>
      {tenzies && <Confetti />}
    </main>
  )
}