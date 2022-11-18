import {
  
    UI_SHOW_MODAL,
    UI_HIDE_MODAL,
   
} from './actionTypes';


export const uiShowModal = (
    // modalType, 
    modalMessage) => {
    return {
        type: UI_SHOW_MODAL,
        // modalType: modalType,
        modalMessage: modalMessage,
    };
};

export const uiHideModal = () => {
    return {
        type: UI_HIDE_MODAL,
    };
};



