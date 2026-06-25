import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartSection({ opened, total }) {
  const data = {
    labels: ["Opened", "Not Opened"],
    datasets: [
      {
        data: [opened, total - opened],
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-8">
      <Pie data={data} />
    </div>
  );
}
