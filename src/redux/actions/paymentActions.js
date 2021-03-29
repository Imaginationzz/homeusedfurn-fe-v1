import { SAVE_PAYMENT_METHOD } from "../constants/paymentConstants"

export const savePaymentMethod =(data)=>(dispatch)=>{
    dispatch({type:SAVE_PAYMENT_METHOD,payload:data})
}