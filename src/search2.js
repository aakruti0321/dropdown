import React from "react";
import { useState } from "react";
import { Button, Modal, } from 'antd';
export function Srch() {

    const [inputData, setInputData] = useState({
        fname: "",
        sname: "",
        email: "",
        pass: "",
    })
    console.log(inputData);

    const [records, setRecords] = useState(JSON.parse(localStorage.getItem('dataa')) || []);

    /////////////////////////// modal search ////////////////////////////////

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (value) => {
        setIsModalOpen(true);

    };
    const [search, setSearch] = useState("")

    const handleOk = () => {
        setIsModalOpen(false);
        const searching = records.filter((item) => item.fname === search || item.sname === search || item.email === search)
        setRecords(searching)
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    //////////////////////////checkbox ////////////////////////////


    // const checkboxhandler = (e) => {
    //     const isselected = e.target.checked;
    //     const value = parseInt(e.target.value);
    //     if (isselected) {
    //         setIsChecked([...isChecked, value])
    //     } else {
    //         setIsChecked((prevdata) => {
    //             return prevdata.filter((fname) => {
    //                 return fname !== value
    //             })
    //         })
    //     }

    // }
    // const checkbAllhandler = () => {
    //     if (records.length === isChecked.length) {
    //         setIsChecked([])
    //     } else {
    //         const checkk = records.map((item) => {
    //             return item.fname
    //         })
    //         setIsChecked(checkk)
    //     }

    // }
    const handleOnChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });

    }
    const buttondelete = (index) => {

        const deletedata = records.filter((item, ind) => ind !== index);
        setRecords(deletedata);
    }
    const [isEdit, setIsEdit] = useState(-1);

    const handleSubmit = () => {
        if (isEdit !== -1) {
            const update = records.map((idx, index) => {
                if (index === isEdit) {
                    return inputData;
                }
                return idx;
            });
            setRecords(update);
            localStorage.setItem("dataa", JSON.stringify(update))
            setIsEdit(-1);
        }
        /////////////////////////////////duplicate record task //////////////////////////

        else {
            const duplicatedata = records.some((item) => item.fname === inputData.fname || item.sname === inputData.sname || item.email === inputData.email)
            console.log(duplicatedata)
            if (duplicatedata) {
                window.alert("duplicate data is not valid")
            }
            else {
                setRecords([...records, { ...inputData, id: Date.now() }]);
                localStorage.setItem("dataa", JSON.stringify([...records, inputData]))
            }

        }
    }

    const handleEdit = (index) => {
        setIsEdit(index);
        const editData = records.find((item, index1) => { return index1 === index });
        setInputData(editData);
    }

    ///////////// checkbox ///////
    const [isChecked, setIsChecked] = useState([]);

    const checkboxhandler = (e) => {
        if (e.target.name === "selectall") {
            if (isChecked?.length === records?.length) {
                setIsChecked([])
            }
            else {
                setIsChecked(records?.map((item) => { return (item?.id) }));
            }
        }
        else {
            if (isChecked?.includes(parseInt(e.target?.value))) {
                setIsChecked(isChecked?.filter((item) => { return item !== parseInt(e.target.value) }))
            }
            else { setIsChecked([...isChecked, parseInt(e.target.value)]) }
        }
    }
    return (
        <>
            <div style={{ padding: "3%", backgroundColor: "pink" }}>

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
                        <th><input type="checkbox" value="all" name="selectall" checked={isChecked?.length === records?.length} onChange={(e) => checkboxhandler(e)} /></th>
                        <th>fname</th>
                        <th>sname</th>
                        <th>email</th>
                        <th>password</th>

                    </thead>
                    <tbody>{
                        records?.map((item, index) => {
                            return (
                                <tr>
                                    <td><input type="checkbox" value={parseInt(item?.id)} name={parseInt(item?.id)} checked={isChecked?.includes(parseInt(item?.id))} onChange={(e) => checkboxhandler(e)} /></td>
                                    <td>{item.fname}</td>
                                    <td>{item.sname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.pass}</td>
                                    <td><button onClick={() => buttondelete(index)}>delete</button></td>
                                    <td><button type="button" onClick={() => handleEdit(index)}>Edit</button></td>
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
