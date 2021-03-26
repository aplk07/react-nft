const swarm = require("swarm-js").at("http://localhost:8500");

// Uploads a file or directory to the Swarm network
export const upload = (dir) => {
    console.log('hi');
  swarm.upload(dir).then(print).catch(console.log);
};

// Downloads from Swarm and inserts on site
const download = () => {
  const hash = prompt("Hash:");
  if (hash) swarm.download(hash).then(print).catch(console.log);
};

// Pretty printers
const print = (val) => {
  let p = document.createElement("p");
  let o = document.getElementById("output");
  p.appendChild(toHTML(val));
  o.insertBefore(p, o.firstChild);
};

// Interprets data as text/png/jpg/raw/directory, builds an HTML
const toHTML = (val) => {
  // Directory
  if (val instanceof Object && !val.length) {
    let table = document.createElement("table");
    for (var key in val) {
      let row = document.createElement("tr");
      let cell0 = document.createElement("td");
      let cell1 = document.createElement("td");
      cell0.appendChild(toHTML(key));
      cell1.appendChild(toHTML(val[key].data));
      row.appendChild(cell0);
      row.appendChild(cell1);
      table.appendChild(row);
    }
    return table;

    // String
  } else if (typeof val === "string") {
    let span = document.createElement("span");
    span.innerHTML = val;
    return span;

    // Buffer
  } else if (val.length) {
    // PNG
    if (val[1] === 80 && val[2] === 78 && val[3] === 71) {
      let image = document.createElement("img");
      image.src =
        "data:image/png;base64," + btoa(String.fromCharCode.apply(null, val));
      return image;

      // JPG
    } else if (
      val[0] === 0xff &&
      val[1] === 0xd8 &&
      val[val.length - 2] === 0xff &&
      val[val.length - 1] === 0xd9
    ) {
      let image = document.createElement("img");
      image.src =
        "data:image/jpg;base64," + btoa(String.fromCharCode.apply(null, val));
      return image;

      // Plain text / binary data
    } else {
      let isText = true;
      for (let i = 0; i < val.length; ++i)
        if (val[i] < 32 || val[i] > 126) isText = false;
      return toHTML(
        isText
          ? [].map.call(val, (c) => String.fromCharCode(c)).join("")
          : [].map.call(val, (b) => ("00" + b.toString(16)).slice(-2)).join("")
      );
    }
  }
};
