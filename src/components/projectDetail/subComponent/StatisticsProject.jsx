import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { DatePicker } from "antd";
import { Chart, Tooltip, Axis, Line, Point } from "viser-react";
import {getDateError} from '../../../api/index';
import {useLocation} from 'react-router';
import {useProjectDetailStore} from '../store/index'
let data=[
  { Hours: "0", Count: 0 },
  { Hours: "1", Count: 0 },
  { Hours: "2", Count: 0 },
  { Hours: "3", Count: 0 },
  { Hours: "4", Count: 0 },
  { Hours: "5", Count: 0 },
  { Hours: "6", Count: 0 },
  { Hours: "7", Count: 0 },
  { Hours: "8", Count: 0 },
  { Hours: "9", Count: 0 },
  { Hours: "10", Count: 0 },
  { Hours: "11", Count: 0 },
  { Hours: "12", Count: 0 },
  { Hours: "13", Count: 0 },
  { Hours: "14", Count: 0 },
  { Hours: "15", Count: 0 },
  { Hours: "16", Count: 0 },
  { Hours: "17", Count: 0 },
  { Hours: "18", Count: 0 },
  { Hours: "19", Count: 0 },
  { Hours: "20", Count: 0 },
  { Hours: "21", Count: 0 },
  { Hours: "22", Count: 0 },
  { Hours: "23", Count: 0 },
]
const scale = [
  {
    dataKey: "Count",
    min: 0
  },
  {
    dataKey: "Hours",
    min: 0,
    max: 24
  }
];
export default observer(props => {
  const location = useLocation();
  const projectId = location.pathname.split("/")[4];
  const {setData,getData}=useProjectDetailStore();
  function changeDate(date,datestring){
    getDateError(projectId,{date:datestring}).then(res=>{
      const realValue=res.data;
      realValue.forEach(item=>{
        console.log(item.Count)
        data[item.Hours].Count=item.Count;
      })
      data.forEach(item=>{
        console.log(item.Count)
      })
      setData(data);
    })
  }
  return (
    <Fragment>
      <DatePicker onChange={changeDate} />
      <Chart forceFit height={400} data={getData()} scale={scale}>
        <Tooltip />
        <Axis />
        <Line position="Hours*Count" />
        <Point position="Hours*Count" shape="circle" />
      </Chart>
    </Fragment>
  );
});
