import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Info, User, Package } from "lucide-react";

export default function TrackingForm() {
  const [trackingCode, setTrackingCode] = useState("");
  const [inputType, setInputType] = useState<"cpf" | "tracking">("cpf");
  const [isLoading, setIsLoading] = useState(false);

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    const limitedNumbers = numbers.slice(0, 11);
    
    if (limitedNumbers.length <= 3) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 6) {
      return `${limitedNumbers.slice(0, 3)}.${limitedNumbers.slice(3)}`;
    } else if (limitedNumbers.length <= 9) {
      return `${limitedNumbers.slice(0, 3)}.${limitedNumbers.slice(3, 6)}.${limitedNumbers.slice(6)}`;
    } else {
      return `${limitedNumbers.slice(0, 3)}.${limitedNumbers.slice(3, 6)}.${limitedNumbers.slice(6, 9)}-${limitedNumbers.slice(9)}`;
    }
  };

  const formatTrackingCode = (value: string) => {
    // Formato básico para código de rastreamento: XX000000000BR
    const alphanumeric = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    return alphanumeric.slice(0, 13);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (inputType === "cpf") {
      const formattedValue = formatCPF(value);
      setTrackingCode(formattedValue);
    } else {
      const formattedValue = formatTrackingCode(value);
      setTrackingCode(formattedValue);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingCode.trim()) {
      alert("Por favor, digite o código de rastreamento ou CPF");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simula consulta
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Submitting tracking request:", { trackingCode, inputType });
      
      // Aqui seria a integração com a API real dos Correios
      alert(`Consulta realizada com sucesso!\nTipo: ${inputType === "cpf" ? "CPF" : "Código de Rastreamento"}\nValor: ${trackingCode}`);
    } catch (error) {
      alert("Erro ao consultar. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTypeChange = (type: "cpf" | "tracking") => {
    setInputType(type);
    setTrackingCode("");
  };

  return (
    <div className="px-4 py-6">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Rastreamento</h2>
        <p className="text-gray-600 text-sm">
          Acompanhe seus objetos em tempo real
        </p>
      </div>

      {/* Type Selector */}
      <div className="mb-6">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            type="button"
            onClick={() => handleTypeChange("cpf")}
            className={`flex-1 flex items-center justify-center px-4 py-3 rounded-md text-sm font-medium transition-all ${
              inputType === "cpf"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <User className="w-4 h-4 mr-2" />
            CPF
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange("tracking")}
            className={`flex-1 flex items-center justify-center px-4 py-3 rounded-md text-sm font-medium transition-all ${
              inputType === "tracking"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Package className="w-4 h-4 mr-2" />
            Código
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="mb-4">
            <label
              htmlFor="trackingInput"
              className="block text-sm font-medium text-gray-700 mb-3"
            >
              {inputType === "cpf" ? (
                <>
                  <span className="flex items-center mb-2">
                    <User className="w-4 h-4 mr-2 text-blue-600" />
                    Digite seu CPF para consultar seus objetos
                  </span>
                  <span className="text-xs text-gray-500">
                    Será exibida a lista de todos os objetos vinculados ao seu CPF
                  </span>
                </>
              ) : (
                <>
                  <span className="flex items-center mb-2">
                    <Package className="w-4 h-4 mr-2 text-blue-600" />
                    Digite o código de rastreamento do objeto
                  </span>
                  <span className="text-xs text-gray-500">
                    Formato: XX000000000BR (13 caracteres)
                  </span>
                </>
              )}
            </label>
            
            <div className="relative">
              <Input
                id="trackingInput"
                name="trackingInput"
                type="text"
                placeholder={
                  inputType === "cpf" 
                    ? "000.000.000-00" 
                    : "XX000000000BR"
                }
                value={trackingCode}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                required
                disabled={isLoading}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                {inputType === "cpf" ? (
                  <User className="w-5 h-5 text-gray-400" />
                ) : (
                  <Package className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Dica importante:</p>
                <p>
                  {inputType === "cpf" 
                    ? "Com o CPF você pode ver todos os objetos enviados para você, mesmo sem o código de rastreamento."
                    : "O código de rastreamento está presente na etiqueta do objeto ou no comprovante de postagem."
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || !trackingCode.trim()}
            className="w-full py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-all flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Consultando...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-3" />
                Consultar {inputType === "cpf" ? "CPF" : "Objeto"}
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Help Section */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-800 mb-2">Precisa de ajuda?</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>• O código de rastreamento tem 13 caracteres (ex: AA123456789BR)</p>
          <p>• Use seu CPF para ver todos os objetos destinados a você</p>
          <p>• Em caso de dúvidas, entre em contato com nossa Central de Atendimento</p>
        </div>
      </div>
    </div>
  );
}
