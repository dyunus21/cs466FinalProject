import React, { useState } from "react";
import "../src/main-page.css";
import { getAlignment } from "../src/Recurrence.js";

const MainPage = () => {
  const [sequence1, setSequence1] = useState("");
  const [sequence2, setSequence2] = useState("");
  const [matchScore, setMatchScore] = useState(0);
  const [mismatchScore, setMismatchScore] = useState(0);
  const [gapScore, setGapScore] = useState(0);
  const [alignmentType, setAlignmentType] = useState("");
  const [result, setResult] = useState({});
  const [optimalAlignment, setOptimalAlignment] = useState(["", ""]);
  const [score, setScore] = useState(0);
  const [initRow, setInitRow] = useState(0);
  const [initCol, setInitCol] = useState(0);
  const [endRow, setEndRow] = useState(0);
  const [endCol, setEndCol] = useState(0);
  const [path, setPath] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the state based on the input name
    switch (name) {
      case "Sequence1":
        setSequence1(value);
        break;
      case "Sequence2":
        setSequence2(value);
        break;
      case "matchScore":
        setMatchScore(Number(value));
        break;
      case "mismatchScore":
        setMismatchScore(Number(value));
        break;
      case "gapScore":
        setGapScore(Number(value));
        break;
      default:
        break;
    }
    let functionRes = getAlignment(sequence1, sequence2, alignmentType, matchScore, mismatchScore, gapScore);
    setResult(functionRes[0]);
    setOptimalAlignment(functionRes[1]);
    setScore(functionRes[2]);
    setInitRow(functionRes[3]);
    setInitCol(functionRes[4]);
    setEndRow(functionRes[5]);
    setEndCol(functionRes[6]);
    setPath(functionRes[7]);
  };

  const handleDropdownChange = (e) => {
    setAlignmentType(e.target.value);
  };

  const handleComputeClick = () => {
    let functionRes = getAlignment(sequence1, sequence2, alignmentType, matchScore, mismatchScore, gapScore);
    setResult(functionRes[0]);
    setOptimalAlignment(functionRes[1]);
    setScore(functionRes[2]);
    setInitRow(functionRes[3]);
    setInitCol(functionRes[4]);
    setEndRow(functionRes[5]);
    setEndCol(functionRes[6]);
    setPath(functionRes[7]);
  };

  const handleCellHover = (event, rowIndex, colIndex) => {
    let leftCell = document.querySelector(`.gridcell[data-row="${rowIndex}"][data-col="${colIndex - 1}"]`);
    if (leftCell) {
      leftCell.classList.add('gridcell-neighbor');
      leftCell.classList.remove('gridcell');
    } else {
      leftCell = document.querySelector(`.gridcell-optimal[data-row="${rowIndex}"][data-col="${colIndex - 1}"]`);
      if (leftCell) {
        leftCell.classList.add('gridcell-optimal-neighbor');
        leftCell.classList.remove('gridcell-optimal');
      }
    }
  
    let aboveCell = document.querySelector(`.gridcell[data-row="${rowIndex - 1}"][data-col="${colIndex}"]`);
    if (aboveCell) {
      aboveCell.classList.add('gridcell-neighbor');
      aboveCell.classList.remove('gridcell');
    } else {
      aboveCell = document.querySelector(`.gridcell-optimal[data-row="${rowIndex - 1}"][data-col="${colIndex}"]`);
      if (aboveCell) {
        aboveCell.classList.add('gridcell-optimal-neighbor');
        aboveCell.classList.remove('gridcell-optimal');
      }
    }
  
    let diagonalCell = document.querySelector(`.gridcell[data-row="${rowIndex - 1}"][data-col="${colIndex - 1}"]`);
    if (diagonalCell) {
      diagonalCell.classList.add('gridcell-neighbor');
      diagonalCell.classList.remove('gridcell');
    } else {
      diagonalCell = document.querySelector(`.gridcell-optimal[data-row="${rowIndex - 1}"][data-col="${colIndex - 1}"]`);
      if (diagonalCell) {
        diagonalCell.classList.add('gridcell-optimal-neighbor');
        diagonalCell.classList.remove('gridcell-optimal');
      }
    }
  };

  const handleCellExit = (event, rowIndex, colIndex) => {
    let leftCell = document.querySelector(`.gridcell-neighbor[data-row="${rowIndex}"][data-col="${colIndex - 1}"]`);
    if (leftCell) {
      leftCell.classList.add('gridcell');
      leftCell.classList.remove('gridcell-neighbor');
    } else {
      leftCell = document.querySelector(`.gridcell-optimal-neighbor[data-row="${rowIndex}"][data-col="${colIndex - 1}"]`);
      if (leftCell) {
        leftCell.classList.add('gridcell-optimal');
        leftCell.classList.remove('gridcell-optimal-neighbor');
      }
    }
  
    let aboveCell = document.querySelector(`.gridcell-neighbor[data-row="${rowIndex - 1}"][data-col="${colIndex}"]`);
    if (aboveCell) {
      aboveCell.classList.add('gridcell');
      aboveCell.classList.remove('gridcell-neighbor');
    } else {
      aboveCell = document.querySelector(`.gridcell-optimal-neighbor[data-row="${rowIndex - 1}"][data-col="${colIndex}"]`);
      if (aboveCell) {
        aboveCell.classList.add('gridcell-optimal');
        aboveCell.classList.remove('gridcell-optimal-neighbor');
      }
    }
  
    let diagonalCell = document.querySelector(`.gridcell-neighbor[data-row="${rowIndex - 1}"][data-col="${colIndex - 1}"]`);
    if (diagonalCell) {
      diagonalCell.classList.add('gridcell');
      diagonalCell.classList.remove('gridcell-neighbor');
    } else {
      diagonalCell = document.querySelector(`.gridcell-optimal-neighbor[data-row="${rowIndex - 1}"][data-col="${colIndex - 1}"]`);
      if (diagonalCell) {
        diagonalCell.classList.add('gridcell-optimal');
        diagonalCell.classList.remove('gridcell-optimal-neighbor');
      }
    }
  };

  return (
    <div className="Home" id="Home">
      <h1 style={{ fontSize: 35 }}>
        Interactive Demo for Needleman-Wunsch Algorithm CS466
      </h1>
      <div className="paragraph" style={{ fontSize: 15 }}>
        For our project, we are doing an implementation-based project to extend
        the Needleman-Wunsch aligner from{" "}
        <a href="https://github.com/drdrsh/Needleman-Wunsch">https://github.com/drdrsh/Needleman-Wunsch</a> to support fitting
        alignments and local alignments. We found this tool helpful for
        visualizing how the global alignment recurrence is implemented,
        especially in how each value builds on those around it. By implementing
        fitting and local alignments, we can make this tool more useful for
        other types of alignments that we went over in class and handle a wider
        variety of alignment scenarios.
      </div>
      <div className="sequence-input">
        <div className="sequence-row">
          <text style={{ marginTop: "20pt", marginRight: "20pt" }}>
            Sequence 1
          </text>
          <input className="seq" type="string" name="Sequence1" value={sequence1} onChange={handleInputChange}></input>
        </div>
        <div className="sequence-row">
          <text style={{ marginTop: "20pt", marginRight: "20pt" }}>
            Sequence 2
          </text>
          <input className="seq" type="string" name="Sequence2" value={sequence2} onChange={handleInputChange}></input>
        </div>
        <div className="score-input">
          <div className="score-col">
            <text style={{ marginTop: "20pt", marginRight: "20pt" }}>
              Match Score
            </text>
            <input className="score" type="number" name="matchScore" value={matchScore} onChange={handleInputChange}></input>
          </div>
          <div className="score-col">
            <text style={{ marginTop: "20pt", marginRight: "20pt" }}>
              Mismatch Score
            </text>
            <input className="score" type="number" name="mismatchScore" value={mismatchScore} onChange={handleInputChange}></input>
          </div>
          <div className="score-col">
            <text style={{ marginTop: "20pt", marginRight: "20pt" }}>
              Gap Score
            </text>
            <input className="score" type="number" name="gapScore" value={gapScore} onChange={handleInputChange}></input>
          </div>
        </div>
        <div className="dropdown-div">
          <select className="dropdown" id="dropdown" value={alignmentType} onChange={handleDropdownChange}>
            <option value=""> Choose Alignment Type </option>
            <option value="FITTING"> Fitting </option>
            <option value="LOCAL"> Local </option>
            <option value="GLOBAL"> Global </option>
          </select>
          <button className="action-button" onClick={handleComputeClick}>Compute</button>
        </div>
        <div className="grid">
          <table>
            <tbody>
              <tr>
                <td className="grid-empty"> </td>
                <td className="grid-empty"></td>
              {sequence2.split('').map((ele, index) => (
                <td key={index} className="grid-label">{ele}</td>
              ))}
              </tr>
              {Object.keys(result).map((rowIndex) => (
                <tr key={rowIndex}>
                  <td className={rowIndex === "0" ? "grid-empty" : "grid-label"}>{ sequence1[rowIndex - 1] }</td>
                  {Object.keys(result[rowIndex]).map((colIndex) => (
                    <td key={colIndex} 
                      className={path.some(pair => String(pair[0]) === rowIndex && String(pair[1]) === colIndex) ? "gridcell-optimal" : "gridcell"} 
                      onMouseEnter={(event) => handleCellHover(event, parseInt(rowIndex), parseInt(colIndex))}
                      onMouseLeave={(event) => handleCellExit(event, parseInt(rowIndex), parseInt(colIndex))}
                      data-row={rowIndex}
                      data-col={colIndex}
                      >
                      {result[rowIndex][colIndex][0]}
                      {rowIndex > 0 && colIndex > 0 && <span className="scoredetails">
                        <table>
                          <tr>
                            <td> Score from diagonal cell:
                              {(sequence1[rowIndex - 1] === sequence2[colIndex - 1]) ?
                                result[rowIndex - 1][colIndex - 1][0] + " + " + matchScore + " = " + result[rowIndex][colIndex][3] +
                                " (Match between " + sequence1[rowIndex - 1] + " and " + sequence2[colIndex - 1] + ")"
                                : result[rowIndex - 1][colIndex - 1][0] + " + " + mismatchScore + " = " + result[rowIndex][colIndex][3] +
                                " (Mismatch between " + sequence1[rowIndex - 1] + " and " + sequence2[colIndex - 1] + ")"}
                            </td>
                            <td> Score from top cell: {result[rowIndex - 1][colIndex][0]} + {gapScore} = {result[rowIndex][colIndex][2]} </td>
                          </tr>
                          <tr>
                            <td> Score from left cell: {result[rowIndex][colIndex - 1][0]} + {gapScore} = {result[rowIndex][colIndex][1]} </td>
                            <td> <b> Best Score: {result[rowIndex][colIndex][0]} </b></td>
                          </tr>
                        </table>
                      </span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="scroll-together">
          <div className="result-grid">
            {optimalAlignment[0].split('').map((ele, index) => (
              <div key={index} className="result-row">{ele}</div>
            ))}
          </div>
          <div className="result-grid">
            {optimalAlignment[1].split('').map((ele, index) => (
              <div key={index} className="result-row">{ele}</div>
            ))}
          </div>
        </div>
        <div className="sequence-row">
          <p className="score" style={{ fontStyle: "bold" }}>
            Score = {score}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
