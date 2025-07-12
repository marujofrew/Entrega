import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TrackingForm() {
  const [trackingCode, setTrackingCode] = useState("");

  const formatCPF = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, "");

    // Limita a 11 dígitos
    const limitedNumbers = numbers.slice(0, 11);

    // Aplica a formatação XXX.XXX.XXX-XX
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCPF(e.target.value);
    setTrackingCode(formattedValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!trackingCode.trim()) {
      alert("Por favor, digite o código de rastreamento ou CPF/CNPJ");
      return;
    }

    console.log("Submitting tracking request:", { trackingCode });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-600">Rastreamento</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-gray-100 rounded-lg p-6">
          {/* Tracking Input Section */}
          <div className="mb-6">
            <div className="mb-4">
              <label
                htmlFor="objeto"
                className="block text-sm text-gray-700 mb-3"
              >
                Deseja acompanhar seu objeto?
                <br />
                Digite seu CPF para continuar o rastreamento.
              </label>
              <Input
                id="objeto"
                name="objeto"
                type="text"
                placeholder="000.000.000-00"
                value={trackingCode}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <Button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
            >
              Consultar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
