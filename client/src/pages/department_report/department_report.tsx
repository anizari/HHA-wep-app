import React, {useEffect, useRef} from 'react';
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';
import { ReportProps } from 'constants/interfaces';
import ReportDisplay from 'components/report_display/report_display';
import { ElementStyleProps } from 'constants/interfaces';
import SideBar from 'components/side_bar/side_bar';
import Header from 'components/header/header';
import {useTranslation} from "react-i18next";
import { CSVLink } from "react-csv";
import { PDFExport } from '@progress/kendo-react-pdf';
import './department_report.css'


interface DepartmentReportProps extends ElementStyleProps {
  edit: boolean;
};

interface UrlParams {
  id: string;
};

const DepartmentReport = (props : DepartmentReportProps) => {

  const {t} = useTranslation();
  const { id } = useParams<UrlParams>();
  const getReportApi = `/api/report/viewreport/${id}`;
  const [ report, setReport] = useState<ReportProps>({});
  const [ csvData, setCsvData ] = useState<Object[]> ([]);
  const apiSource = Axios.CancelToken.source();
  const pdfExportComponent = useRef(null);
  const handleExportWithComponent  = () => {
    pdfExportComponent.current.save();
  }

  useEffect(() => {
    console.log(csvData);
  }, [csvData])

  useEffect(() => {
    let data: Object[] = [];
    if (report.formData !== undefined && report.formData !== null) {
      Object.keys(report.formData).forEach((key) => {
        let reportType = typeof (report.formData[key]);
        if (reportType === 'number' || reportType === 'string' || reportType === 'boolean') {
          let item: Object = {};
          item['Heading'] = key;
          item['Detail'] = report.formData[key];
          data.push(item);
        } else {
          let objReport: ReportProps = report.formData[key];
          if (objReport !== undefined && objReport !== null) {
            Object.keys(objReport).forEach((key1) => {
              let innerReportType = typeof (objReport[key1]);
              if (innerReportType === 'number' || innerReportType === 'string' || innerReportType === 'boolean') {
                let tempKey = key + "_" + key1;
                let item: Object = {};
                item['Heading'] = tempKey;
                item['Detail'] = objReport[key1];
                data.push(item);
              } else {
                let innerReport = objReport[key1];
                if (innerReport !== undefined && innerReport !== null) {
                  Object.keys(innerReport).forEach((key2) => {
                    let tempKey = key + "_" + key1 + "_" + key2;
                    let item: Object = {};
                    item['Heading'] = tempKey;
                    item['Detail'] = innerReport[key2];
                    data.push(item);
                  })
                }
              }
            })
          }
        }
      })
    }
    setCsvData(data);
  }, [report])


  // Get Report Id when Loaded
  useEffect(() => {
    let isMounted = true;
    async function getReport() {
      const reportFromServer = await fetchReport();
      if (isMounted)
        setReport(reportFromServer);
    }
    
    getReport();

    return function cancelReqWhenUnmounted() {
      isMounted = false;
      apiSource.cancel();
    }
  }, []);

  async function fetchReport() {
    try {
      const res = await Axios.get(getReportApi, {
        cancelToken: apiSource.token
      });
      return res.data;
    } catch (err) {
      if (Axios.isCancel(err)) {
        console.log(`Info: Cancel subscription to ${getReportApi} API`, err);
      }
      else { console.log(err); }
    }
    return {};
  }

  function getClassName() {
    if (props.classes === undefined)
      return 'department-report';
    else
      return `department-report ${props.classes}`;
  }

  return (
    <div className={getClassName()}>
      <SideBar/>

      <main className="container-fluid">
        <Header/>
        <div className='mt-2'>

          {/* Dept Title */}
          <section className='mt-3'>
            <h1 className="lead text-center">{t("departmentReportDisplayDepartmentNICU")}</h1>
          </section>

          {/* Utility buttons */}
          {
            (props.edit === true) ?
              <section className='mt-3'>
                <div className='container w-50'>
                  <ul className='row justify-content-md-center'>
                    <li className='col-sm-auto'><button className="">{t("departmentReportDisplaySave")}</button></li>
                    <li className='col-sm-auto'>
                      <Link to={'/Department1NICU'}>
                        <button className="">{t("Discard")}</button>
                      </Link>
                    </li>
                    <li className='col-sm-auto'><button className="">{t("departmentReportDisplaySubmit")}</button></li>
                  </ul>
                </div>
              </section>
            :
              <section className="mt-3">
                <div className="container w-50 text-center">
                  <ul className='row justify-content-md-center'>
                    <li className='col-sm-auto'>
                      <Link to={'/Department1NICU'}>
                        <button className="">{t("departmentReportDisplayBack")}</button>
                      </Link>
                    </li>
                    <li className='col-sm-auto'>
                      <CSVLink
                          data={csvData} filename={id} >
                        <button
                            className=""
                            color="primary">
                          Download CSV
                        </button>
                      </CSVLink>
                    </li>
                    <li className='col-sm-auto'>
                      <div  className="button-area">
                        {/*<button onClick={toggleShow}>show</button>*/}
                        <button onClick={handleExportWithComponent}>Generate PDF</button>
                      </div>
                    </li>
                  </ul>

                </div>
              </section>
          }

          {/* Report Details */}
          <section className='mt-3' id="report">
            <PDFExport  ref={pdfExportComponent}  paperSize="A4" fileName={id}>
              <div className="container w-50">
                {
                  (Object.keys(report).length===0 ) ?
                      <h3 className="lead">{t("departmentReportDisplayNoReportFound")}</h3>:
                      <ReportDisplay
                          report = {report.formData as ReportProps}
                          edit = {props.edit}
                      />
                }
              </div>
            </PDFExport>
          </section>

        </div>
      </main>
    </div>
  )
}

export default DepartmentReport;
