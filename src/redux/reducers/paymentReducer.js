import { SAVE_PAYMENT_METHOD } from "../constants/paymentConstants";

const paymentState = {
    paymentMethod:"PayPal"
}

  export const paymentReducer=(state=paymentState,action)=>{
    switch(action.type){
        case SAVE_PAYMENT_METHOD:
            return {...state,
                paymentMethod: action.payload
            };

            
        
            default: return state
    }
}