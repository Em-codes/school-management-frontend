import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import SearchBar from './SearchBar';
import axios from 'axios';
import SortByOrder from './SortByOrder';
import TextField from './TextField';
import { Formik, Form } from 'formik';
import { validateScore } from '../utils/validateForm';
import { DotsThreeOutlineVertical } from 'phosphor-react'


export const DataTable = ({ tableHeading, tableData, searchTerm, setSearchTerm, setData, url, tableTitle }) => {
    const history = useHistory();
    const fetchAllStudents = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        };

        try {
            const { data } = await axios.get(url, config);
            setData(data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        if (searchTerm !== '') {
            const searchFilter = tableData && tableData.filter((user) =>
                user.firstName.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                user.lastName.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLocaleLowerCase())
            )
            setData(searchFilter)
        } else {

            fetchAllStudents();
        }
    }, [searchTerm])





    const moreDetails = (value) => {
        value.role === 'student' && history.push(`students/student/${value._id}`)
        value.role === 'teacher' && history.push(`lecturers/lecturer/${value._id}`)
    }


    const renderTableHeading = tableHeading.map((table, i) => (
        <TableHeads key={i}>{table.title}</TableHeads>
    ))

    const renderAllStudents = tableData && tableData.map((val, i) => (
        <CustomTableRow onClick={() => moreDetails(val)} key={i}>
            <TableData> {1 + i} </TableData>
            <TableData> {val.firstName} </TableData>
            <TableData> {val.lastName}  </TableData>
            <TableData> {val.gender}  </TableData>
            <TableData> {val.email}  </TableData>
            <TableData><button> <DotsThreeOutlineVertical size={20} color="#494949dc" weight="bold" /> </button></TableData>
        </CustomTableRow>

    ))

    return (
        <TableWrapper>
            <h1 className='ml-2 py-3 sm:text-xl text-lg' >{tableTitle}</h1>
            <div className='flex justify-between items-center p-2'>
                <div className='flex'>
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>
                <SortByOrder tableData={tableData} setData={setData} url={url} />
            </div>
            <TableAdjustMobile>
                <CustomTable>
                    <CustomTableHead >
                        <tr>
                            {renderTableHeading}
                        </tr>
                    </CustomTableHead>
                    <tbody className='w-full'>
                        {renderAllStudents}
                    </tbody>
                </CustomTable>
            </TableAdjustMobile>
        </TableWrapper>
    )
}




export const DataTableAcademics = ({ tableData, tableHeading, showBtn }) => {
    const renderTableHeading = tableHeading.map((table, i) => (
        <TableHeads key={i}>{table.title}</TableHeads>
    ))

    const renderAllScores = tableData && tableData.courses.map((course, i) => (
        <CustomTableRow key={i}>
            <TableData> {1 + i} </TableData>
            <TableData>{course.code}</TableData>
            <TableData>{course.title}</TableData>
            <TableData>
                <Formik
                    initialValues={{
                        score: course.score
                    }}
                    validationSchema={validateScore}
                    onSubmit={async (values) => {

                        const config = {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                            },
                        };

                        try {
                            await axios.put(`http://localhost:4000/private/update-score/${course._id}`, { ...values }, config);
                            alert('score has been updatd')
                        } catch (error) {
                            console.log(error)
                        }
                    }}>
                    {formik => (
                        <Form>
                            <div className='flex items-center justify-between'>
                                {/* <div className='border border-black'> */}
                                <TextField label={''} name={'score'} type={'number'} />
                                {/* </div> */}

                                {showBtn && <button type='submit'>Update Score</button>}
                            </div>

                        </Form>

                    )}
                </Formik>
            </TableData>
            <TableData>{course.units}</TableData>

        </CustomTableRow>

    ))

    return (
        <TableWrapper>
            <CustomTable>
                <CustomTableHead >
                    <tr>
                        {renderTableHeading}
                    </tr>

                </CustomTableHead>
                <tbody className='w-full'>
                    {renderAllScores}
                </tbody>
            </CustomTable>
        </TableWrapper>
    )
}




const TableWrapper = styled.section`
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    background-color: #fff;
    padding-bottom: 40px;
`
const TableAdjustMobile = styled.div`
     overflow-x:auto ;
`
const CustomTable = styled.table`
    width: 100%;
    tr:nth-of-type(even) {
        background:#f4f4f4 ;
    }
`
const CustomTableHead = styled.thead`
    background: #072038;
   
`
const CustomTableRow = styled.tr`
    width: 100%; cursor:pointer ; border-bottom: 1px solid #95999b74;

`
const TableHeads = styled.th`
    text-align: left;
    padding:8px 16px;
    font-size: 16px;
    color:#fff;
`
const TableData = styled.td`
    padding:8px 16px;
    font-size: 15px;
`