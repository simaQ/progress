interface TextStyle {
  /** 字体大小 */
  fontSize?: number;
  /** 行高 */
  lineHeight?: number;
  /** 字体填充颜色 */
  fill?: string;
  /** 字体描边颜色 */
  stroke?: string;
  textAlign?: "start" | "center" | "end" | "left" | "right";
  textBaseline?: "top" | "middle" | "bottom";
}

export interface ProgressProps {
  /** 形态 */
  shape?: "circle" | "line";

  /** 所占百分比 */
  percent?: number;
  /** 文本渲染函数 */
  format?: (percent?: number) => string;
  /** 是否显示进度数值或状态图标 */
  showText?: boolean;
  /** 文本的样式设置 */
  textStyle?: TextStyle;

  /** 进度条的色彩 */
  strokeColor?: string;
  /** 进度条背景色 */
  trailColor?: string;
  /** 进度条的样式 */
  strokeLinecap?: "square" | "round";
  /** 进度条线的宽度，单位 px */
  strokeWidth?: number;
}
