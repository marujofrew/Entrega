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
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaValue(result);
  };

  const playCaptchaAudio = () => {
    // Play CAPTCHA audio
    console.log("Playing CAPTCHA audio:", captchaValue);
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
    
    console.log("Submitting tracking request:", { trackingCode, captchaText });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Rastreamento</h3>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="bg-gray-100 rounded-lg p-6">
          {/* Tracking Input Section */}
          <div className="mb-6">
            <div className="mb-4">
              <label htmlFor="objeto" className="block text-sm text-gray-700 mb-3">
                Deseja acompanhar seu objeto?<br />
                Digite seu CPF/CNPJ <strong>ou</strong> código* de rastreamento.
              </label>
              <Input
                id="objeto"
                name="objeto"
                type="text"
                placeholder="AA123456785BR"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div className="text-xs text-gray-600 mb-4">* limite de 20 objetos</div>
          </div>
          
          {/* CAPTCHA Section */}
          <div className="mb-6">
            <div className="flex items-start gap-3 mb-4">
              {/* CAPTCHA Image */}
              <div className="flex-1 bg-white border border-gray-300 p-2 rounded">
                <div 
                  className="h-16 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded text-gray-700 text-xl font-mono tracking-widest relative overflow-hidden"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='noise' width='4' height='4' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='1' cy='1' r='0.5' fill='%23ddd'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='60' fill='url(%23noise)'/%3E%3C/svg%3E")`,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    transform: 'skew(-5deg)'
                  }}
                >
                  {captchaValue}
                  {/* Add some visual noise */}
                  <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-transparent via-white to-transparent"></div>
                </div>
              </div>
              
              {/* CAPTCHA Controls */}
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={playCaptchaAudio}
                  className="w-8 h-8 bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 transition-colors"
                  title="Ouvir CAPTCHA"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="w-8 h-8 bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 transition-colors"
                  title="Atualizar CAPTCHA"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="mb-3">
              <label htmlFor="captcha" className="block text-sm text-gray-700 mb-2">
                Digite o texto contido na imagem
              </label>
              <div className="flex gap-2">
                <Input
                  id="captcha"
                  name="captcha"
                  type="text"
                  value={captchaText}
                  onChange={(e) => setCaptchaText(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  autoComplete="off"
                />
                <Button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                >
                  Consultar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
