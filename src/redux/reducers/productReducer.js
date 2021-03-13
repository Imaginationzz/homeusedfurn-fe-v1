import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants";


const initialState={
    productList: {
        products: [],
        error: false,
        loading:false
      }
};

export const productReducer = (state = initialState, action)=>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return{
                ...state,
                loading:true};
            case PRODUCT_LIST_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    products:action.payload};
                case PRODUCT_LIST_FAIL:
                    return{
                        ...state,
                        loading:false,error:action.payload}
    }
}