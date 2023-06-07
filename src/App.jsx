import { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function App() {

  const [Usuarios,setUsuarios] = useState([]);
  const [tablaUsuarios,setTablaUsuarios] = useState([]);
  const [busqueda, setBusqueda]= useState("");

  const peticionGet=async() =>{
    await axios.get("https://hp-api.onrender.com/api/spells")
    .then(response=>{
      setUsuarios(response.data);
      setTablaUsuarios(response.data);
      console.log(response.data);
    }).catch(error =>{
      console.log(error);
    })

  }

  const handleChange=(e)=>{
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }

  const filtrar=(terminoBusqueda)=>{
    var resultadosBusqueda=tablaUsuarios.filter((elemento)=>{
      if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      || elemento.id.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
        return elemento;
        
        
      }
    });
    setUsuarios(resultadosBusqueda);
  }

  useEffect(() =>{
    peticionGet();
  },[])

  return(
    <>
    <div className="App">
      <div className="containerInput">
        <input
        className="form-control inputBuscar"
        value={busqueda}
        placeholder="busqueda por Nombre o ID"
        onChange={handleChange}
        />
        <button className="btn btn-success">
          <FontAwesomeIcon icon={faSearch}/>
        </button>
        </div>

        <div className="table-resposibe">
      <table className="table table-sm table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            
          </tr>
        </thead>
        <tbody>
          {Usuarios &&
          Usuarios.map((usuario)=>(
            <tr key={usuario.id}>
            <td>{usuario.id}</td>
            <td>{usuario.name}</td>
            <td>{usuario.description}</td>
            
            
            
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default App
