import Header from "@/components/Header";
import QuickHelpline from "@/components/QuickHelpline";
import MapView from "@/components/MapView";
import RiverLevelWidget from "@/components/RiverLevelWidget";
import LandslideRiskWidget from "@/components/LandslideRiskWidget";
import AlertsNewsFeed from "@/components/AlertsNewsFeed";
import RescueTeamsGrid from "@/components/RescueTeamsGrid";
import SafeZonesGrid from "@/components/SafeZonesGrid";
import SurvivalGuide from "@/components/SurvivalGuide";
import SOSReportButton from "@/components/SOSReportButton";
import DashboardTabs from "@/components/DashboardTabs";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 space-y-6">
        <QuickHelpline />

        <section aria-labelledby="monitoring-heading">
          <h2 id="monitoring-heading" className="font-display text-lg font-semibold text-sandbar-100 mb-3">
            Real-Time Monitoring
          </h2>
          <DashboardTabs
            tabs={[
              { id: "map", label: "Situation Map", content: <MapView /> },
              { id: "landslide", label: "Landslide Risk", content: <LandslideRiskWidget /> },
              { id: "river", label: "River Levels", content: <RiverLevelWidget /> },
              { id: "alerts", label: "Alerts & News", content: <AlertsNewsFeed /> }
            ]}
          />
        </section>

        <RescueTeamsGrid />
        <SafeZonesGrid />
        <SurvivalGuide />
      </div>

      <SOSReportButton />
    </main>
  );
}
