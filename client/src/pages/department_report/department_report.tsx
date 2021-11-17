import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import Axios from 'axios';

import { ReportProps } from 'constants/interfaces';
import ReportDisplay from 'components/report_display/report_display';

import { ElementStyleProps } from 'constants/interfaces';
import SideBar from 'components/side_bar/side_bar';
import Header from 'components/header/header';
import './department_report.css'
import {useTranslation} from "react-i18next";


interface DepartmentReportProps extends ElementStyleProps {
  edit: boolean;
};

interface UrlParams {
  id: string;
};

const DepartmentReport = (props : DepartmentReportProps) => {
  const { id } = useParams<UrlParams>();
  const getReportApi = `/api/report/viewreport/${id}`;
  const [ report, setReport] = useState<ReportProps>({});
  const apiSource = Axios.CancelToken.source();
  // Get Report Id when Loaded
  useEffect(() => {
    let isMounted = true;
    async function getReport() {
      const reportFromServer = await fetchReport();
      if (isMounted)
        setReport(reportFromServer);
    };
    
    getReport();

    return function cancelReqWhenUnmounted() {
      isMounted = false;
      apiSource.cancel();
    }
  });

  async function fetchReport() {
    try {
      const res = await Axios.get(getReportApi, {
        cancelToken: apiSource.token
      });
      return res.data;
    } catch (err) {
      if (Axios.isCancel(err)) {
        console.log(`Info: Cancel subsciption to ${getReportApi} API`, err);
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

  const {t, i18n} = useTranslation();

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


          {/* Report Details */}
          <section className='mt-3'>
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
                  <Link to={'/Department1NICU'}>
                    <button className="">{t("departmentReportDisplayBack")}</button>
                  </Link>
                </div>
              </section>
          }

        </div>
      </main>
    </div>
  )
}

export default DepartmentReport;
