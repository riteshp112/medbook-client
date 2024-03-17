import moment from "moment";
import React, { useState } from "react";

export default ({
  value,
  onChange,
  style,
  textStyle,
  mode = "date",
  placeholder = "Select Date",
  ...restProps
}) => {
  const modes = { date: "date", time: "time", datetime: "datetime-local" };
  const [type, setType] = useState("text");
  return (
    <div style={{ ...style, ...textStyle, display: "flex" }}>
      <input
        value={
          type == "text" ? value && moment(value).format("DD/MM/YYYY") : value
        }
        type={type}
        onFocus={function () {
          setType(modes[mode]);
        }}
        id="date"
        placeholder={placeholder}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        style={{
          outline: "none",
          border: "none",
          backgroundColor: "transparent",
          width: "100%",
          alignSelf: "center",
          paddingLeft: type == "text" && value ? 4 : 0,
        }}
        {...restProps}
      />
    </div>
  );
};
