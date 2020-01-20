import http from './http';

//登录注册信息
export const register=(data)=>http.register('/register',data);
export const login=(data)=>http.login('/login',data);

//产品信息
export const getProductList=(params)=>http.getProductList('/product',params);
export const searchProduct=(params)=>http.searchProduct('/product/search',params);
export const addProduct=(params,data)=>http.addProduct(`/product/?userId=${params.userId}&createPerson=${params.createPerson}`,data);
export const updateProduct=(params,productId)=>http.updateProduct(`/product/${productId}`,params);
export const deleteProduct=(productId)=>http.deleteProduct(`/product/${productId}`);

//项目信息
export const getProjectOne=(projectId)=>http.getProjectOne(`/project/${projectId}`);
export const getProjectList=(productId,params)=>http.getProjectList(`/product/${productId}/project`,params);
export const addProject=(data,productId,params)=>http.addProject(`/product/${productId}/project/?userId=${params.userId}&createPerson=${params.createPerson}`,data);
export const updateProject=(params,projectId)=>http.updateProject(`/product/project/${projectId}`,params);
export const deleteProject=(projectId)=>http.deleteProject(`/product/project/${projectId}`);

//版本信息
export const getVersionList=(projectId)=>http.getVersionList(`/product/project/${projectId}/version`);

//错误列表
export const getProjectIdError=(projectId)=>http.getProjectIdError(`/product/project/${projectId}/errorList`)
export const getVersionIdError=(versionId)=>http.getVersionIdError(`/product/project/version/${versionId}/errorList`);

//错误统计
export const getDateError=(projectId,params)=>http.getDateError(`/product/project/${projectId}/date`,params)

//富文本
export const getEditor=(projectId)=>http.getEditor(`/product/project/${projectId}/editor`)
export const uploadEditor=(projectId,data)=>http.uploadEditor(`/product/project/${projectId}/editor`,data)
