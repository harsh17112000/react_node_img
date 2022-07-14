import React, { useState, useEffect, useContext } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { adddata, deldata ,searchdata} from './context/ContextProvider';
import { updatedata } from './context/ContextProvider'
import axios from "axios"




const Home = () => {

    const [getuserdata, setUserdata] = useState([]);

    const { udata, setUdata } = useContext(adddata);

    const { updata, setUPdata } = useContext(updatedata);

    const { dltdata, setDLTdata } = useContext(deldata);

    const {searchData, setsearchData} = useContext(searchdata);


    const url = `search=${searchData}&page=`

    const getdata = async () => {
 
        const res = await fetch(`/employees?${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json,",
                'Accept': "application/json,",
            },
            credentials: "include"
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422) {
            console.log("error ");

        } else {
            setUserdata(data)
            // console.log();

        }
    }

    const deleteuser = async (id) => {
        console.log(id);
        const res2 = await fetch(`/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",

            },
            credentials: "include"
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            setDLTdata(deletedata)
            getdata();
        }
    }

    useEffect(() => {
        getdata();
    }, [searchData])


    return (

        <>
            {
                udata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{udata.name}</strong>  added succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }
            {
                updata ?
                    <>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{updata.name}</strong>  updated succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }

            {
                dltdata ?
                    <>
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>{dltdata.name}</strong>  deleted succesfully!
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }
            <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2 mb-2">
                        <NavLink to="/register" className="btn btn-primary">Add data</NavLink>
                    </div>

                    <table class="table">
                        <thead>
                            <tr className="table-dark">
                                <th scope="col">id</th>
                                <th scope="col">Username</th>
                                <th scope="col">email</th>
                                <th scope="col">Job</th>
                                <th scope="col">Number</th>
                                <th scope="col">Imguser</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                getuserdata.map((el, k) => {
                                    return (
                                        <>

                                            <tr>
                                                <th scope="row">{el.id}</th>
                                                <td>{el.name}</td>
                                                <td>{el.email}</td>
                                                <td>{el.work}</td>
                                                <td>{el.mobile}</td>
                                               <td><img src={`http://localhost:8000/uploads/${el.imguser}`} style={{width:"60px",height:50,borderRadius:"50%"}} alt="no" /></td> 
                                                <td className="d-flex justify-content-between">
                                                    <NavLink to={`/view/${el.id}`}> <button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink>
                                                    <NavLink to={`/edit/${el.id}`}>  <button className="btn btn-primary"><CreateIcon /></button></NavLink>
                                                    <button className="btn btn-danger" onClick={() => deleteuser(el.id)}><DeleteOutlineIcon /></button>
                                                </td>
                                            </tr>

                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Home














// this one is for mongodb


{/* {
                                getuserdata.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.name}</td>
                                                <td>{element.email}</td>
                                                <td>{element.work}</td>
                                                <td>{element.mobile}</td>
                                                <td className="d-flex justify-content-between">
                                                    <NavLink to={`view/${element._id}`}> <button className="btn btn-success"><RemoveRedEyeIcon /></button></NavLink>
                                                    <NavLink to={`edit/${element._id}`}>  <button className="btn btn-primary"><CreateIcon /></button></NavLink>
                                                    <button className="btn btn-danger" onClick={() => deleteuser(element._id)}><DeleteOutlineIcon /></button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            } */}








