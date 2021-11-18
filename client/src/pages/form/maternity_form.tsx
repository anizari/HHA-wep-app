import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import SideBar from "../../components/side_bar/side_bar";
import Header from 'components/header/header';
import maternityModel from './models/maternityModel.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import './nicu_form_styles.css'
import { spawn } from 'child_process';



function MaternityForm() {
    const { register, handleSubmit, reset, } = useForm({});
    const [formModel, setFormModel] = useState({});
    const [formValuesComeFrom, setFormValuesComeFrom] = useState<{ name: any; value: any; }[]>([])
    const [formValuesAdCondition, setFormValuesAdCondition] = useState<{ name: any; value: any; }[]>([])
    const [formValuesOutCondition, setFormValuesOutCondition] = useState<{ name: any; value: any; }[]>([])
    const [sectionState, setSectionState] = useState(0);

    const history = useHistory();

    useEffect(() => {
        const getData = async () => {
            await setFormModel(maternityModel);
            setSectionState(0);
        }

        getData();
    }, [])

    useEffect(() => {
        sidePanelClick(sectionState);
    })

    const elements: any = Object.values(formModel);
    const fields: any = elements[0];

    function refreshPage() {
        window.location.reload();
    }

    const onSubmit = async (data: any) => {
        // var valid = submitValidation();

        // if (valid === true) {

        //     data.departmentId = 1;
        //     data.admissions.comeFrom.otherDepartments = formValuesComeFrom;
        //     data.admissions.mainCondition.otherMedical = formValuesAdCondition;
        //     data.numberOfOutPatients.mainCondition.otherMedical = formValuesOutCondition;
        //     await axios.post('/api/report/add', data).then(res => {
        //         console.log(res.data);
        //     }).catch(error => {
        //         console.error('Something went wrong!', error.response);
        //     });

        //     //console.log(data);
        //     history.push("/Department1NICU");
        // } else {
        //     console.log(valid);
        //     alert("Some fields contain invalid values");
        //     window.scrollTo(0, 0);
        // }

    }

    const clickPrevious = () => {
        sidePanelClick(sectionState - 1);
        window.scrollTo(0, 0);
    }

    const clickNext = () => {
        sidePanelClick(sectionState + 1);
        window.scrollTo(0, 0);
    }

    const handleChange = (ID: any, i: any, e: { target: { name: any; value: any; }; }, j: number) => {
        switch (ID) {
            case 'admissions.comeFrom.otherDepartments':
                let newFormValuesComeFrom = [...formValuesComeFrom];
                if (j === 0) {
                    newFormValuesComeFrom[i].name = e.target.value;
                } else {
                    newFormValuesComeFrom[i].value = e.target.value;
                }

                setFormValuesComeFrom(newFormValuesComeFrom);
                break;
            case 'admissions.mainCondition.otherMedical':
                let newFormValuesAdCond = [...formValuesAdCondition];
                if (j === 0) {
                    newFormValuesAdCond[i].name = e.target.value;
                } else {
                    newFormValuesAdCond[i].value = e.target.value;
                }

                setFormValuesAdCondition(newFormValuesAdCond);
                break;
            case 'numberOfOutPatients.mainCondition.otherMedical':
                let newFormValuesOutCond = [...formValuesOutCondition];
                if (j === 0) {
                    newFormValuesOutCond[i].name = e.target.value;
                } else {
                    newFormValuesOutCond[i].value = e.target.value;
                }

                setFormValuesOutCondition(newFormValuesOutCond);
                break;

            default:

        }

    }

    const addFormFields = (ID: number) => {

    }

    const removeFormFields = (ID: any, i: number) => {

    }

    const sidePanelClick = (index: any) => {
        const currentClass = document.getElementsByClassName("list-group-item");
        let startj = 1;
        for (let i = 0; i < currentClass.length; i++) {
            currentClass[i].classList.remove("active");
            if (currentClass[i].childNodes.length > 1) {
                currentClass[i].removeChild(currentClass[i].childNodes[1])
            }

            var show = "none"
            if (i === index) {
                setSectionState(index);
                currentClass[index].classList.add("active");
                show = "";
            }

            document.getElementById("section" + i)!.style.display = show;
            for (let j = 1; j <= elements[i].section_fields.length; j++, startj++) {
                if (document.getElementById("subsection" + startj)) document.getElementById("subsection" + startj)!.style.display = show;
                if (document.getElementById("input" + startj)) document.getElementById("input" + startj)!.style.display = show;
                if (document.getElementById("inputs" + startj)) document.getElementById("inputs" + startj)!.style.display = show;
            }
        }
    }



    let fieldCount = 0;

    document.body.classList.add("bg-light");

    return (
        <div className="nicu_form">
            <SideBar />

            <main className="container">
                <Header />

                <div className="py-3 text-start">
                    <h2>Maternity Form</h2>
                    <p className="lead">For: September 2021</p>
                </div>

                <div className="row g-3">
                    <div className="col-sm-4 col-md-4 col-lg-4">

                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-primary">Steps</span>
                        </h4>

                        <ul className="list-group mb-3">
                            {elements ? elements.map((section: any, idx: any) => {
                                var isActive = idx === 0 ? true : false;
                                return (
                                    <>
                                        <li className={isActive ? "list-group-item d-flex justify-content-between active" : "list-group-item d-flex justify-content-between"}
                                            onClick={() => sidePanelClick(idx)}>
                                            <span>{idx + 1}. {section.section_label}</span>
                                        </li>
                                    </>
                                )
                            }) : null}
                        </ul>

                        <button className="w-100 btn btn-primary btn-lg" type="submit" onClick={handleSubmit(onSubmit)}>Submit</button>
                    </div>


                    <div className="col-sm-7 col-md-7 col-lg-7">
                        <form onSubmit={handleSubmit(onSubmit)} className="needs-validation">
                            <div className="row g-2">
                                {elements ? elements.map((section: any, idx: any) => {
                                    var ret = [];

                                    // render the section title
                                    ret.push(<h4 id={"section" + idx} className="mb-3">{idx + 1}. {section.section_label}</h4>);

                                    var fields = section.section_fields;

                                    // i is the question number
                                    for (let i = fieldCount + 1; i <= fieldCount + fields.length; i++) {
                                        var field = fields[i - fieldCount - 1];

                                        // render the subsection title
                                        if (field.subsection_label) {
                                            ret.push(<h6 id={"subsection" + i} className={field.field_level === 1 ? "px-5 fw-bold" : "fw-bold"}>{field.subsection_label}</h6>)
                                        }

                                        // render each entry
                                        if (field.field_type === "number") {
                                            ret.push(
                                                <>
                                                    <div id={"input" + i} className={field.field_level === 1 ? "col-sm-10 ps-5" : "col-sm-10"}>
                                                        <span className="align-middle">{i}. {field.field_label}</span>
                                                    </div>
                                                    <div id={"inputs" + i} className="col-sm-2">
                                                        <input type="text" className="form-control" placeholder=""
                                                            {...register(field.field_id)}
                                                        // onBlur={() => inputValidation(i)}
                                                        />
                                                        <div className="invalid-feedback">
                                                            Requires a valid number
                                                        </div>
                                                    </div>
                                                </>
                                            );

                                        } else if (field.field_type === "array") {
                                            var formValues;
                                            if (field.field_id === "admissions.comeFrom.otherDepartments") {
                                                formValues = formValuesComeFrom;
                                            }
                                            var formId = field.field_id;
                                            ret.push(
                                                <>
                                                    <div id={"input" + i} className={field.field_level === 1 ? "ps-5" : ""}>
                                                        <span className="align-middle me-2">{i}. {field.field_label}</span>
                                                        <button type="button" className="btn btn-success btn-sm" onClick={() => addFormFields(i)}>Add</button>
                                                    </div>
                                                    <div id={"inputs" + i} >
                                                        {formValues.map((element, index2) => (
                                                            <div className="row g-3 mb-1">
                                                                <div className={field.field_level === 1 ? "col-sm-10 ps-5" : "col-sm-10"}>
                                                                    <div className="input-group" id={"cf" + i + index2}>
                                                                        <span className="input-group-text" id="">Name and value</span>
                                                                        <input className="form-control" type="text" name="nameOfDepartment"
                                                                            value={element.name || ""}
                                                                            onChange={e => handleChange(field.field_id, index2, e, 0)}
                                                                        // onBlur={() => arrayInputValidation("cf", i, index2, "text")}
                                                                        />
                                                                        <input className="form-control" type="text" name="numberOfPatients"
                                                                            value={element.value || ""}
                                                                            onChange={e => handleChange(field.field_id, index2, e, 1)}
                                                                        // onBlur={() => arrayInputValidation("cf", i, index2, "number")}
                                                                        />
                                                                        <div className="invalid-feedback text-end">
                                                                            Requires a valid number
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-2">
                                                                    <button type="button" className="btn btn-danger btn-sm btn-block" onClick={() => removeFormFields(field.field_id, index2)}>Remove</button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            )
                                        } else if (field.field_type === "table") {
                                            var count = [];
                                            var k = [];
                                            for (let i = 0; i < field.row_labels.length; i++) {
                                                count.push(0);
                                                k.push(0);
                                            }
                                            ret.push(
                                                <>
                                                    <table>
                                                        <tbody>
                                                            {/* COLUMNS */}

                                                            {field.col_labels.map((row, coli) => (
                                                                <tr>
                                                                    {field.row_labels.map((x, y) => (
                                                                        <td></td>
                                                                    ))}

                                                                    {row.map((col, colj) => (
                                                                        <th colSpan={field.col_spans[coli][colj]} scope="colgroup">{field.col_labels[coli][colj]}</th>
                                                                    ))}
                                                                </tr>
                                                            ))}


                                                            {/* ROWS */}
                                                            {[...Array(field.total_rows)].map((e, i) => (
                                                                <tr>
                                                                    {[...Array(field.row_labels.length)].map((e, j) => {
                                                                        if (count[j] === 0) {
                                                                            const header = <th rowSpan={field.row_spans[j][k[j]]}>{field.row_labels[j][k[j]]}</th>
                                                                            count[j]++;

                                                                            if (count[j] === field.row_spans[j][k[j]]) {
                                                                                k[j]++;
                                                                                count[j] = 0;
                                                                            }

                                                                            return header;
                                                                        }else{
                                                                            count[j]++;

                                                                            if (count[j] === field.row_spans[j][k[j]]) {
                                                                                k[j]++;
                                                                                count[j] = 0;
                                                                            }
                                                                            return;
                                                                        }
                                                                    })}

                                                                    {[...Array(field.total_cols)].map((e, j) => {
                                                                        return <td><input type="number" /></td>
                                                                    })}
                                                                </tr>

                                                            ))}
                                                        </tbody>
                                                    </table>

                                                </>
                                            )
                                        }

                                    }

                                    fieldCount += fields.length;
                                    return ret;
                                }) : null}

                                <hr className="my-4"></hr>
                            </div>
                        </form>

                        <div className="btn-group d-flex">
                            <button className="w-100 btn btn-secondary btn-sm" onClick={clickPrevious} disabled={sectionState === 0 ? true : false}>Previous</button>
                            <button className="w-100 btn btn-secondary btn-sm" onClick={clickNext} disabled={sectionState === 2 ? true : false}>Next</button>
                        </div>

                        <button
                            className="w-100 btn btn-primary btn-lg"
                            type="submit"
                            style={{ display: sectionState === 2 ? '' : 'none' }}
                            onClick={handleSubmit(onSubmit)}>
                            Submit
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default MaternityForm;
