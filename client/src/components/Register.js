import React, { useContext, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { adddata, searchdata } from './context/ContextProvider';
import axios from "axios"

const Register = () => {

    const { udata, setUdata } = useContext(adddata);

   

    const history = useHistory();

    const [file, setFile] = useState("");
    const [inpval, setINP] = useState({
        name: "",
        email: "",
        age: "",
        mobile: "",
        work: "",
        add: "",
        date: "",
        desc: ""
    });


    const setdata = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;


        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })

    }

    const setimgfile = (e) => {
        setFile(e.target.files[0])
    }
    // console.log(file);

    const addinpdata = async (e) => {
        e.preventDefault();

        const { name, email, age, mobile, work, add, date, desc } = inpval


        var formData = new FormData();
        formData.append("photo", file);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("age", age);
        formData.append("mobile", mobile);
        formData.append("work", work);
        formData.append("add", add);
        formData.append("date", date);
        formData.append("desc", desc);


        const config = { headers: { 'Content-Type': ['multipart/form-data', "application/json"] } };

        const res = await axios.post("/create", formData, config);
        console.log(res);

        if (res.status === 422 || !res) {
            console.log("error ");
            alert("error");

        } else {
            history.push("/")
            setUdata(res.data)
            console.log("data added");

        }
    }

    return (
        <div className="container">
            <NavLink to="/">home</NavLink>

            <form >




                <div className="row">
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">Name</label>
                        <input type="text" value={inpval.name} onChange={setdata} name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">email</label>
                        <input type="email" value={inpval.email} onChange={setdata} name="email" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">age</label>
                        <input type="number" value={inpval.age} onChange={setdata} name="age" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Mobile</label>
                        <input type="text" value={inpval.mobile} onChange={setdata} name="mobile" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Work</label>
                        <input type="text" value={inpval.work} onChange={setdata} name="work" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Address</label>
                        <input type="text" value={inpval.add} onChange={setdata} name="add" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                    
                        <input type="file" onChange={setimgfile} name="photo" />
                    </div>
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Date</label>
                        <input type="date" value={inpval.date} onChange={setdata} name="date" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 col-lg-12 col-md-12 col-12">
                        <label for="exampleInputPassword1" class="form-label">Description</label>
                        <textarea name="desc" value={inpval.desc} onChange={setdata} className="form-control" id="" cols="30" rows="5"></textarea>
                    </div>

                    {/* <button type="submit" onClick={addinpdata} class="btn btn-primary">Submit</button> */}
                    <button type="submit" onClick={addinpdata} class="btn btn-primary">send</button>
                </div>
            </form>
        </div>
    )
}
export default Register;
