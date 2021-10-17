import React from 'react';

import { ElementStyleProps } from 'constants/interfaces';
import 'components/text-holder/text_holder';

import './styles.css'

interface TextHolderProps extends ElementStyleProps {
  text: string;
}

const TextHolder = (props: TextHolderProps) => {

  return(
    <div className={props.classes}
      style={props.style}
    >
      {props.text}
    </div>
  )
}

export default TextHolder;