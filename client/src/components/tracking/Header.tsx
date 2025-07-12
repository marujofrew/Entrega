import { Menu, ChevronDown } from "lucide-react";

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
    <header style={{ backgroundColor: 'var(--correios-blue)' }} className="text-white">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Hamburger Menu */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        {/* Logo Correios */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {/* Correios logo */}
            <div className="w-8 h-6 bg-yellow-400 rounded-sm mr-1 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--correios-blue)' }}></div>
            </div>
            <span className="font-bold text-lg">Correios</span>
          </div>
        </div>
        
        {/* Accessibility dropdown */}
        <div className="relative">
          <button 
            onClick={() => setAccessibilityOpen(!accessibilityOpen)}
            className="text-white hover:text-gray-200 flex items-center space-x-1 transition-colors"
          >
            <span className="text-sm">Acessibilidade</span>
            <ChevronDown className="w-3 h-3" />
          </button>
          
          {accessibilityOpen && (
            <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg p-2 min-w-[200px] z-10">
              <button className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                Alto contraste
              </button>
              <button className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                Aumentar fonte
              </button>
              <button className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                Leitor de tela
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
