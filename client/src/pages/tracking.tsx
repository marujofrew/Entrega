import { useState } from "react";
import Header from "@/components/tracking/Header";
import TrackingForm from "@/components/tracking/TrackingForm";
import PromotionalBanner from "@/components/tracking/PromotionalBanner";
import Footer from "@/components/tracking/Footer";
import { ChevronLeft } from "lucide-react";

export default function TrackingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);

  const handleGoBack = () => {
    // Navigate back or to home
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Accessibility Section */}
      <section className="bg-blue-800 text-white text-xs">
        <div className="max-w-md mx-auto px-4 py-1">
          <button 
            onClick={() => setAccessibilityOpen(!accessibilityOpen)}
            className="text-white hover:text-gray-200 flex items-center"
          >
            <span>Acessibilidade</span>
            <ChevronLeft className={`w-3 h-3 ml-1 transform transition-transform ${accessibilityOpen ? 'rotate-90' : 'rotate-0'}`} />
          </button>
          {accessibilityOpen && (
            <div className="mt-2 space-y-1">
              <a href="#" className="block text-xs hover:underline">Ir para o conteúdo</a>
              <a href="#" className="block text-xs hover:underline">Ir para o menu</a>
              <a href="#" className="block text-xs hover:underline">Ir para a busca</a>
              <a href="#" className="block text-xs hover:underline">Ir para o rodapé</a>
              <a href="#" className="block text-xs hover:underline">Alto contraste</a>
              <a href="#" className="block text-xs hover:underline">Libras</a>
            </div>
          )}
        </div>
      </section>

      {/* Header */}
      <Header 
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        accessibilityOpen={accessibilityOpen}
        setAccessibilityOpen={setAccessibilityOpen}
      />
      
      <main className="max-w-md mx-auto bg-white">
        {/* Breadcrumb */}
        <nav className="px-4 py-3 border-b border-gray-200">
          <div className="text-sm text-gray-600">
            <span>Portal Correios</span>
            <span className="mx-2">›</span>
            <span className="text-blue-600 font-medium">Rastreamento</span>
          </div>
        </nav>

        <TrackingForm />
        <PromotionalBanner />
      </main>
      
      <Footer />
    </div>
  );
}
