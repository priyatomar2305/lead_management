import { useEffect, useState } from "react";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import StatCard from "../components/StatCard";
import LeadTable from "../components/LeadTable";
import ChartSection from "../components/ChartSection";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/leads/dashboard").then((res) => setData(res.data));
  }, []);

  if (!data) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold mb-8">Analytics Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <StatCard title="Total Leads" value={data.total} />

          <StatCard title="Emails Opened" value={data.opened} />

          <StatCard title="Link Clicks" value={data.clicked} />

          <StatCard title="Open Rate" value={data.openRate.toFixed(2) + "%"} />

          <StatCard
            title="Click Rate"
            value={data.clickRate.toFixed(2) + "%"}
          />
        </div>

        <ChartSection opened={data.opened} total={data.total} />

        <LeadTable leads={data.leads} />
      </div>

      <Footer />
    </>
  );
}
