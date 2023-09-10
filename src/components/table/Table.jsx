import React, { useEffect, useRef } from "react";
import "./table.scss";
import LeftSide from "../leftSide/LeftSide";
import RightSide from "../rightSide/RightSide";
import TableItems from "./tableItems/TableItems";
import { fetchData, selectors } from "../../store/reducers/dataSlice";
import { useDispatch, useSelector } from "react-redux";
export default function Table() {
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const limitRef = useRef({ v: 0 });
  const list = useSelector(selectors.selectAll);

  function limitCalc() {
    const { clientHeight, clientWidth } = tableRef.current;
    const limitW = Math.floor((clientWidth - 450) / 180);
    const limitH = Math.floor(clientHeight / 130);
    return limitW * limitH;
  }
  function observerWidth() {
    const currentLimit = limitCalc();
    if (currentLimit !== limitRef.current.v) {
      limitRef.current.v = currentLimit;
      dispatch(fetchData(currentLimit));
    }
  }

  useEffect(() => {
    const limit = limitCalc();
    limitRef.current.v = limit;
    dispatch(fetchData(limit));
    window.addEventListener("resize", observerWidth);
    return () => {
      window.removeEventListener("resize", observerWidth);
    };
  }, []);
  return (
    <div className="table" ref={tableRef}>
      <LeftSide limit={limitRef.current.v} />
      <div className="table__wrapper">
        {list.map((el) => (
          <TableItems key={el.id} title={el.title} />
        ))}
      </div>
      <RightSide />
    </div>
  );
}
