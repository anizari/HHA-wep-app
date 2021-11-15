import React, { useState } from "react";
import { RouteComponentProps} from "react-router-dom";
import { useForm } from 'react-hook-form';
import { ElementStyleProps } from "constants/interfaces";
import SideBar from 'components/side_bar/side_bar';
import Header from 'components/header/header'
import { CaseStudyModel } from "./CaseStudies"
import axios from 'axios';
import "./case_study_form.css";
import {useTranslation} from "react-i18next";

interface CaseStudyMainProps extends ElementStyleProps {
};

interface CaseStudyMainProps extends RouteComponentProps {};

export const CaseStudyForm = (props: CaseStudyMainProps) => {
    const [formOption, setformOption] = useState("");

    function refreshForm(formNum) {
        setformOption(formNum);
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CaseStudyModel>({});
    const { register: register2, handleSubmit: handleSubmit2, formState: { errors: errors2 }, reset: reset2 } = useForm<CaseStudyModel>({});
    const { register: register3, handleSubmit: handleSubmit3, formState: { errors: errors3 }, reset: reset3 } = useForm<CaseStudyModel>({});
    const { register: register4, handleSubmit: handleSubmit4, formState: { errors: errors4 }, reset: reset4 } = useForm<CaseStudyModel>({});
    const { register: register5, handleSubmit: handleSubmit5, formState: { errors: errors5 }, reset: reset5 } = useForm<CaseStudyModel>({});

    const onSubmit = (data: any) => {
        data.caseStudyType = parseInt(formOption) - 1;

        console.log(data);
        axios.post('/api/casestudies', data).then(res => {
            console.log(res.data);
        }).catch(error =>{
            console.error('Something went wrong!', error.response);
        });

        reset({});
        reset2({});
        reset3({});
        reset4({});
        reset5({});
    }

    const {t, i18n} = useTranslation();

    return (
    <div className={'case-study-form '+ props.classes}>
        <SideBar/>

        <main className="container">
        {/*<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">*/}
            <Header/>

            <div className="col-md-4">
                <button type="button" className="btn btn-primary btn-md" onClick={() => {
                    props.history.push("/caseStudyMain");
                }}>{t("caseStudyFormBack")}</button>
            </div>

             <div>
                 <form>
                   <div className="form-group col-md-6">
                     <label className = "font-weight-bold">{t("caseStudyFormCaseStudyOptions")}</label>
                     <select className="form-control" id="CaseStudyType" onChange={(e)=> {
                                        const selectedForm = e.target.value;
                                        setformOption(selectedForm);
                                        }}>
                       <option selected>{t("caseStudyFormClickToSelect")}</option>
                       <option value = "1" >{t("caseStudyFormPatientStory")}</option>
                       <option value = "2" >{t("caseStudyFormStaffRecognition")}</option>
                       <option value = "3" >{t("caseStudyFormTrainingSession")}</option>
                       <option value = "4" >{t("caseStudyFormEquipmentReceived")}</option>
                       <option value = "5" >{t("caseStudyFormOtherStory")}</option>
                     </select>
                   </div>
                </form>
             </div>
            <form onSubmit={handleSubmit(onSubmit)}>
             <div className={`form-group col-md-6 ${formOption === "1" ? "d-block" : "d-none"}`} id="Form1">
               <label className = "font-weight-bold">{t("caseStudyFormPatientStoryCaseStudy")}</label>
                <div className="form-row">
                    <div className="col-md-8">
                        <label htmlFor="Patient Name">{t("caseStudyFormPatientName")}</label>
                        <input className="form-control mb-2 mt-0" type="text" id="Patient Name" required {...register("patientStory.patientsName", {required: true})}></input>
                    </div>
                     <div className="col-md-4">
                        <label htmlFor="Patient Age">{t("caseStudyFormPatientAge")}</label>
                        <input className="form-control mb-2 mt-0" type="number" id="Patient Age" required {...register("patientStory.patientsAge", {required: true})}></input>
                     </div>
                </div>
                <label htmlFor="Patient From">{t("caseStudyFormWherePatientFrom")}</label>
                <input className="form-control mb-2 mt-0" type="text" id="Patient From" required {...register("patientStory.whereIsThePatientFrom", {required: true})}></input>
                <label htmlFor="Patient Choose">{t("caseStudyFormWhyPatientChooseHCBH")}</label>
                <input className="form-control mb-2 mt-0" type="text" id="Patient Choose" required {...register("patientStory.whyComeToHCBH", {required: true})}></input>
                <label htmlFor="How long">{t("caseStudyFormHowLongAtHCBH")}</label>
                <input className="form-control mb-2 mt-0" type="text" id="How long" required {...register("patientStory.howLongWereTheyAtHCBHinDays", {required: true})}></input>
                <label htmlFor="Diagnosis">{t("caseStudyFormWhatWasTheirDiagnosis")}</label>
                <textarea className="form-control mb-2 mt-0" id="Diagnosis" required {...register("patientStory.diagnosis", {required: true})}></textarea>
                <label htmlFor="Case Study 1">{t("caseStudyFormCaseStudy/Story")}</label>
                <textarea className="form-control mb-2 mt-0" id="Case Study 1" required {...register("patientStory.caseStudyStory", {required: true})}></textarea>
                <label className="form-label">{t("caseStudyFormUploadImage")}</label>
                <input type="file" accept="image/*" className="form-control" id="customFile"/>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="invalidCheck1" required></input>
                    <label className="form-check-label" htmlFor="invalidCheck1">{t("caseStudyFormPermissionToShare")}</label>
                </div>
                <div>
                <button className="btn btn-primary" type="submit">{t("caseStudyFormSubmitForm")}</button>
                </div>
             </div>
            </form>
            <form onSubmit={handleSubmit2(onSubmit)}>
             <div className={`form-group col-md-6 ${formOption === "2" ? "d-block" : "d-none"}`} id="Form2">
               <label className = "font-weight-bold">Staff Recognition Case Study</label>
                <div className="form-row">
                    <div className="col-md-6">
                        <label htmlFor="Staff Name">Staff Name</label>
                        <input className="form-control mb-2 mt-0" type="text" id="Staff Name" required {...register2("staffRecognition.staffName", {required: true})}></input>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="Role">Role/Job Title</label>
                        <input className="form-control mb-2 mt-0" type="text" id="Role" required {...register2("staffRecognition.jobTitle", {required: true})}></input>
                    </div>
                </div>
                <label htmlFor="Which dept work">Which department do they work in?</label>
                <input className="form-control mb-2 mt-0" type="text" id="Which dept work" required {...register2("staffRecognition.department", {required: true})}></input>
                <label htmlFor="How long working">How long have they been working at HCBH?</label>
                <input className="form-control mb-2 mt-0" type="text" id="How long working" required {...register2("staffRecognition.howManyMonthsWorkingAtHCBH", {required: true})}></input>
                <label htmlFor="What enjoy">What do they enjoy the most about working at HCBH?</label>
                <textarea className="form-control mb-2 mt-0" id="What enjoy" required {...register2("staffRecognition.mostEnjoy", {required: true})}></textarea>
                <label htmlFor="Case Study 2">Case Study/Story</label>
                <textarea className="form-control mb-2 mt-0" id="Case Study 2" required {...register2("staffRecognition.caseStudyStory", {required: true})}></textarea>
                <label className="form-label">Upload Image</label>
                <input type="file" accept="image/*" className="form-control" id="customFile" />
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="invalidCheck2" required></input>
                    <label className="form-check-label" htmlFor="invalidCheck2"> This person has given permission to share their story and photo in HHA communications, including online platforms</label>
                </div>
                <div>
                <button className="btn btn-primary" type="submit">Submit form</button>
                </div>
             </div>
            </form>
            <form onSubmit={handleSubmit3(onSubmit)}>
             <div className={`form-group col-md-6 ${formOption === "3" ? "d-block" : "d-none"}`} id="Form3">
               <label className = "font-weight-bold">Training Session Case Study</label>
                <div className="form-row">
                    <div className="col-md-6">
                        <label htmlFor="Train Date">Training Date</label>
                        <input className="form-control mb-2 mt-0" type="text" id="Train Date" required {...register3("trainingSession.trainingDate", {required: true})}></input>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="Train On">What was the training on?</label>
                        <input className="form-control mb-2 mt-0" type="text" id="Train On" required {...register3("trainingSession.trainingOn", {required: true})}></input>
                    </div>
                </div>
                <label htmlFor="Train Who">Who conducted training?</label>
                <input className="form-control" type="text" id="Train Who" required {...register3("trainingSession.whoConducted", {required: true})}></input>
                <label htmlFor="Who attended">Who attended the training?</label>
                <textarea className="form-control" id="Who attended" required {...register3("trainingSession.whoAttended", {required: true})}></textarea>
                <label htmlFor="How train">How will the training benefit HCBH and its staff?</label>
                <textarea className="form-control" id="How train" required {...register3("trainingSession.benefitsFromTraining", {required: true})}></textarea>
                <label htmlFor="Case Study 3">Case Study/Story</label>
                <textarea className="form-control" id="Case Study 3" required {...register3("trainingSession.caseStudyStory", {required: true})}></textarea>
                <label className="form-label">Upload Image</label>
                <input type="file" accept="image/*" className="form-control" id="customFile" />
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="invalidCheck3" required></input>
                    <label className="form-check-label" htmlFor="invalidCheck3"> This person has given permission to share their story and photo in HHA communications, including online platforms</label>
                </div>
                <div>
                <button className="btn btn-primary" type="submit">Submit form</button>
                </div>
             </div>
            </form>
            <form onSubmit={handleSubmit4(onSubmit)}>
             <div className={`form-group col-md-6 ${formOption === "4" ? "d-block" : "d-none"}`} id="Form4">
               <label className = "font-weight-bold">Equipment Received Case Study</label>
                <div className="form-row">
                    <div className="col-md-6">
                        <label htmlFor="What equipment">What equipment was received?</label>
                        <input className="form-control mb-2 mt-0" type="text" id="What equipment" required {...register4("equipmentReceived.equipmentReceived", {required: true})}></input>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="Which dept receive">Which department received it?</label>
                        <input className="form-control mb-2 mt-0" type="text" id="Which dept receive" required {...register4("equipmentReceived.departmentIdReceived", {required: true})}></input>
                    </div>
                </div>
                 <div className="form-row">
                    <div className="col-md-6">
                        <label htmlFor="Equipment from">Who was the equipment from?</label>
                        <input className="form-control mb-2 mt-0" type="text" id="Equipment from" required {...register4("equipmentReceived.whoSentEquipment", {required: true})}></input>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="Donate/Purchase">Was it donated or purchased?</label>
                        <input className="form-control mb-2 mt-0" type="text" id="Donate/Purchase" required {...register4("equipmentReceived.purchasedOrDonated", {required: true})}></input>
                    </div>
                </div>
                <label htmlFor="Equipment Purpose">What does this new equipment do?</label>
                <textarea className="form-control" id="Equipment Purpose" required {...register4("equipmentReceived.whatDoesEquipmentDo", {required: true})}></textarea>
                <label htmlFor="Case Study 4">Case Study/Story</label>
                <textarea className="form-control" id="Case Study 4" required {...register4("equipmentReceived.caseStudyStory", {required: true})}></textarea>
                <label className="form-label">Upload Image</label>
                <input type="file" accept="image/*" className="form-control" id="customFile" />
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="invalidCheck4" required></input>
                    <label className="form-check-label" htmlFor="invalidCheck4"> This person has given permission to share their story and photo in HHA communications, including online platforms</label>
                </div>
                <div>
                <button className="btn btn-primary" type="submit">Submit form</button>
                </div>
            </div>
            </form>
            <form onSubmit={handleSubmit5(onSubmit)}>
            <div className={`form-group col-md-6 ${formOption === "5" ? "d-block" : "d-none"}`} id="Form5">
                <label className = "font-weight-bold">Other Story Case Study</label>
                <div>
                    <label htmlFor="Case Study 5">Case Study/Story</label>
                    <textarea className="form-control mb-2 mt-0" placeholder="Case Study/Story" id="Case Study 5" required {...register5("otherStory.caseStudyStory", {required: true})}></textarea>
                    <label className="form-label">Upload Image</label>
                    <input type="file" accept="image/*" className="form-control" id="customFile" />
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="invalidCheck5" required></input>
                        <label className="form-check-label" htmlFor="invalidCheck5"> This person has given permission to share their story and photo in HHA communications, including online platforms</label>
                    </div>
                </div>
                <div>
                <button className="btn btn-primary" type="submit">Submit form</button>
                </div>
            </div>
            </form>



        </main>

    </div>
    );
};



//
//                 <button className="caseTwo-button"
//                         onClick={() => {props.history.push("/caseStudyMain");}}>
//                 </button>
// onChange={(val) => setForm(this.value)}
//                 <button className="caseOne-button"
//                         onClick={() => {props.history.push("/caseStudyMain");}}>
//                 </button>
//                 <button className="case-study-more-button"
//                         onClick={() => {props.history.push("/caseStudyMain");}}>
//                 </button>
// function setForm(value: any) {

 //              if(value == "form1"){
   //                    document.getElementById('form1')!.style.display = 'hidden';
     //                  }
       //        else if (value == "form2"){

         //              }
           //}