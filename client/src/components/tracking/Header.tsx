import headerImagePath from "@assets/Imagem do WhatsApp de 2025-07-12 à(s) 19.13.26_0a3c5480_1752358438863.jpg";

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
    <section id="menu" className="relative">
      <div className="max-w-md mx-auto">
        {/* Header Image */}
        <div className="w-full">
          <img 
            src={headerImagePath} 
            alt="Correios Header" 
            className="w-full h-auto"
          />
        </div>

        {/* Menu dropdown */}
        {menuOpen && (
          <div className="menu absolute top-full left-0 right-0 bg-blue-900 z-20" style={{ backgroundColor: '#1B4F72' }}>
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
