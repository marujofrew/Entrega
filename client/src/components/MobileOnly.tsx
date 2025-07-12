import { useEffect, useState } from 'react';
import { isMobileDevice, redirectToOfficialSite } from '@/utils/deviceDetection';
import { Smartphone, ExternalLink, Shield } from 'lucide-react';

interface MobileOnlyProps {
  children: React.ReactNode;
}

export default function MobileOnly({ children }: MobileOnlyProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Detecta se é dispositivo móvel
    const mobileCheck = isMobileDevice();
    setIsMobile(mobileCheck);

    // Se não for móvel, inicia redirecionamento
    if (!mobileCheck) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            redirectToOfficialSite();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, []);

  // Loading state durante verificação inicial
  if (isMobile === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando dispositivo...</p>
        </div>
      </div>
    );
  }

  // Se não for móvel, mostra tela de redirecionamento
  if (!isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Acesso Restrito
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              Este serviço está disponível apenas para dispositivos móveis por questões de segurança e otimização.
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center mb-2">
              <Shield className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="font-medium text-yellow-800">Redirecionamento Automático</span>
            </div>
            <p className="text-yellow-700 text-sm mb-3">
              Você será redirecionado para o site oficial dos Correios em:
            </p>
            <div className="text-3xl font-bold text-yellow-800 mb-2">
              {countdown}s
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={redirectToOfficialSite}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Ir Agora para o Site Oficial
            </button>
            
            <p className="text-xs text-gray-500">
              Para acessar pelo computador, utilize o site oficial dos Correios
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-400">
              Esta medida garante a melhor experiência e segurança do serviço
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Se for móvel, renderiza o conteúdo normalmente
  return <>{children}</>;
}