import { useState } from "react";
import { useLocation } from "wouter";
import MobileOnly from "@/components/MobileOnly";
import Header from "@/components/tracking/Header";
import Footer from "@/components/tracking/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CreditCard, Banknote, Smartphone } from "lucide-react";

export default function PagamentoPage() {
  const [, setLocation] = useLocation();
  const [metodoPagamento, setMetodoPagamento] = useState<'cartao' | 'pix' | 'boleto'>('cartao');
  const [dadosCartao, setDadosCartao] = useState({
    numero: '',
    nome: '',
    validade: '',
    cvv: ''
  });

  const valorTaxa = 15.00; // Taxa alfandegária fixa

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui integraria com sistema de pagamento real
    alert('Pagamento processado com sucesso!');
    setLocation('/rastreios');
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  return (
    <MobileOnly>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="container mx-auto px-4 py-6">
          {/* Cabeçalho com botão voltar */}
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              onClick={() => setLocation('/rastreios')}
              className="p-2 mr-3"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Pagamento da Taxa Alfandegária
              </h1>
              <p className="text-gray-600">
                Regularize sua encomenda para liberação
              </p>
            </div>
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

          {/* Métodos de pagamento */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Método de Pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3 mb-6">
                <button
                  onClick={() => setMetodoPagamento('cartao')}
                  className={`p-4 rounded-lg border-2 text-center transition-colors ${
                    metodoPagamento === 'cartao' 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CreditCard className="h-8 w-8 mx-auto mb-2" />
                  <span className="text-sm font-medium">Cartão</span>
                </button>
                <button
                  onClick={() => setMetodoPagamento('pix')}
                  className={`p-4 rounded-lg border-2 text-center transition-colors ${
                    metodoPagamento === 'pix' 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Smartphone className="h-8 w-8 mx-auto mb-2" />
                  <span className="text-sm font-medium">PIX</span>
                </button>
                <button
                  onClick={() => setMetodoPagamento('boleto')}
                  className={`p-4 rounded-lg border-2 text-center transition-colors ${
                    metodoPagamento === 'boleto' 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Banknote className="h-8 w-8 mx-auto mb-2" />
                  <span className="text-sm font-medium">Boleto</span>
                </button>
              </div>

              {/* Formulário de pagamento */}
              <form onSubmit={handleSubmit}>
                {metodoPagamento === 'cartao' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="numero">Número do Cartão</Label>
                      <Input
                        id="numero"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={dadosCartao.numero}
                        onChange={(e) => setDadosCartao({
                          ...dadosCartao,
                          numero: formatCardNumber(e.target.value)
                        })}
                        maxLength={19}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="nome">Nome do Titular</Label>
                      <Input
                        id="nome"
                        type="text"
                        placeholder="Nome como está no cartão"
                        value={dadosCartao.nome}
                        onChange={(e) => setDadosCartao({
                          ...dadosCartao,
                          nome: e.target.value.toUpperCase()
                        })}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="validade">Validade</Label>
                        <Input
                          id="validade"
                          type="text"
                          placeholder="MM/AA"
                          value={dadosCartao.validade}
                          onChange={(e) => setDadosCartao({
                            ...dadosCartao,
                            validade: formatExpiry(e.target.value)
                          })}
                          maxLength={5}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          type="text"
                          placeholder="123"
                          value={dadosCartao.cvv}
                          onChange={(e) => setDadosCartao({
                            ...dadosCartao,
                            cvv: e.target.value.replace(/\D/g, '')
                          })}
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {metodoPagamento === 'pix' && (
                  <div className="text-center py-8">
                    <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <span className="text-gray-500">QR Code PIX</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Escaneie o QR Code com seu app bancário
                    </p>
                    <p className="text-xs text-gray-500">
                      Ou use a chave PIX: taxa.correios@exemplo.com
                    </p>
                  </div>
                )}

                {metodoPagamento === 'boleto' && (
                  <div className="text-center py-8">
                    <div className="bg-gray-100 rounded-lg p-6 mb-4">
                      <Banknote className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-sm text-gray-600 mb-2">
                        Boleto será gerado após confirmação
                      </p>
                      <p className="text-xs text-gray-500">
                        Vencimento: 3 dias úteis
                      </p>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 text-lg"
                >
                  {metodoPagamento === 'cartao' && 'Pagar com Cartão'}
                  {metodoPagamento === 'pix' && 'Confirmar Pagamento PIX'}
                  {metodoPagamento === 'boleto' && 'Gerar Boleto'}
                </Button>
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