import { useState } from "react";
import Header from "@/components/tracking/Header";
import TrackingForm from "@/components/tracking/TrackingForm";
import PromotionalBanner from "@/components/tracking/PromotionalBanner";
import { ChevronLeft } from "lucide-react";

export default function TrackingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);

  const handleGoBack = () => {
    // Navigate back or to home
    window.history.back();
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header 
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        accessibilityOpen={accessibilityOpen}
        setAccessibilityOpen={setAccessibilityOpen}
      />
      
      <main className="max-w-md mx-auto bg-white min-h-screen">
        {/* Breadcrumb */}
        <div className="px-4 py-3 bg-gray-100">
          <button 
            onClick={handleGoBack}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Rastreamento</span>
          </button>
        </div>

        <TrackingForm />
        <PromotionalBanner />
      </main>
    </div>
  );
}
