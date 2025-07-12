import { Menu, Search, User } from "lucide-react";

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
    <header className="bg-blue-900 text-white relative">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Hamburger Menu */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white hover:text-gray-200 transition-colors p-1"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Logo Correios */}
          <div className="flex items-center">
            <div className="bg-yellow-400 rounded-sm p-1 mr-2">
              <div className="w-4 h-3 bg-blue-900 rounded-sm flex items-center justify-center">
                <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
              </div>
            </div>
            <span className="font-bold text-lg">Correios</span>
          </div>
          
          {/* Right side icons */}
          <div className="flex items-center space-x-3">
            <button className="text-white hover:text-gray-200 transition-colors p-1">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-white hover:text-gray-200 transition-colors p-1">
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
