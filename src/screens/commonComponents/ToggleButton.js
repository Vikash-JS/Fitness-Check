import React from 'react';

import ToggleSwitch from 'toggle-switch-react-native';
import {Colors, Fonts} from '../../utils/Constants';
const ToggleButton = (props) => {
    return (
        <ToggleSwitch
            isOn={props.isOn}
            onColor="#EFEFEF"
            offColor="#EFEFEF"
            size='medium'
            onToggle={props.onToggle}
            thumbOffStyle={{ backgroundColor: Colors.black, opacity: 0.1 }}
            thumbOnStyle={{ backgroundColor: Colors.blue }}
        />
    )
}
export default ToggleButton;