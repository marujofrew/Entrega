import { useEffect, useState } from 'react';
import { isMobileDevice, redirectToOfficialSite } from '@/utils/deviceDetection';

interface MobileOnlyProps {
  children: React.ReactNode;
}

export default function MobileOnly({ children }: MobileOnlyProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    // Detecta se é dispositivo móvel
    const mobileCheck = isMobileDevice();
    setIsMobile(mobileCheck);

    // Se não for móvel, redireciona imediatamente
    if (!mobileCheck) {
      redirectToOfficialSite();
    }
  }, []);

  // Loading state durante verificação inicial
  if (isMobile === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  // Se não for móvel, não renderiza nada (redirecionamento já foi feito)
  if (!isMobile) {
    return null;
  }

  // Se for móvel, renderiza o conteúdo normalmente
  return <>{children}</>;
}