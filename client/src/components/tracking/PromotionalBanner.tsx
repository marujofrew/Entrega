import { UserCircle } from "lucide-react";

export default function PromotionalBanner() {
  const handleStoreClick = () => {
    console.log("Opening Correios store...");
    // TODO: Implement store navigation
  };

  return (
    <div className="px-4 pb-4">
      <div 
        className="rounded-lg overflow-hidden"
        style={{
          background: 'linear-gradient(to right, var(--correios-light-blue), #2563eb)'
        }}
      >
        <div className="flex items-center p-4">
          {/* Person image placeholder */}
          <div className="w-16 h-20 bg-blue-300 rounded-lg mr-4 flex-shrink-0 flex items-center justify-center">
            <UserCircle className="w-12 h-12 text-white" />
          </div>
          
          <div className="flex-1 text-white">
            <h3 className="font-bold text-lg mb-1">Descubra a nova</h3>
            <h4 className="font-bold text-lg mb-2">loja dos Correios</h4>
            <p className="text-sm mb-3 opacity-90">
              Agora, nossos produtos e serviços estão no SuperApp.
            </p>
            <button
              onClick={handleStoreClick}
              className="bg-white px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
              style={{ color: 'var(--correios-blue)' }}
            >
              Clique aqui e saiba mais
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
