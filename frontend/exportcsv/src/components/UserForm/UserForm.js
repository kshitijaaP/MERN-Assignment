import React, { useState } from 'react'
import './UserForm.css'
import axios from "axios"
import { CSVLink } from "react-csv";
import { useRef } from 'react';
import HomePage from '../HomePage/HomePage';
export default function UserForm() {
    const [addUserData, setAddaddUserData] = useState({ fullName: '', email: '', dob: '', address: '', country: '' })
    const [userDataList, setUserDataList] = useState([])
    const [start, setStart] = useState(false);

    const [data, setData] = useState([]);
    const [downloadedData, setDownloadedData] = useState([]);
    const csvDownloadRef = useRef(0);
    const headers = [
        { label: "Fullname", key: "fullName" },
        { label: "Email", key: "email" },
        { label: "DOB", key: "dob" },
        { label: "Address", key: "address" },
        { label: "Country", key: "country" },
    ];

    const [userData, setUserdata] = useState([]);
    const [filterdata, setFilterdata] = useState([]);
    const [query, setQuery] = useState('');

    React.useEffect(() => {
        getUserData()
    }, [start])
    const fetchDataToDownload = () => {
        axios
            .get("http://localhost:5000/saveUserData")
            .then(({ data }) => {
                setDownloadedData(data);
                console.log(downloadedData)
                setTimeout(() => {
                    csvDownloadRef.current.link.click();
                }, 500);
            })
            .catch((error) =>
                console.log(error)
            );
    };
    const deleteUser = (user) => {
        axios.post("http://localhost:5000/deleteUserData", user).then(res => {
            console.log(res)
            getUserData()
        })
    }
    const editUser = (user) => {

        setAddaddUserData(user)



    }

    const handleInputForm = (e) => {
        const { name, value } = e.target
        setAddaddUserData({ ...addUserData, [name]: value })

    }
    function isEmail(val) {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEmail.test(val)) {
            return false;
        }
        else {
            return true;
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let isEmailFlag = true
        const { fullName, email, dob, address, country } = addUserData
        if (email) {
            isEmailFlag = isEmail(email)
        }
        if (isEmailFlag) {
            axios.post("http://localhost:5000/saveUserData", addUserData).then(res => {
                getUserData();

            })
        }
        else {
            alert("Please Enter Valid EmailId")
        }

    }
    const getUserData = () => {
        axios.get("http://localhost:5000/saveUserData").then(res => {

            let tempUserList = res.data
            // tempUserList.push()
            setUserDataList(tempUserList)
            setStart(true)
            setDownloadedData(data);
            setUserdata(userDataList)
            addUserData.fullName = '';
            addUserData.email = '';
            addUserData.dob = '';
            addUserData.address = '';
            addUserData.country = '';

        })

    }
    const handlesearch = (event) => {
        let originalDatalist = userDataList
        const getSearch = event.target.value;
        if (getSearch.length > 0) {
            const searchdata = userDataList.filter((item) => item.fullName.toLowerCase().includes(getSearch)
                || item.email.toLowerCase().includes(getSearch)
                || item.dob.toLowerCase().includes(getSearch)
                || item.address.toLowerCase().includes(getSearch)
                || item.country.toLowerCase().includes(getSearch)
            );
            setUserDataList(searchdata);
        }
        else {
            setUserDataList(userData);
        }
        setQuery(getSearch);
    }

    return (
        <div className="Navbar">
            <HomePage />
            <h1 className='exportCSV'>Export CSV</h1>

            <div class="container" >
                <div className="row">

                    <div className="col col-lg-2">
                        <div>

                            <CSVLink
                                headers={headers}
                                data={downloadedData}
                                filename="parents.csv"
                                className="hidden"
                                ref={csvDownloadRef}
                                target="_blank"
                            />


                        </div>
                    </div>
                    <div className="col col-lg-6 mt-5 ">

                        <div class="formStyle">
                            <form style={{ fontSize: '25px' }}>
                                <div className="form-group row">
                                    <label className="col col-sm-3" style={{ fontWeight: 'bold', border: 'none', fontSize: '25px', marginLeft: '-200px' }} > Name</label>
                                    <div className="col col-sm-9 " style={{ border: 'none' }}>
                                        <input type="text" name="fullName" onChange={handleInputForm} value={addUserData.fullName}></input>
                                    </div>
                                </div>
                                <br></br>
                                <div className="form-group row">
                                    <label className="col col-sm-3 mt-3" style={{ fontWeight: 'bold', border: 'none', fontSize: '25px', marginLeft: '-200px' }}>Email</label>
                                    <div className="col col-sm-9 mt-3" style={{ border: 'none' }}>
                                        <input type="text" name="email" value={addUserData.email} onChange={handleInputForm} ></input>
                                    </div>
                                </div>
                                <br></br>
                                <div className="form-group row">
                                    <label className="col col-sm-3 mt-3" style={{ fontWeight: 'bold', border: 'none', fontSize: '25px', marginLeft: '-200px' }}>Date of Birth</label>
                                    <div className="col col-sm-9 mt-3" style={{ border: 'none' }}>
                                        <input type="date" name="dob" value={addUserData.dob} onChange={handleInputForm}></input>
                                    </div>
                                </div>
                                <br></br>
                                <div className="form-group row">

                                    <label className="col col-sm-3 mt-3" style={{ fontWeight: 'bold', border: 'none', fontSize: '25px', marginLeft: '-200px' }}>Address</label>
                                    <div className="col col-sm-9 mt-3" style={{ border: 'none' }}>
                                        <input type="text" name="address" value={addUserData.address} onChange={handleInputForm}></input>
                                    </div>
                                </div>
                                <br></br>
                                <div className="form-group row">

                                    <label className="col col-sm-3 mt-3" style={{ fontWeight: 'bold', border: 'none', fontSize: '25px', marginLeft: '-200px' }}>Country</label>
                                    <div className="col col-sm-9 mt-3" style={{ border: 'none' }}>
                                        <input type="text" name="country" value={addUserData.country} onChange={handleInputForm}></input>
                                    </div>
                                </div>

                                <button class="addUserButton" onClick={handleFormSubmit} >Add User</button>
                            </form>
                        </div>
                        <hr class="mt-3"></hr>
                        <button
                            className="btn btn-primary mb-2"
                            onClick={fetchDataToDownload}
                            class="exportUserButton"
                        >
                            Export User
                        </button>
                        <div className="col-md-6">
                            <input type="text" name='name' value={query} className="InputSearch" onChange={(e) => handlesearch(e)} placeholder='Search...' />
                        </div>
                        <div>
                            <table class="table table-bordered mt-5" style={{ width: '1505px' }}>
                                <thead class="thead-dark" style={{ fontSize: '30px' }}>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">DOB</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Country</th>
                                        <th scope="col">Edit</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                {start && userDataList.map((user) => {
                                    return (
                                        <tbody style={{ fontSize: '25px' }}>
                                            <tr>

                                                <td>{user.fullName}</td>
                                                <td>{user.email}</td>
                                                <td>{user.dob}</td>
                                                <td>{user.address}</td>
                                                <td>{user.country}</td>
                                                <td ><button style={{ fontSize: '25px', color: 'white' }} class="btn btn-warning" onClick={() => { editUser(user) }}>Edit</button></td>
                                                <td><button style={{ fontSize: '25px', color: 'white' }} class="btn btn-danger" onClick={() => { deleteUser(user) }}>Delete</button></td>
                                            </tr>
                                        </tbody>

                                    )

                                })}
                            </table>
                        </div>

                    </div>

                </div>

            </div>
        </div>

    )
}