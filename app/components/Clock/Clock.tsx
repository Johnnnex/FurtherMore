"use client";

import React, { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState({
    hour: new Date().getHours(),
    min: new Date().getMinutes(),
    sec: new Date().getSeconds(),
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setTime({
        hour: new Date().getHours(),
        min: new Date().getMinutes(),
        sec: new Date().getSeconds(),
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);
  return (
    <figure className="clock">
      <div id="time">
        <div
          className="circle"
          style={{ "--clr": "#E5980A" } as React.CSSProperties}
        >
          <div
            style={{ transform: `rotateZ(${time.sec * 6}deg)` }}
            className="dots"
          ></div>
          <svg>
            <circle
              cx={"120"}
              style={{ strokeDashoffset: 760 - (760 * time.sec) / 60 }}
              cy={"120"}
              r={"120"}
            ></circle>
          </svg>
        </div>
        <div
          className="circle"
          style={{ "--clr": "#FFF" } as React.CSSProperties}
        >
          <div
            style={{ transform: `rotateZ(${time.min * 6}deg)` }}
            className="dots"
          ></div>
          <svg>
            <circle
              cx={"100"}
              cy={"100"}
              style={{ strokeDashoffset: 630 - (630 * time.min) / 60 }}
              r={"100"}
            ></circle>
          </svg>
        </div>
        <div
          className="circle"
          style={{ "--clr": "#C0392B" } as React.CSSProperties}
        >
          <div
            style={{ transform: `rotateZ(${time.hour * 30}deg)` }}
            className="dots"
          ></div>
          <svg>
            <circle
              cx={"80"}
              style={{ strokeDashoffset: 510 - (510 * time.hour) / 12 }}
              cy={"80"}
              r={"80"}
            ></circle>
          </svg>
        </div>
        <div
          className="needles"
          style={
            {
              "--clr2": "#E5980A",
              transform: `rotateZ(${time.sec * 6}deg)`,
            } as React.CSSProperties
          }
        >
          <i></i>
        </div>
        <div
          className="needles needle-two"
          style={
            {
              "--clr2": "#fff",
              transform: `rotateZ(${time.min * 6}deg)`,
            } as React.CSSProperties
          }
        >
          <i></i>
        </div>
        <div
          className="needles needle-thr"
          style={
            {
              "--clr2": "#C0392B",
              transform: `rotateZ(${time.hour * 30}deg)`,
            } as React.CSSProperties
          }
        >
          <i></i>
        </div>
        {[...Array(12)].map((_, index) => (
          <span key={index} style={{ "--i": index + 1 } as React.CSSProperties}>
            <b>{index + 1}</b>
          </span>
        ))}
      </div>
    </figure>
  );
};

export default Clock;
