import React,{useState} from 'react'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react';
import { searchdata } from './context/ContextProvider';


const Navbaar = () => {

    const [check,setCheck] = useState("");
   

    const {searchData, setsearchData} = useContext(searchdata)


    const getdata =  (e) => {
        e.preventDefault();
        setsearchData(check)
    }

    const resetdata = (e)=>{
        e.preventDefault();
        setCheck("")
        setsearchData("")
    }



    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">CRUD APP</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                          
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2 p-2" type="search" value={check} onChange={(e)=>setCheck(e.target.value)} placeholder="Search" aria-label="Search" />
                            <button className ="btn btn-success px-4 mx-2"  onClick={getdata} type ="button">Search</button>
                            <button className ="btn btn-primary px-4" onClick={resetdata} type ="button">Reset</button>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbaar
