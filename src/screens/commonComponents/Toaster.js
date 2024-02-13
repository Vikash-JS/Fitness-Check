import React from 'react';
import SimpleToast from 'react-native-simple-toast';

export function Toaster(message){
    SimpleToast.showWithGravity(message, SimpleToast.SHORT, SimpleToast.CENTER)
}

