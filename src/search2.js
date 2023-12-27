import React from "react";
import { useState } from "react";
import { Button, Modal } from 'antd';
export function Srch() {

    const [inputData, setInputData] = useState({
        fname: "",
        sname: "",
        email: "",
        pass: "",

    })
    console.log(inputData);

    const [search, setSearch] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (value) => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        const searchdata = records.filter((item) => item.fname === search)

        setRecords(searchdata)

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleOnChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value })
    }
    const [records, setRecords] = useState(JSON.parse(localStorage.getItem('data')) || [])

    const handleSubmit = () => {
        setRecords([...records, inputData])
        localStorage.setItem("data", JSON.stringify([...records, inputData]))
    }

    return (
        <>
            <div style={{ padding: "3%", backgroundColor: "lightcoral" }}>

                <div>
                    <label> fname </label>
                    <input type="text" name="fname" value={inputData.fname} onChange={(e) => handleOnChange(e)} />
                </div><br />
                <div>
                    <label> sname </label>
                    <input type="text" name="sname" value={inputData.sname} onChange={(e) => handleOnChange(e)} />
                </div><br />
                <div>
                    <label> email </label>
                    <input type="email" name="email" value={inputData.email} onChange={(e) => handleOnChange(e)} />
                </div><br />
                <div>
                    <label> password </label>
                    <input type="password" name="pass" value={inputData.pass} onChange={(e) => handleOnChange(e)} />
                </div><br />
                <div>
                    <button type="button" onClick={() => handleSubmit()}>submit</button>

                </div><br />
                <Button type="primary" onClick={showModal}>
                    Open Modal
                </Button>
                <Modal title="search form" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <input type="text" onChange={(e) => setSearch(e.target.value)} value={search}  ></input>

                </Modal>
            </div >

            <div>
                <table className="table table-hover table-striped">
                    <thead>
                        <th>fname</th>
                        <th>sname</th>
                        <th>email</th>
                        <th>password</th>
                    </thead>
                    <tbody>{
                        records?.map((item, index) => {
                            return (
                                <tr>
                                    <td>{item.fname}</td>
                                    <td>{item.sname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.pass}</td>

                                </tr>
                            )
                        })
                    }
                    </tbody>

                </table>

            </div>




        </>
    )
}