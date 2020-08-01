import * as React from "react";
import { render } from "react-dom";

import Progress from "./Progress";

const rootElement = document.getElementById("root");
render(
  <>
    <div>
      柱形进度条
      <Progress percent={10} style={{ width: 200 }} />
      <Progress percent={50} />
      <Progress
        percent={39}
        strokeLinecap="round"
        strokeColor="#E86452"
        strokeWidth={10}
        showText={false}
      />
      <Progress percent={95} format={v => `已完成 ${v}%`} strokeWidth={15} />
    </div>

    <div>
      <div>圆形进度条</div>
      <Progress
        percent={10}
        textStyle={{ fontSize: 12 }}
        shape="circle"
        style={{
          width: 200,
          height: 60,
          display: "inline-block",
          marginLeft: 5
        }}
      />
      <Progress
        percent={50}
        showText={false}
        shape="circle"
        style={{
          width: 200,
          height: 120,
          display: "inline-block",
          marginLeft: 5
        }}
      />
      <Progress
        percent={50}
        strokeLinecap="round"
        strokeWidth={20}
        shape="circle"
        style={{
          width: 200,
          height: 200,
          display: "inline-block",
          marginLeft: 5
        }}
      />
    </div>
  </>,
  rootElement
);
