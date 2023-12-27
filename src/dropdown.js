import React from "react";
import { useMemo } from "react";
import { useState } from "react";
import { Select, Button, Modal } from 'antd';

const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log('search:', value);
};

// Filter `option.label` match the user type `input`

const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


export function Myfun() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (value) => {
    setIsModalOpen(true);
    setRecords(records.filter((item) => item.fname.toLowerCase() === search.toLowerCase()))
  };
  const handleOk = () => {
    setIsModalOpen(false);

    setInputData()
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [inputData, setInputData] = useState({
    fname: "",
    sname: "",
    email: "",
    pass: "",

  })
  console.log(inputData);

  const handleOnChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value })
  }
  const [records, setRecords] = useState(JSON.parse(localStorage.getItem('data')) || [])

  const handleSubmit = () => {
    setRecords([...records, inputData])
    localStorage.setItem("data", JSON.stringify([...records, inputData]))

  }
  const [sort, setSort] = useState("")

  const Data = useMemo(() => {
    if (sort === "fname") {
      return records.sort((a, b) => a["fname"].localeCompare(b["fname"]));
    }
    else if (sort === "sname") {
      return records.sort((a, b) => a["sname"].localeCompare(b["sname"]));
    }
    else if (sort === "email") {
      return records.sort((a, b) => a["email"].localeCompare(b["email"]));
    }
    else {
      return records;
    }
  }, [sort, records])

  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState("")

  const data1 = useMemo(() => {

    if (selected === 'fname') {
      return records.filter((item) => item.fname.toLowerCase().includes(search.toLowerCase()))
    }
    if (selected === 'sname') {
      return records.filter((item) => item.sname.toLowerCase().includes(search.toLowerCase()))
    }
    if (selected === 'email') {
      return records.filter((item) => item.email.toLowerCase().includes(search.toLowerCase()))
    }
    else {
      return records;
    }
  }, [selected, records, search])

  console.log(data1)

  return (
    <>
      <h1>hello</h1>
      <div style={{ padding: "3%", backgroundColor: "lightsteelblue" }}>
        <h4>:......Dropdown sorting & searching......:</h4>
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
        <div>
          <input type="text" onChange={(e) => setSearch(e.target.value)} value={search}></input>
          {/* <select >
            <option><button onClick={(e) => setSelected(e.target.innerText)}>fname</button></option>
            <option ><button onClick={(e) => setSelected(e.target.innerText)}>sname</button></option>
            <option><button onClick={(e) => setSelected(e.target.innerText)}>email</button></option>
          </select> */}
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={[
              {
                value: 'jack',
                label: <button onClick={(e) => setSelected(e.target.innerText)}>fname</button>,
              },
              {
                value: 'lucy',
                label: <button onClick={(e) => setSelected(e.target.innerText)}>sname</button>,
              },
              {
                value: 'tom',
                label: <button onClick={(e) => setSelected(e.target.innerText)}>email</button>,
              },
            ]}
          /><br />
          <Button type="primary" onClick={showModal}>
            Open Modal
          </Button>
          <Modal title="search form" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <input type="text" value={search} onChange={(e) => setSearch(e)} ></input>

          </Modal>
        </div>
        <div>
          <table className="table table-hover table-striped">
            <thead>
              <th>fname</th>
              <th>sname</th>
              <th>email</th>
              <th>password</th>
              <th>
                <select onChange={(e) => setSort(e.target.value)}>
                  <option value="fname">fname</option>
                  <option value="sname">sname</option>
                  <option value="email">email</option>
                  <option value="pass">pass</option>
                </select>
              </th>

            </thead>
            <tbody>{
              data1?.map((item, index) => {
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
      </div>



    </>
  )
}







































































// switch case.///

{/* <select id='select1' name='select1' onChange={(e) => setSelect1(e.target.value)}>
                    <option onChange={() => sortdata()} value={"Std1"}>Full Name</option>
                    <option onChange={() => sortdata()} value={"Std2"}>Age</option>
                    <option onChange={() => sortdata()} value={"Std3"}>Email</option>
                    <option onChange={() => sortdata()} value={"std4"}>Password</option>
                </select><br /><br />
[4:34 PM] const sortdata = () => {
        // const sorttable = search.sort((a, b) => { return (a["fname,age,mail,password"].localeCompare(b["fname,age,mail,password"])) })
        // setSearch([...sorttable])
        switch (select1) {
            case 'Std1': {
                const sorttable = search.sort((a, b) => { return (a.fname.localeCompare(b.fname)) })
                console.log(sorttable);
                setSearch([...sorttable])
                break;
            }
            case 'Std2': {
                const sorttable = search.sort((a, b) => { return (a.age.localeCompare(b.age)) })
                console.log(sorttable);
                setSearch([...sorttable])
                break;
            }
            case 'Std3': {
                const sorttable = search.sort((a, b) => { return (a.mail.localeCompare(b.mail)) })
                console.log(sorttable);
                setSearch([...sorttable])
                break;
            }
            case 'Std4': {
                const sorttable = search.sort((a, b) => { return (a.password.localeCompare(b.password)) })
                console.log(sorttable);
                setSearch([...sorttable])
                break;
            }
        }
    } */}
// const handleSearch = () => {

//   setRecordss(records.filter((item) => item.fname.toLowerCase() === Searchdata.toLowerCase()))
// }