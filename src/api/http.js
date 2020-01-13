import React from 'react';
import axios from 'axios';
import { message } from 'antd'

const instance = axios.create({
    baseURL: 'http://122.51.175.158:7001',  // 基础domain
    headers:{
        'Content-Type':'application/json;charset=utf-8',
    },
    // timeout: 10000,   // 超时5秒
});

instance.interceptors.request.use(config => {
  const TOKEN = localStorage.getItem('token');
    if (TOKEN) {
        config.headers['Content-Type'] = 'application/json';
        config.headers['Authorization'] = TOKEN; // token
    }
    return config;
}, (error) => {
    message.error('请求错误!');
    return Promise.reject(error);
})

instance.interceptors.response.use((response) => {
    if (response.status === 200||response.status ===201) { // status为200说明请求成功把数据扔出去
        return Promise.resolve(response.data); //把数据抛出去
    } else {
        return Promise.reject(response)
    }
}, (error) => {
    if (error.response.status) {  // 判断状态码
        switch (error.response.status) {
            case 400:
                break;
            case 404:
                message.error('404 not found')
                break;
            default:
                message.error('服务器出错！');
        }
        return Promise.reject(error.response);
    }
})
//封装请求接口
export default class http{
    static async register(url,data){
      return await instance.post(url,data)
    }
    static async login(url,data){
      return await instance.post(url,data);
    }
    static async getProductList(url,params){
        return await instance.get(url,{params:params});
    }
    static async searchProduct(url,params){
      return await instance.get(url,{params:params})
    }
    static async addProduct(url,data){
        return await instance.post(url,data);
    }
    static async updateProduct(url,data){
        return await instance.put(url,data);
    }
    static async deleteProduct(url){
        return await instance.delete(url);
    }
    static async getProjectList(url,params){
        return await instance.get(url,params);
    }
    static async addProject(url,data){
        return await instance.post(url,data);
    }
    static async updateProject(url,data){
        return await instance.put(url,data);
    }
    static async deleteProject(url){
        return await instance.delete(url)
    }
    static async getVersionList(url){
        return await instance.get(url);
    }
    static async getErrorList(url){
        return await instance.get(url);
    }


}
