import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM,
    ON_SUCCESS_BY
} from './types';
import { USER_SERVER } from '../components/Config.js';
import { array } from 'yup';
import { message } from 'antd';

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function addToCart(id){

    var body ={
        productId :id
    }

    const request = axios.post(`${USER_SERVER}/addToCart`, body)
    .then(response => response.data);
    message.success("카트에 담는걸 성공하셨습니다!")
    return {
        type: ADD_TO_CART,
        payload: request
    }
}
export function getCartItmes(cartItems, userCart){

    var body ={
        id:cartItems,
        type: array
    }

    const request = axios.post(`/api/product/getProduct`, body)
    .then(response => {
        

        userCart.forEach(item =>{
            response.data.forEach((Product,i)=>{
                if(item.id === Product._id){
                    response.data[i].quantity = item.quantity
                }
            })
        })
        return response.data
    });

    return {
        type: GET_CART_ITEMS,
        payload: request
    }
}
export function removeCartItem(id){
    var body={
        id:id
    }
    const request = axios.post(`/api/users/removeFromCart`,body)
    .then(response => {

        response.data.cart.forEach(item => {
            response.data.productInfo.forEach((Info, i)=>{
                if(item.id === Info._id){
                    response.data.productInfo[i].quantity = item.quantity
                }
            })
        })
        
        return response.data
    });

    return {
        type: REMOVE_CART_ITEM,
        payload: request
    }
}

export function onSuccessBy(data){
    
    const request = axios.post(`/api/users/SuccessBy`,data)
    .then(response => response.data);
    return {
        type: ON_SUCCESS_BY,
        payload: request
    }
}