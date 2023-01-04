import React, { useState } from "react";
import { parse } from "csv-parse/browser/esm/sync";
import axios from "axios";
import HomePage from "../HomePage/HomePage";
import './UserDataImport.css'
export default function UserDataImport() {
    const [file, setFile] = useState();
    const [csvData, setCsvData] = useState([]);
    const [saveFileRecordDetails, setSaveFileRecordDetail] = useState({ fileName: '', recordCount: '' })
    const fileReader = new FileReader();
    const [iscsv, setIsCSv] = useState(false)
    const [rowData, setRowData] = useState([])
    const [columnData, setColumnData] = useState([])
    const [isrow, setIsRow] = useState(false)
    const [showSaveButton, setShowSaveButton] = useState(false)
    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };
    const getDataFileAndRecord = () => {
        axios.get("http://localhost:5000/getImportUserData").then(res => {
            console.log(res)
        })
    }
    const saveDataFileAndRecord = (recordDataList) => {
        axios.post("http://localhost:5000/saveDataFileAndRecord", recordDataList).then(res => {
          
        })
        getDataFileAndRecord()
    }
    const saveImportedData = () => {
        axios.post("http://localhost:5000/postImportUserData", rowData).then(res => {
            alert("Data Saved")
        })
    }
    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (file) {
            fileReader.onload = function (event) {
                const csvOutput = event.target.result;
                const { result } = event.target;
                const records = parse(result, {
                    columns: ["id", "fullName", "email", "mobile_number", "address"],
                    trim: true,
                    skip_empty_lines: true
                });
                setCsvData(records);
                if (records) {
                    let headerList = []
                    headerList.push(records[0])
                    setColumnData(headerList)
                    setIsRow(true)
                    setRowData(records.slice(1))
                    setShowSaveButton(true)
                }
                let saveFileList = []
                saveFileList.push({ fileName: file.name, recordCount: records.length - 1 })
                setSaveFileRecordDetail(saveFileList)
                saveDataFileAndRecord(saveFileList)
                setIsCSv(true)
            };
            fileReader.readAsText(file);

        }
    };
    return (
        <div class="importClassMain" style={{ textAlign: "center" }}>
            <HomePage />

            <h1 class="importCSVHeader">CSV Import Page</h1>

            <form class="mt-5">
                <div class="formStyleImport">
                    <div className="form-group row">
                        <label className="col col-sm-3 mt-3" style={{ fontWeight: 'bold' }}>Upload Your File Here :</label>
                        <div className="col col-sm-9 mt-3">
                            <input style={{ backgroundColor: 'white', color: 'black' }}
                                type={"file"}
                                id={"csvFileInput"}
                                accept={".csv"}
                                onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <button class="importCSV"
                        onClick={(e) => {
                            handleOnSubmit(e);
                        }}
                    >
                        IMPORT CSV
                    </button>
                </div>


            </form>
            {showSaveButton && <button class="btn btn-primary" style={{ width: '10%', fontSize: '20px', marginLeft: '1900px' }} onClick={saveImportedData}>Save Imported Data</button>}
            <table class="table table-bordered mt-5" style={{ marginLeft: '0px' }}>
                {iscsv && columnData.map((header) => {
                    return (
                        <>
                            <thead style={{ fontSize: '30px' }}>
                                <tr>
                                    <th scope="col" contentEditable='true'>{header.id}</th>
                                    <th scope="col" contentEditable='true'>{header.fullName}</th>
                                    <th scope="col" contentEditable='true'>{header.email}</th>
                                    <th scope="col" contentEditable='true'>{header.mobile_number}</th>
                                    <th scope="col" contentEditable='true'>{header.address}</th>
                                </tr>
                            </thead>
                        </>
                    )

                })}
                {isrow &&
                    rowData.map((row) => {
                        return (
                            <>
                                <tbody style={{ fontSize: '22px' }}>
                                    <tr>

                                        <td >{row.id}</td>
                                        <td>{row.fullName}</td>
                                        <td >{row.email}</td>
                                        <td >{row.mobile_number}</td>
                                        <td>{row.address}</td>

                                    </tr>
                                </tbody>



                            </>
                        )


                    })
                }
            </table>


        </div>
    );
}