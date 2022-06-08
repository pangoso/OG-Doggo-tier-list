import React,{useState,useEffect} from 'react';
import Header from './components/Header';
import NewDoggo from './components/NewDoggo';
import Sorters from './components/Sorters';

export default function App() {
  const [data, setData]=useState([{
    race: "",
    image: "",
    rating: "",
    reason: ""
  }]);

  const [formData, setFormData] = React.useState({
    race: "",
    rating: "",
    reason: ""
  })

  const [search, setSearch] = React.useState("")

  useEffect(()=>{
    const fetchData = async () => {
      fetch('data.json'
      ,{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(function(response){
          return response.json();
        })
        .then(function(myJson) {
          setData([myJson['doggos']])
        });
    }
    fetchData()
  }, [])

  function editDoggo(e) {
    const rateInput = `<input 
      type="number"
      min="0"
      max="10"
      value="0" />`;
    const row = e.target.parentNode.parentNode;
    row.cells[2].innerHTML = rateInput;

    const saveButton = `<button>S</button>`;
    row.cells[5].innerHTML = saveButton;
    row.cells[5].onclick = saveDoggo
  }

  function saveDoggo(e) {
    const row = e.target.parentNode.parentNode;
    const rating = row.cells[2].childNodes[0].value
    
    row.cells[2].innerHTML = rating

    const editButton = `<button>E</button>`;
    row.cells[5].innerHTML = editButton;
    row.cells[5].onclick = editDoggo
  }

  function deleteDoggo(e) {
    const row = e.target.parentNode.parentNode
    row.parentNode.removeChild(row);
  }

  return (
    <div>
      <Header />
      <NewDoggo formData={formData} setFormData={setFormData} deleteDoggo={deleteDoggo} editDoggo={editDoggo}/>
      { data[0].race !== "" && 
        <table id="doggoTable">
          <thead>
            <tr>
              <th>Race</th>
              <th>Image</th>
              <th>Rating</th>
              <th>Reason</th>
              <th>Delete</th>
              <th>Change rating</th>
            </tr>
          </thead>
          <tbody>
            {
            data[0].map((item, i) => (
              <tr key={i}>
                <td>{item.race}</td>
                <td><img src={'images/' + (item.image === "" ? 'no_doggo.png' : item.image)} alt={'doggo' + i}/></td>
                <td>{item.rating}</td>
                <td>{item.reason}</td>
                <td><button className="customButton" onClick={deleteDoggo}>X</button></td>
                <td><button className="customButton" onClick={editDoggo}>E</button></td>
              </tr>))}
          </tbody>
        </table>
      }
      <Sorters data={search} setData={setSearch}/>
    </div>
  )
}
