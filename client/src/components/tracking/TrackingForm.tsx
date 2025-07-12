import { useState } from "react";
import { RotateCcw, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TrackingForm() {
  const [trackingCode, setTrackingCode] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [captchaValue, setCaptchaValue] = useState("3fcq19");

  const refreshCaptcha = () => {
    // Generate new CAPTCHA
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaValue(result.toLowerCase());
  };

  const playCaptchaAudio = () => {
    // Play CAPTCHA audio
    console.log("Playing CAPTCHA audio:", captchaValue);
    // TODO: Implement text-to-speech functionality
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingCode.trim()) {
      alert("Por favor, digite o código de rastreamento ou CPF/CNPJ");
      return;
    }
    
    if (!captchaText.trim()) {
      alert("Por favor, digite o texto do CAPTCHA");
      return;
    }
    
    if (captchaText.toLowerCase() !== captchaValue.toLowerCase()) {
      alert("Texto do CAPTCHA incorreto. Tente novamente.");
      refreshCaptcha();
      setCaptchaText("");
      return;
    }
    
    // TODO: Implement tracking lookup
    console.log("Submitting tracking request:", { trackingCode, captchaText });
  };

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Rastreamento</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700 mb-4">
            Deseja acompanhar seu objeto?<br />
            Digite seu CPF/CNPJ <strong>ou</strong> código* de rastreamento.
          </p>
          
          {/* Tracking Input */}
          <div className="mb-4">
            <Input
              type="text"
              placeholder="AA123456785BR"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          
          <p className="text-xs text-gray-600 mb-4">* limite de 20 objetos</p>
          
          {/* CAPTCHA Section */}
          <div className="mb-4">
            {/* CAPTCHA Image */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="bg-white border-2 border-gray-300 rounded p-2 flex-1">
                <div className="captcha-text bg-gray-200 h-12 flex items-center justify-center rounded text-gray-600 text-lg font-mono tracking-wider">
                  {captchaValue}
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center transition-colors"
                >
                  <RotateCcw className="w-3 h-3 text-gray-600" />
                </button>
                <button
                  type="button"
                  onClick={playCaptchaAudio}
                  className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center transition-colors"
                >
                  <Volume2 className="w-3 h-3 text-gray-600" />
                </button>
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mb-2">Digite o texto contido na imagem</p>
            
            {/* CAPTCHA Input */}
            <Input
              type="text"
              value={captchaText}
              onChange={(e) => setCaptchaText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
          
          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full font-medium py-2 px-4 rounded-md transition-colors"
            style={{ 
              backgroundColor: 'var(--correios-blue)',
              color: 'white'
            }}
          >
            Consultar
          </Button>
        </div>
      </form>
    </div>
  );
}
