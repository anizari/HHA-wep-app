import React from 'react';
import { ElementStyleProps, ReportProps } from 'constants/interfaces';
import { ReportDisplay } from 'components/report_display/report_display';
import TextHolder from 'components/text_holder/text_holder';

interface ArrayEntryProps extends ElementStyleProps {
  name: string;
  parentKey: string;
  entries: ReportProps[];
  edit: boolean;
};

export const ArrayEntry = (props : ArrayEntryProps) => {


  return (
    <div className = {'entry array-entry accordion my-2' + (props.classes || '')}
      id={`array_entry_${props.name}`}
    >
      <div className="accordion-item">
        <div className="accordion-header h3-small">
          <button 
            className="accordion-button" 
            type='button'
            data-bs-toggle='collapse'
            data-bs-target={`#collapse_${props.name}`}
          >
            { props.name }
          </button>
        </div>

        <div className="accordion-collapse collapse"
          id={`collapse_${props.name}`}
          data-bs-parent={`#array_entry_${props.name}`}
        >
          <div className="accordion-body text-dark h4-small">
            <>
              {
                props.entries.forEach((entry) => 
                  {<div>
                    {'\t'}<ReportDisplay 
                      report={entry as ReportProps}
                      parentKey={props.parentKey}
                      edit={props.edit} />
                  </div>}
                )
              }
            </>
          </div>
        </div>
      </div>

    </div>);
};