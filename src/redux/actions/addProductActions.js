import axios from "axios"
import { ADD_PRODUCT, ADD_PRODUCT_FAIL } from "../constants/addProductConstants"
export const addProduct = (name, category, image, price, brand, description) => async (dispatch) => {
    const fd = new FormData();
    fd.append("image", image);
    try {
        const { data } = await axios("http://localhost:5000/products/addprod", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: { name, category, image: fd, price, brand, description }
        })
        dispatch({ type: ADD_PRODUCT, payload: data })

    } catch (error) {
        dispatch({ type: ADD_PRODUCT_FAIL, payload: error.message })
    }
}