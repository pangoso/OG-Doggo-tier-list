import React from "react";

export default function Sorters(props) {
  function handleChangeSearch(event) {
    const {value} = event.target
    props.setData(value)
  }

    function lowToHigh() {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("doggoTable");
        switching = true;
        while (switching) {
          switching = false;
          rows = table.rows;
          for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[2];
            y = rows[i + 1].getElementsByTagName("TD")[2];
            if (Number(x.innerHTML) > Number(y.innerHTML)) {
              shouldSwitch = true;
            break;
            }
          }
          if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
          }
        }
      }
    
      function highToLow() {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("doggoTable");
        switching = true;
        while (switching) {
          switching = false;
          rows = table.rows;
          for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[2];
            y = rows[i + 1].getElementsByTagName("TD")[2];
            if (Number(x.innerHTML) < Number(y.innerHTML)) {
              shouldSwitch = true;
            break;
            }
          }
          if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
          }
        }
      }

    function submit(event) {
      event.preventDefault()
      const output = document.getElementById("output")
      output.className = "alert"

      if (props.data !== "") {
        const rows = document.getElementsByTagName("tr");
        for (let i = 1; i < rows.length; i++) {
          let fullname = rows[i].cells[0].innerHTML;
          if (fullname === props.data) {
            const description = rows[i].cells[3].innerHTML;
            output.innerHTML = `Description of this doggo: ${description}`;
            return;
          }
        }
        output.innerHTML = "No such doggo"
      }
    }
    
    return (
        <div>
        <div className="sorting">
            <button className="customButton2" onClick={lowToHigh}>Rosnąco</button>
            <button className="customButton2" onClick={highToLow}>Malejąco</button>
            <form>
              <input
                  type="text"
                  placeholder="Race"
                  className="inputText"
                  name="search"
                  onChange={handleChangeSearch}
                  value={props.data}/>
              <button className="submitButton" onClick={submit}>
                  Search
              </button>
            </form>
        </div>
        <div id="output">

        </div>
        </div>
    )
}