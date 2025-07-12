import { useState } from "react";
import { ChevronLeft, ChevronRight, Smartphone, Package, CreditCard } from "lucide-react";

export default function PromotionalBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      title: "Descubra a nova loja dos Correios",
      subtitle: "Agora, nossos produtos e serviços estão no SuperApp",
      ctaText: "Clique aqui e saiba mais",
      bgColor: "bg-gradient-to-r from-blue-500 to-blue-600",
      icon: <Smartphone className="w-8 h-8 text-white" />,
      description: "Baixe o app e tenha acesso a todos os serviços dos Correios na palma da sua mão."
    },
    {
      id: 2,
      title: "Rastreie seus objetos",
      subtitle: "Acompanhe suas encomendas em tempo real",
      ctaText: "Começar rastreamento",
      bgColor: "bg-gradient-to-r from-green-500 to-green-600",
      icon: <Package className="w-8 h-8 text-white" />,
      description: "Receba notificações e saiba exatamente onde está seu objeto."
    },
    {
      id: 3,
      title: "Pague seus serviços",
      subtitle: "Facilidade e segurança em suas transações",
      ctaText: "Conheça as opções",
      bgColor: "bg-gradient-to-r from-orange-500 to-orange-600",
      icon: <CreditCard className="w-8 h-8 text-white" />,
      description: "PIX, cartão de crédito e débito. Escolha a forma que preferir."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const currentBanner = banners[currentSlide];

  return (
    <div className="px-4 py-6">
      <div className="relative">
        {/* Banner container */}
        <div className="relative overflow-hidden rounded-xl shadow-lg">
          <div 
            className={`${currentBanner.bgColor} p-6 min-h-[160px] transition-all duration-500 ease-in-out`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 text-white">
                {/* Icon */}
                <div className="mb-3">
                  {currentBanner.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold mb-2 leading-tight">
                  {currentBanner.title}
                </h3>
                
                {/* Subtitle */}
                <p className="text-sm opacity-90 mb-3">
                  {currentBanner.subtitle}
                </p>
                
                {/* Description */}
                <p className="text-xs opacity-80 mb-4 line-clamp-2">
                  {currentBanner.description}
                </p>
                
                {/* CTA Button */}
                <button 
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors shadow-md"
                  onClick={() => console.log(`CTA clicked: ${currentBanner.ctaText}`)}
                >
                  {currentBanner.ctaText}
                </button>
              </div>
              
              {/* Illustration */}
              <div className="w-20 h-20 ml-4 flex-shrink-0">
                <div className="w-full h-full bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                  <div className="w-12 h-12 bg-white bg-opacity-30 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-100 transition-all z-10"
          aria-label="Banner anterior"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-100 transition-all z-10"
          aria-label="Próximo banner"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
        
        {/* Dots indicator */}
        <div className="flex justify-center mt-4 space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-blue-600 w-6' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Ir para banner ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
