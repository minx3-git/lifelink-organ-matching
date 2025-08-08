"use client";
import DashboardDemo from '../../components/DashboardDemo';

export default function DashboardPage() {
  // You can switch between donor/recipient for demo: <DashboardDemo type="recipient" />
  return <DashboardDemo type="donor" />;
}
