import React from 'react';
import {Input} from '@ui-kitten/components';

const CustomField = (props) => {
    return (
        <Input
        placeholder={props.placeholder}
        value={props.value}
        label= {props.label}
        multiline = {props.multiline}
        height = {props.height}
        onChangeText={props.onChangeText}
      />
    )
}

export default CustomField;