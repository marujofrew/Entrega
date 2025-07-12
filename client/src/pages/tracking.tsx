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
      <section id="acessibilidade" className="bg-gray-600 text-white">
        <div className="max-w-md mx-auto px-4 py-2">
          <button 
            onClick={() => setAccessibilityOpen(!accessibilityOpen)}
            className="text-blue-400 hover:text-blue-300 flex items-center text-sm"
          >
            <span>Acessibilidade</span>
            <ChevronLeft className={`w-3 h-3 ml-1 transform transition-transform ${accessibilityOpen ? 'rotate-90' : 'rotate-0'}`} />
          </button>
          
          {accessibilityOpen && (
            <div id="acess-drop-down" className="absolute left-0 right-0 bg-gray-600 z-30 mt-2">
              <div className="max-w-md mx-auto p-4">
                <header className="mb-4">
                  <button 
                    onClick={() => setAccessibilityOpen(false)}
                    className="close text-white hover:text-gray-300 float-right text-lg"
                  >
                    ×
                  </button>
                </header>
                <section className="space-y-2">
                  <a href="#" className="block text-white hover:text-gray-300 text-sm">
                    <span className="numero mr-2">1</span>Ir para o conteúdo
                  </a>
                  <a href="#" className="block text-white hover:text-gray-300 text-sm">
                    <span className="numero mr-2">2</span>Ir para o menu
                  </a>
                  <a href="#" className="block text-white hover:text-gray-300 text-sm">
                    <span className="numero mr-2">3</span>Ir para a busca
                  </a>
                  <a href="#" className="block text-white hover:text-gray-300 text-sm">
                    <span className="numero mr-2">4</span>Ir para o rodapé
                  </a>
                  <a href="#" className="block text-white hover:text-gray-300 text-sm contraste">
                    Alto contraste
                  </a>
                  <a href="https://vlibras.gov.br" className="block text-white hover:text-gray-300 text-sm libras">
                    Libras
                  </a>
                  <a href="#" className="block text-white hover:text-gray-300 text-sm saiba-mais">
                    Saiba mais sobre acessibilidade
                  </a>
                </section>
              </div>
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
      
      {/* Footer with full width */}
      <Footer />
    </div>
  );
}
