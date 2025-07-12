import { Menu, Search, User } from "lucide-react";
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
    <header className="bg-blue-900 text-white relative" style={{ backgroundColor: '#1B4F72' }}>
      <div className="max-w-md mx-auto">
        <div className="flex items-center px-4 py-3" style={{ minHeight: '60px' }}>
          {/* Hamburger Menu */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white hover:text-gray-200 transition-colors mr-4"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          {/* Logo Correios - Centered */}
          <div className="flex-1 flex justify-center">
            <a href="https://www.correios.com.br" className="flex items-center">
              <img 
                src={correiosLogoPath} 
                alt="Correios" 
                className="h-7 w-auto"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </a>
          </div>
          
          {/* Right side icons */}
          <div className="flex items-center space-x-3 ml-4">
            <button className="text-white hover:text-gray-200 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-white hover:text-gray-200 transition-colors">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Menu dropdown */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 bg-blue-900 border-t border-blue-800 z-20">
            <div className="max-w-md mx-auto">
              <div className="p-4">
                <h3 className="text-white font-bold mb-3">Rastreamento</h3>
                <a href="#" className="block text-white hover:text-gray-200 py-1 text-sm">Entrar</a>
              </div>
              <div className="border-t border-blue-800 p-4 space-y-2">
                <a href="#" className="block text-white hover:text-gray-200 text-sm">Rastreamento em outros países</a>
                <a href="#" className="block text-white hover:text-gray-200 text-sm">Perguntas frequentes</a>
                <a href="#" className="block text-white hover:text-gray-200 text-sm">Busca Agências</a>
                <a href="#" className="block text-white hover:text-gray-200 text-sm">Central de Atendimento</a>
                <a href="#" className="block text-white hover:text-gray-200 text-sm">Prazo de Guarda Objetos Nacionais</a>
                <a href="#" className="block text-white hover:text-gray-200 text-sm">Prazo de Guarda Objetos Internacionais</a>
                <a href="#" className="block text-white hover:text-gray-200 text-sm">Restrição de Entrega por CEP</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
