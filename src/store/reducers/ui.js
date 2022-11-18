import {

    UI_SHOW_MODAL,
    UI_HIDE_MODAL

} from '../actions/actionTypes';

const initialState = {

    modalVisibleAlert: false,
    modalType: '',
    modalMessage: '',

};

const reducer = (state = initialState, action) => {
    switch (action.type) {


        case UI_SHOW_MODAL:
            return {
                ...state,
                modalVisibleAlert: true,
                modalType: action.modalType,
                modalMessage: action.modalMessage,
            };
        case UI_HIDE_MODAL:
            return {
                ...state,
                modalVisibleAlert: false,
                modalType: '',
                modalMessage: '',
            };
        default:
            return state;
    }
};

export default reducer;
