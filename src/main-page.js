import React from "react";
import "../src/main-page.css";
import "../src/Recurrence.js";

const MainPage = () => {
  return (
    <div className="Home" id="Home">
      <h1 style={{ fontSize: 35 }}>
        Interactive Demo for Needleman-Wunsch Algorithm CS466
      </h1>
      <div className="paragraph" style={{ fontSize: 15 }}>
        For our project, we are doing an implementation-based project to extend
        the Needleman-Wunsch aligner from{" "}
        <a>https://github.com/drdrsh/Needleman-Wunsch</a> to support fitting
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
          <input className="seq" type="string" name="Sequence1"></input>
        </div>
        <div className="sequence-row">
          <text style={{ marginTop: "20pt", marginRight: "20pt" }}>
            Sequence 2
          </text>
          <input className="seq" type="string" name="Sequence2"></input>
        </div>
        <div className="score-input">
          <div className="score-col">
            <text style={{ marginTop: "20pt", marginRight: "20pt" }}>
              Match Score
            </text>
            <input className="score" type="number" name="match-score"></input>
          </div>
          <div className="score-col">
            <text style={{ marginTop: "20pt", marginRight: "20pt" }}>
              Mismatch Score
            </text>
            <input className="score" type="number" name="match-score"></input>
          </div>
          <div className="score-col">
            <text style={{ marginTop: "20pt", marginRight: "20pt" }}>
              Gap Score
            </text>
            <input className="score" type="number" name="match-score"></input>
          </div>
        </div>
        <div className="dropdown-div">
          <select className="dropdown" id="dropdown">
            <option value=""> Choose Alignment Type </option>
            <option value="FITTING"> Fitting </option>
            <option value="LOCAL"> Local </option>
            <option value="GLOBAL"> Global </option>
          </select>
          <button className="action-button">Compute</button>
        </div>
        <div className="grid">THIS IS GRID</div>
        <div className="result-grid">
          <div className="result-row">L</div>
          <div className="result-row">L</div>
          <div className="result-row">L</div>
        </div>
        <div className="result-grid">
          <div className="result-row">L</div>
          <div className="result-row">L</div>
          <div className="result-row">L</div>
        </div>
        <div className="sequence-row">
          <text className="score" style={{ fontStyle: "bold" }}>
            {" "}
            Score ={" "}
          </text>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
