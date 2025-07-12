import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PromotionalBanner() {
  const handleStoreClick = () => {
    console.log("Opening Correios store...");
  };

  return (
    <div className="px-4 py-4">
      <div className="relative">
        {/* Carousel container */}
        <div className="relative overflow-hidden rounded-lg">
          <div className="flex transition-transform duration-300">
            {/* Banner 1 - Active */}
            <div className="w-full flex-shrink-0">
              <div className="bg-gradient-to-r from-orange-400 to-yellow-400 rounded-lg overflow-hidden">
                <div className="flex items-center p-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold mr-2">
                        O match perfeito
                      </div>
                      <span className="text-sm text-blue-900 font-medium">
                        por apenas
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-blue-900 mb-1">
                      R$ 1
                    </div>
                    <div className="text-xs text-blue-800 mb-2">
                      Para cada cliente, compramos o seu
                    </div>
                    <div className="text-xs text-blue-800 mb-3">
                      conectar com quem ama.
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs font-bold text-blue-900 mr-1">
                        Correios Celular
                      </span>
                      <div className="bg-blue-600 w-4 h-4 rounded flex items-center justify-center">
                        <div className="w-2 h-2 bg-yellow-400 rounded"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Person illustration placeholder */}
                  <div className="w-20 h-24 bg-blue-200 rounded-lg ml-4 flex-shrink-0 flex items-center justify-center">
                    <div className="w-12 h-16 bg-blue-300 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Carousel controls */}
        <button className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white bg-opacity-70 rounded-full flex items-center justify-center shadow-md hover:bg-opacity-90 transition-all">
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white bg-opacity-70 rounded-full flex items-center justify-center shadow-md hover:bg-opacity-90 transition-all">
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
