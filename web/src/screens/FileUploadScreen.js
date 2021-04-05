import React, { useState } from "react";
import { upload } from "../services/fileUpload";

const swarm = require("swarm-js").at("http://localhost:8500");

export default function FileUploadScreen() {
  const [txHash, setTXHash] = useState(
    "8802084487d90231570b565ec032143925b76e48785be299f22f5b16961ac337"
  );

  return (
    <div className="container">
      <div className="page-header">
        <div className="page-title">Upload Patent</div>
      </div>
      <p>
        Provider:
        <input
          type="text"
          id="provider"
          value="http://swarm-gateways.net"
          onkeyup="setProvider()"
        ></input>
      </p>

      <p>
        <button onclick={() => upload()}>Download</button>
        <button onclick="upload()">Upload a File</button>
        <button onclick="upload(true)">Upload a Directory</button>
        <button onclick="upload(new Buffer(prompt('Text:')))">
          Upload a String
        </button>
      </p>

      <div id="output"></div>

      <div>
        <p>
          <strong>Downloads to try:</strong>
        </p>
        <table>
          <tr>
            <td>Demo text</td>
            <td>
              62cb02b7d506e24f347ba0e8029e24bac12c4c2edd80498c9cbe64c30b97b96b
            </td>
          </tr>
          <tr>
            <td>Demo image</td>
            <td>
              76b9b41b169cbe78cf92f4fa413065536051588db5b1dd052ed12c78754d1008
            </td>
          </tr>
          <tr>
            <td>Demo directory</td>
            <td>
              4531d4d568f9f164cb0426bb826fc612fc83329c2b5fb21601a2f457ddcccaf6
            </td>
          </tr>
        </table>
        <p>
          This demo only interprets PNG, JPG and text. Any other binary is shown
          as a hex string.
        </p>
      </div>
    </div>
  );
}
