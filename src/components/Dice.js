import React from "react"

export default function Dice(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : ""
  }

  return (
    <div className="dice" style={styles} onClick={props.clickHandle}>
      <h2 className="dice--num">{props.value}</h2>
    </div>
  )
}