import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef
} from "react";
import { Chart } from "@antv/g2";
import { clamp, get } from "@antv/util";
import { withResizeDetector } from "react-resize-detector";

import { ProgressProps } from "./types";

interface IProps extends ProgressProps {
  deepPrefix?: string;
  style?: React.CSSProperties;
  width: number;
  height: number;
}

const textOffsetX = 12;

const Progress: React.FC<IProps> = forwardRef(
  (
    {
      deepPrefix = "deep-alibrain-progress",
      style,
      shape = "line",
      percent,
      format,
      showText = true,
      textStyle,
      strokeWidth = 8,
      strokeColor = "#29A5FF",
      trailColor = "#D7D8D9",
      strokeLinecap = "square",
      width,
      height
    },
    ref
  ) => {
    const isCircle = shape === "circle";
    const chart = useRef<Chart>();
    const container = useRef<HTMLDivElement>(null);

    const value = clamp(percent, 0, 100);
    const data = [
      { color: trailColor, value: 100, const: "const" },
      { color: strokeColor, value, const: "const" }
    ];

    useEffect(() => {
      if (!container.current) {
        return () => null;
      }

      const labelStyle = {
        fill: "#000",
        lineWidth: 0,
        font: `${get(
          textStyle,
          "fontSize",
          isCircle ? width / 7 : 12
        )}px sans-serif`,
        textAlign: isCircle ? "center" : "start",
        textBaseline: "middle",
        fontSize: isCircle ? width / 7 : 12,
        ...textStyle
      };
      let textLength = 0;
      let textContent;
      if (showText) {
        const context = document.createElement("canvas").getContext("2d");
        context.font = labelStyle.font;

        textContent = format ? format(value) : `${value}%`;
        // 计算文本长度
        textLength = context.measureText(textContent).width + textOffsetX + 8;
      }

      const chartInstance: Chart = new Chart({
        container: container.current,
        width,
        height,
        autoFit: false,
        padding: isCircle ? 0 : [0, textLength, 0, 0],
        appendPadding: isCircle ? 5 : 12,
        defaultInteractions: []
      });

      chartInstance.data(data);
      chartInstance.axis(false);
      chartInstance.animate(false);
      chartInstance.legend(false);
      chartInstance.scale({
        value: {
          min: 0,
          max: 100
        }
      });

      if (isCircle) {
        chartInstance.coordinate("polar").transpose();
        chartInstance.scale("const", {
          range: [1 - strokeWidth / width, 1]
        });
      } else {
        chartInstance.coordinate().transpose();
      }

      chartInstance
        .interval()
        .position("const*value")
        .color("color", v => v)
        .shape("line") // TODO: line 在极坐标下绘制的区域有问题
        .size(strokeWidth)
        .style({
          lineCap: strokeLinecap,
          strokeOpacity: 1,
          fillOpacity: 1
        });

      if (showText) {
        chartInstance.annotation().text({
          position: isCircle ? ["50%", "50%"] : ["const", 100],
          content: textContent,
          style: labelStyle,
          offsetX: isCircle ? 0 : textOffsetX
        });
      }
      chartInstance.render();
      chart.current = chartInstance;

      return () => chartInstance.destroy();
    }, [width, height]);

    useImperativeHandle(ref, () => ({
      getChart: () => chart.current
    }));

    return <div className={deepPrefix} style={style} ref={container} />;
  }
);

const ProgressWithResizeDetector = withResizeDetector(Progress);

export default ProgressWithResizeDetector;
