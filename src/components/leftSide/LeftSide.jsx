import React, { useState } from "react";
import "./leftSide.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, searchData } from "../../store/reducers/dataSlice";

export default function LeftSide() {
  const dispatch = useDispatch();
  const limit = useSelector((state) => state.data.limit);
  const [value, setValue] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(false);
  const search = (event) => {
    setValue(event.target.value);
    if (searchTimeout !== false) {
      clearTimeout(searchTimeout);
    }
    if (event.target.value !== "") {
      setSearchTimeout(
        setTimeout(
          () => {
            dispatch(searchData(value));
          },
          500,
          event
        )
      );
    } else {
      dispatch(fetchData(limit));
    }
  };
  return (
    <div className="left-side">
      <input
        type="text"
        className="inp"
        placeholder="Введите название"
        value={value}
        onChange={search}
      />
    </div>
  );
}
