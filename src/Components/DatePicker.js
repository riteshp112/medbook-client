import React from "react";

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
  return (
    <div style={{ ...style, ...textStyle, display: "flex" }}>
      <input
        value={value}
        type={modes[mode]}
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
        }}
        {...restProps}
      />
    </div>
  );
};
