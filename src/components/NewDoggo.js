import React from "react";

export default function NewDoggo(props) {
    function handleChange(event) {
        const {name, value} = event.target
        props.setFormData(prevFormData => {
            return {
                ...prevFormData, 
                [name]: value
            }
        })
    }

    function handleFiles() {
        var input = document.getElementById("inputFile");

        if (input.files[0]) {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(input.files[0]);
            img.className = "img"
            img.onload = function() {
              URL.revokeObjectURL(this.src);
            }
            return img
        }
      }

    function submit(event) {
        event.preventDefault()
        const photo = handleFiles()
        if (props.formData.race === "" || props.formData.rating === "" || props.formData.reason === "" || typeof photo === 'undefined') {
            const error = document.getElementById("alert")
            error.innerHTML = `Fill every input!`
            error.className = "alert"
        } else {
            const error = document.getElementById("alert")
            error.innerHTML = ""
            error.className=""
            var table = document.getElementById("doggoTable");
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);

            cell1.innerHTML = props.formData.race;
            cell2.appendChild(photo)
            cell3.innerHTML = props.formData.rating;
            cell3.onclick = props.changeRating
            cell4.innerHTML = props.formData.reason;
            cell5.innerHTML = `<button>X</button>`
            cell5.onclick = props.deleteDoggo
            cell6.innerHTML = `<button>E</button>`
            cell6.onclick = props.editDoggo

            props.formData.race = ""
        }
    }

    return (
        <div>
        <form>
            <input 
                type="text"
                placeholder="Race"
                className="inputText"
                name="race"
                onChange={handleChange}
                value={props.formData.race}/>
            <input 
                type="file"
                className="inputFile"
                accept="image/*"
                name="image"
                id="inputFile" />
            <input 
                type="number"
                placeholder="Rating"
                min="0"
                max="10"
                className="inputRating"
                name="rating"
                onChange={handleChange}
                value={props.formData.rating}/>
            
            <input
                type="textarea"
                placeholder="Reason"
                className="inputArea"
                name="reason"
                onChange={handleChange}
                value={props.formData.reason}/>
            <button className="submitButton" onClick={submit}>
                Add doggo
            </button>
        </form>
        <div id="alert">

        </div>
        </div>
    )
}