import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'components/button/button';
import TextHolder from 'components/text_holder/text_holder';
import { ElementStyleProps} from 'constants/interfaces';

interface ReportSummaryProps extends ElementStyleProps {
  // report: ReportProps;
  reportId: string;
  lastUpdatedOn: string;
  lastUpdatedBy: number;
}

const ReportSummaryRow = (props: ReportSummaryProps) => {

  return (
    <tr className={'report-summary-row '+ (props.classes || '')}>
      <td>
        <Link to={`/Department1NICU/detailed_reports/${props.reportId}`}>
          {props.reportId}
        </Link>
      </td>
      <td> { props.lastUpdatedOn } </td>
      <td>{props.lastUpdatedBy}</td>
      <td><Button value='edit'/></td>
      <td><Button value='del'/></td>
      <td><TextHolder text='tick'/></td>
    </tr>
  );
};

export default ReportSummaryRow;