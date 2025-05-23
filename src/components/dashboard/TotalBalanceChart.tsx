import { PieChart } from "@mui/x-charts/PieChart";
import { useQuery } from "@tanstack/react-query";
import { getAllData } from "../../api/DashboardAPI";
import Spinner from "../Spinner";

export default function TotalBalanceChart() {
  const { data } = useQuery({
    queryFn: getAllData,
    queryKey: ["allData"],
  });

  if (!data || typeof data !== "object") return <Spinner />;

  const colors: Record<string, string> = {
    assets: "#008236",
    expenses: "#c10007",
    incomes: "#155dfc ",
    liabilities: "#f54a00",
  };

  const result = Object.entries(data).map(([key, items]) => {
    const value = items.reduce((sum, item) => sum + parseFloat(item.value), 0);
    return { label: key, value, color: colors[key] };
  });

  return (
    <div className="w-[170px] h-[200px] md:w-auto md:h-auto flex flex-col justify-between">
      <h2 className="text-center text-xl font-bold text-blue-500
        md:text-2xl md:mb-5">
        Total Balance
      </h2>
      {/* Tablet & Desktop */}
      <div className="hidden md:inline">
        <PieChart
          series={[
            {
              data: result,
              innerRadius: 35,
              paddingAngle: 2,
              cornerRadius: 6
            },
          ]}
          width={200}
          height={200}
          hideLegend
        />
      </div>

      {/* Phone */}
      <div className="md:hidden">
        <PieChart
          series={[
            {
              data: result,
              innerRadius: 18,
              paddingAngle: 3,
              cornerRadius: 5
            },
          ]}
          width={125}
          height={125}
          hideLegend
        />
      </div>
    </div>
  );
}
