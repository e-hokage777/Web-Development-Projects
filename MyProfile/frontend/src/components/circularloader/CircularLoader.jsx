import "./circularLoader.css";
import { useEffect, useState } from "react";

export default function CircularLoader(props) {
  const outerRadius = props.size * 1;
  const innerRadius = props.size * 0.75;
  const innerOuterMargin = outerRadius - innerRadius;
  const circleRadius = (innerRadius + innerOuterMargin * 0.5) * 0.5;
  const circleCircumference = 2 * Math.PI * circleRadius;

  const [value, setValue] = useState(circleCircumference);


  setTimeout(() => {
    setValue((1 - props.value) * circleCircumference);
  }, 5);

  return (
    <div
      className="circular-loader"
      style={{ width: props.size, height: props.size }}
    >
      <div
        className="outer"
        style={{ width: outerRadius, height: outerRadius }}
      ></div>
      <div
        className="inner"
        style={{ width: innerRadius, height: innerRadius }}
      >
        {props.children}
      </div>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width={`${props.size}`}
        height={`${props.size}`}
      >
        <defs>
            <linearGradient id="loader-gradient">
                <stop offset="0%" stopColor="#34c0eb"/>
                <stop offset="100%" stopColor="#3467eb"/>
            </linearGradient>
        </defs>
        <circle
          className="load-circle"
          cx={`${props.size * 0.5}`}
          cy={`${props.size * 0.5}`}
          r={`${circleRadius}`}
          stroke="url(#loader-gradient)"
          strokeWidth={`${innerOuterMargin * 0.5}`}
          strokeDasharray={`${circleCircumference}`}
          strokeLinecap="round"
          strokeDashoffset={`${value}`}
          fill="transparent"
        />
      </svg>
    </div>
  );
}
