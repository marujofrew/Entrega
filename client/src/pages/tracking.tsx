import Header from "@/components/tracking/Header";
import TrackingForm from "@/components/tracking/TrackingForm";
import PromotionalBanner from "@/components/tracking/PromotionalBanner";
import Footer from "@/components/tracking/Footer";

export default function TrackingPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <Header />

      <main className="max-w-md mx-auto bg-white">
        {/* Breadcrumb */}
        <nav className="px-4 py-3 border-b border-gray-200">
          <div className="text-sm text-gray-600">
            <span className="mx-2">‹</span>
            <span className="text-gray-600 font-medium">Rastreamento</span>
          </div>
        </nav>

        <TrackingForm />
        <PromotionalBanner />
      </main>

      {/* Footer with full width */}
      <Footer />
    </div>
  );
}
