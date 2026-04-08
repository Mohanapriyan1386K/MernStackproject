
import {createSlice, type PayloadAction} from "@reduxjs/toolkit"


interface Modalstate{
    currentModal:any;
    modalProps:any
}


const initialState:Modalstate={
    currentModal:null,
    modalProps:{}
}

const modalSlice=createSlice({
    name:"modal",
    initialState,
    reducers:{
       openModal:(state,action:PayloadAction<{modalname:any,modalprops:any}>)=>{
        state.currentModal=action.payload.modalname
        state.modalProps=action.payload.modalprops
       },
       closeModal:(state)=>{
         state.currentModal=null;
         state.modalProps={}
       }
    }
})

export const {closeModal,openModal}=modalSlice.actions;

export default modalSlice.reducer;