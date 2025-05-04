import { isAxiosError } from "axios";
import api from "../lib/axios";
import { AuthLogInForm, AuthSingUpForm, ConfirmAccount } from "../types";

export async function createAccount(formData : AuthSingUpForm) {
    try {
        const url = '/auth/sing-up'
        const {data} = await api.post(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function login(formData : AuthLogInForm) {
    try {
        const url = '/auth/log-in'
        const {data} = await api.post(url, formData)
        localStorage.setItem('AUTH_TOKEN', data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export async function confirmAccount(token : ConfirmAccount) {
    try {
        const url = '/auth/confirm-account'
        const {data} = await api.post(url, token)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}