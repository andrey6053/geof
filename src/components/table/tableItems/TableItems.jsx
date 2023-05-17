import React from "react";
import "./tableItems.scss";

export default function TableItems({ title }) {
  return (
    <div className="item">
      <div className="item__title">
        <p>{title}</p>
      </div>
    </div>
  );
}
