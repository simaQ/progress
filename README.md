# progress

进度条组件。




## API

| 参数   | 说明 | 类型 | 默认值 |
| ---- | ------------ | -------- | ------------------------------------ |
| shape | 形态<br><br>**可选值**:<br>'circle', 'line'       | Enum     | 'line'         |
| percent         | 所占百分比       | Number   | 0   |
| format      | 文本渲染函数<br><br>**签名**:<br>Function(percent: Number) => string<br>**参数**:<br>_percent_: {Number} 当前的进度信息<br>**返回值**:<br>返回文本<br> | Function | percent => `${Math.floor(percent)}%` |
|showText | 是否显示进度数值或状态图标 | boolean | true |
| textStyle | 文本的样式设置  | object   | -   |
| strokeColor | 进度条的色彩         | String   | -   |
| trailColor | 进度条背景色         | String   | -   |
| strokeLineCap | 进度条线段末端的属性，<br><br>**可选值**:<br>'round', 'round' | Enum | 'round' |
| strokeWidth | 进度条线的宽度，单位 px | number | 8 |
