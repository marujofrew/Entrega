import { useState } from "react";
import { useLocation } from "wouter";
import MobileOnly from "@/components/MobileOnly";
import Header from "@/components/tracking/Header";
import Footer from "@/components/tracking/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";

export default function PagamentoPage() {
  const [, setLocation] = useLocation();

  const valorTaxa = 15.00; // Taxa alfandegária fixa

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui integraria com sistema de pagamento real
    alert('Pagamento processado com sucesso!');
    setLocation('/rastreios');
  };

  return (
    <MobileOnly>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="container mx-auto px-4 py-6">
          {/* Cabeçalho */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Pagamento da Taxa Alfandegária
            </h1>
            <p className="text-gray-600">
              Regularize sua encomenda para liberação
            </p>
          </div>

          {/* Resumo do pagamento */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Resumo do Pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Taxa Alfandegária</span>
                <span className="font-medium">R$ {valorTaxa.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Taxa de Processamento</span>
                <span className="font-medium">R$ 2,50</span>
              </div>
              <div className="flex justify-between items-center py-3 font-bold text-lg">
                <span>Total</span>
                <span className="text-blue-600">R$ {(valorTaxa + 2.50).toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Pagamento PIX */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Smartphone className="h-6 w-6" />
                Pagamento via PIX
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="text-center py-8">
                  <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-gray-500">QR Code PIX</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Escaneie o QR Code com seu app bancário
                  </p>
                  <p className="text-xs text-gray-500 mb-6">
                    Ou use a chave PIX: taxa.correios@exemplo.com
                  </p>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 text-lg"
                  >
                    Confirmar Pagamento PIX
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Informações importantes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações Importantes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Após o pagamento, sua encomenda será liberada em até 24 horas</li>
                <li>• Você receberá um comprovante por e-mail</li>
                <li>• Em caso de dúvidas, entre em contato com 0800-570-0100</li>
                <li>• O pagamento é processado com segurança pelos Correios</li>
              </ul>
            </CardContent>
          </Card>
        </main>
        
        <Footer />
      </div>
    </MobileOnly>
  );
}