// Utility para detectar dispositivos móveis
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Exceção para preview do Replit e desenvolvimento
  if (window.location.hostname.includes('.replit.dev') || 
      window.location.hostname.includes('.repl.co') ||
      window.location.hostname.includes('localhost') ||
      window.location.hostname.includes('127.0.0.1')) {
    return true; // Permite acesso em preview/desenvolvimento
  }
  
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  
  // Lista de padrões para detectar dispositivos móveis
  const mobilePatterns = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
    /Mobile/i,
    /Tablet/i
  ];
  
  // Verifica se algum padrão móvel é encontrado
  const isMobile = mobilePatterns.some(pattern => pattern.test(userAgent));
  
  // Verifica também o tamanho da tela como fallback
  const isSmallScreen = window.innerWidth <= 768;
  
  // Verifica se é touch device
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  return isMobile || (isSmallScreen && isTouchDevice);
}

export function redirectToOfficialSite(): void {
  const officialUrl = 'https://rastreamento.correios.com.br/app/index.php';
  window.location.replace(officialUrl);
}

export function shouldAllowAccess(): boolean {
  return isMobileDevice();
}