import { Menu } from "lucide-react";
import correiosLogoPath from "@assets/CorreiosLogo_1752357067907.png";

interface HeaderProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  accessibilityOpen: boolean;
  setAccessibilityOpen: (open: boolean) => void;
}

export default function Header({ 
  menuOpen, 
  setMenuOpen, 
  accessibilityOpen, 
  setAccessibilityOpen 
}: HeaderProps) {
  return (
    <section id="menu" className="bg-blue-900 text-white relative" style={{ backgroundColor: '#1B4F72' }}>
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between px-4 py-4">
          {/* Hamburger Menu */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white hover:text-gray-200 transition-colors hamburger"
            style={{ background: 'none', border: 'none', padding: '8px' }}
          >
            <Menu className="w-6 h-6" />
          </button>
          
          {/* Logo Correios - Centered */}
          <div className="flex-1 flex justify-center">
            <a href="https://www.correios.com.br" className="logo">
              <img 
                src={correiosLogoPath} 
                alt="Correios" 
                className="h-8 w-auto"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </a>
          </div>
          
          {/* Right side - Entry button */}
          <div className="flex items-center">
            <a 
              href="#" 
              className="entrar text-white hover:text-gray-200 transition-colors text-sm"
              style={{ textDecoration: 'none' }}
            >
              Entrar
            </a>
          </div>
        </div>

        {/* Menu dropdown */}
        {menuOpen && (
          <div className="menu absolute top-full left-0 right-0 bg-blue-900 border-t border-blue-800 z-20">
            <div className="max-w-md mx-auto">
              <section className="p-4">
                <h1 className="text-white font-bold mb-3 text-lg">Rastreamento</h1>
                <a href="#" className="block text-white hover:text-gray-200 py-1 text-sm mb-2">Entrar</a>
              </section>
              
              <div className="border-t border-blue-800 p-4 space-y-2">
                <a 
                  href="http://globaltracktrace.ptc.post/gtt.web/Search.aspx" 
                  target="_blank" 
                  className="block text-white hover:text-gray-200 text-sm py-1"
                >
                  Rastreamento em outros países
                </a>
                <a 
                  href="https://www.correios.com.br/acesso-a-informacao/perguntas-frequentes" 
                  className="block text-white hover:text-gray-200 text-sm py-1"
                >
                  Perguntas frequentes
                </a>
                <a 
                  href="https://mais.correios.com.br/app/index.php" 
                  target="_blank" 
                  className="block text-white hover:text-gray-200 text-sm py-1"
                >
                  Busca Agências
                </a>
                <a 
                  href="https://www.correios.com.br/falecomoscorreios/central-de-atendimento" 
                  target="_blank" 
                  className="block text-white hover:text-gray-200 text-sm py-1"
                >
                  Central de Atendimento
                </a>
                <a 
                  href="https://www.correios.com.br/receber/prazo-de-guarda" 
                  target="_blank" 
                  className="block text-white hover:text-gray-200 text-sm py-1"
                >
                  Prazo de Guarda Objetos Nacionais
                </a>
                <a 
                  href="https://www.correios.com.br/receber/prazo-de-guarda-objetos-internacionais" 
                  target="_blank" 
                  className="block text-white hover:text-gray-200 text-sm py-1"
                >
                  Prazo de Guarda Objetos Internacionais
                </a>
                <a 
                  href="https://www2.correios.com.br/sistemas/precosPrazos/restricaoentrega/" 
                  target="_blank" 
                  className="block text-white hover:text-gray-200 text-sm py-1"
                >
                  Restrição de Entrega por CEP
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
