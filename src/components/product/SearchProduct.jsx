import React from "react";
import { observer } from "mobx-react-lite";
import { Input } from "antd";
import { searchProduct } from "../../api/index";
import { useProductStore } from "../product/store/index";
const { Search } = Input;
export default observer(props => {
  const { setProductLists } = useProductStore();
  function searchProductk(value) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    searchProduct({
      userId: userInfo.userId,
      target: value,
      page: props.page,
      pageSize: props.pageSize
    }).then(res => {
      setProductLists(res.data.list);
    });
  }
  return (
    <Search
      placeholder="搜索"
      onSearch={searchProductk}
      enterButton
      style={{ width: 200 }}
    />
  );
});
