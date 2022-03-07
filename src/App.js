import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import axios from "axios";
import Rating from '@mui/material/Rating';;

function App() {
  const [json,setJson] = useState([]);
  const [value,setValue] = useState("");
  async function getData(){
    const res = await axios.get ("https://www.googleapis.com/books/v1/volumes?q={keyword");
    console.log(res.data.items);
    setJson(res.data.items);
  }
  getData();

  return (
    <div className="App">
    <div class="input-group">
    <input onChange={function(e){
      setValue(e.target.value);
    }} class="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </div>
      {json.filter(function(word){
        if (value==""){
          return ;
        }
        if (word.volumeInfo.title.toLowerCase().includes(value.toLowerCase())){
          return word;
        }
      }).map(function(res){
        return (
          <div id="link">
            <div id="left">
              <img src={res.volumeInfo.imageLinks.thumbnail} ></img>
            </div>
            <div id="right">
              <h3>Judul : {res.volumeInfo.title}</h3>
              <p>Author : {res.volumeInfo.publisher}</p>
              <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
                <br></br>
                <button onClick={function(){
                  axios.post("http://localhost:3001/",{
                    title : res.volumeInfo.title
                  })
                }} class="btn btn-success" type="submit">Wishlist</button>
            </div>
          </div>
        )
      })}

      </div>
  );
}

export default App;
