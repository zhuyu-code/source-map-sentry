import { createBrowserHistory } from 'history'


const history = createBrowserHistory({
    basename: '',             //基链接
    forceRefresh: true        //是否强制刷新
});


export default history
