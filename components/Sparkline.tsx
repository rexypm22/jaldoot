interface SparklineProps {
  values: number[];
  dangerLevel: number;
  warningLevel: number;
  width?: number;
  height?: number;
}

export default function Sparkline({
  values,
  dangerLevel,
  warningLevel,
  width = 220,
  height = 56
}: SparklineProps) {
  const min = Math.min(...values, warningLevel) - 0.3;
  const max = Math.max(...values, dangerLevel) + 0.3;
  const range = max - min || 1;

  const toXY = (v: number, i: number) => {
    const x = (i / (values.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return [x, y];
  };

  const points = values.map((v, i) => toXY(v, i));
  const path = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

  const dangerY = height - ((dangerLevel - min) / range) * height;
  const warningY = height - ((warningLevel - min) / range) * height;
  const last = points[points.length - 1];
  const current = values[values.length - 1];
  const above = current >= dangerLevel;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <line x1={0} y1={dangerY} x2={width} y2={dangerY} stroke="#C6402F" strokeWidth={1} strokeDasharray="3 3" />
      <line x1={0} y1={warningY} x2={width} y2={warningY} stroke="#D69A2D" strokeWidth={1} strokeDasharray="2 3" />
      <path d={path} fill="none" stroke={above ? "#C6402F" : "#2C9CAE"} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r={3} fill={above ? "#C6402F" : "#2C9CAE"} />
    </svg>
  );
}
