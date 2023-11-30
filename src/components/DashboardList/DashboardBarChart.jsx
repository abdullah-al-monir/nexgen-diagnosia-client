import { BarChart } from "@mui/x-charts/BarChart";

const uData = [4000, 3000, 2000, 2780, 2390, 3490];
const pData = [2400, 1398, 2000, 3908, 3800, 4300];

const xLabels = [
  "Blood Test",
  "MRI",
  "CT Scan",
  "Ultrasound",
  "X-Ray",
  "Endoscopy",
];

export default function DashBoardBarChart() {
  return (
    <BarChart
      width={500}
      height={300}
      series={[
        {
          data: pData,
          label: "Available Slots",
          id: "pvId",
          yAxisKey: "leftAxisId",
        },
        {
          data: uData,
          label: "Slots",
          id: "uvId",
          yAxisKey: "rightAxisId",
        },
      ]}
      xAxis={[{ data: xLabels, scaleType: "band" }]}
      yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
      rightAxis="rightAxisId"
    />
  );
}
