import React, { useEffect, useRef } from "react";
import "./table.scss";
import LeftSide from "../leftSide/LeftSide";
import RightSide from "../rightSide/RightSide";
import TableItems from "./tableItems/TableItems";
import { fetchData, selectors, setLimit } from "../../store/reducers/dataSlice";
import { useDispatch, useSelector } from "react-redux";
export default function Table() {
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const list = useSelector(selectors.selectAll);
  useEffect(() => {
    const { clientHeight, clientWidth } = tableRef.current;
    const limitW = Math.floor(clientWidth / 180);
    const limitH = Math.round(clientHeight / 130);
    const limit = limitW * limitH;
    dispatch(setLimit(limit));
    dispatch(fetchData(limit));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="table">
      <LeftSide />
      <div className="table__wrapper" ref={tableRef}>
        {list.map((el) => (
          <TableItems key={el.id} title={el.title} />
        ))}
      </div>
      <RightSide />
    </div>
  );
}
