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
  };

  const handleDropdownChange = (e) => {
    setAlignmentType(e.target.value);
  };

  const handleComputeClick = () => {
    let functionRes = getAlignment(sequence1, sequence2, alignmentType, matchScore, mismatchScore, gapScore);
    setResult(functionRes[0]);
    setOptimalAlignment(functionRes[1]);
    setScore(functionRes[2]);
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
                <td> </td>
                <td>-</td>
              {sequence2.split('').map((ele, index) => (
                <td key={index} className="result-row">{ele}</td>
              ))}
              </tr>
              {Object.keys(result).map((rowIndex) => (
                <tr key={rowIndex}>
                  <td>{ rowIndex == 0 ? '-' : sequence1[rowIndex-1]}</td>
                  {Object.keys(result[rowIndex]).map((colIndex) => (
                    <td key={colIndex}>
                      {result[rowIndex][colIndex][0]}
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
