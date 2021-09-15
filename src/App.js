import { Button, Typography } from "@material-ui/core";
import React from "react";
import "./App.css";
import { makeBoard, overAllCheck, drawCheck } from "./Helper";

function App() {
  const [candidate1, setCandidate1] = React.useState("");
  const [candidate2, setCandidate2] = React.useState("");
  const [player, setPlayer] = React.useState(null);
  const [board, setBoard] = React.useState(makeBoard());
  const [readOnly, setReadOnly] = React.useState(false);
  const [disabled, setDisabled] = React.useState("none");

  const handleChange = (e) => {
    if (e.target.name === "candidate1") {
      setCandidate1(e.target.value);
    } else {
      setCandidate2(e.target.value);
    }
  };

  const handleDot = (col) => {
    let copyBoard = board;
    for (let r = 5; r > -1; r--) {
      console.log(`${board[r][col - 1]}\n`);
      if (player === candidate1 && copyBoard[r][col - 1] === "white") {
        copyBoard[r][col - 1] = "red";
        setBoard(copyBoard);
        if (overAllCheck(board, player)) {
          handleReset();
          return alert(`${player} wins!!!`);
        } else if (drawCheck(board, r)) {
          return alert(`Game is Draw`);
        } else {
          setPlayer(candidate2);
        }
        return;
      } else if (player === candidate2 && copyBoard[r][col - 1] === "white") {
        copyBoard[r][col - 1] = "yellow";
        setBoard(copyBoard);
        if (overAllCheck(board, player)) {
          handleReset();
          return alert(`${player} wins!!!`);
        } else if (drawCheck(board, r)) {
          return alert(`Game is Draw`);
        } else {
          setPlayer(candidate1);
        }
        return;
      }
    }
  };

  const handleConfirmation = () => {
    setReadOnly(true);
  };

  const handleStart = () => {
    setDisabled("inherit");
    setPlayer(candidate1);
  };

  const handleReset = () => {
    setBoard(makeBoard());
    setCandidate1("");
    setCandidate2("");
    setReadOnly(false);
    setPlayer(null);
  };

  console.log(board);

  return (
    <div className="App">
      <div className={`leftSide`}>
        {player && (
          <Typography variant={`subtitle1`}>{`${player} turn's`}</Typography>
        )}
        <div className={`outerBoard`}>
          <div className={`innerBoard`}>
            {[1, 2, 3, 4, 5, 6].map((cellRow) => (
              <div className={`row`} key={`row${cellRow}`}>
                {[1, 2, 3, 4, 5, 6, 7].map((cellCol) => (
                  <div
                    className={`col`}
                    key={`cell${cellRow}${cellCol}`}
                    onClick={() => handleDot(cellCol)}
                    style={{
                      backgroundColor: board[cellRow - 1][cellCol - 1],
                      pointerEvents: disabled,
                    }}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={`rightSide`}>
        <div className={`playerContainer`}>
          <Typography
            variant={`h6`}
          >{`Fill Details And Start the Game`}</Typography>
          <Typography variant={`h6`}>{`Enter Player's Name`}</Typography>
          <div className={`inputContainer`}>
            <input
              name={`candidate1`}
              type={`text`}
              value={candidate1}
              onChange={handleChange}
              className={`inputTag`}
              placeholder={`Player1`}
              readOnly={readOnly}
            />
          </div>
          <div className={`inputContainer`}>
            <input
              name={`candidate2`}
              type={`text`}
              value={candidate2}
              onChange={handleChange}
              className={`inputTag`}
              placeholder={`Player2`}
              readOnly={readOnly}
            />
          </div>
          <Button
            variant={`outlined`}
            color={`default`}
            className={`confirmButton`}
            onClick={handleConfirmation}
          >{`Confirm Players`}</Button>
          <Button
            variant={`outlined`}
            color={`secondary`}
            className={`startButton`}
            onClick={handleStart}
          >{`Start`}</Button>
          <Button
            variant={`outlined`}
            color={`primary`}
            className={`resetButton`}
            onClick={handleReset}
          >{`Reset`}</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
