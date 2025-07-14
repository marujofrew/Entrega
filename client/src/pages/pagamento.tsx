import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import MobileOnly from "@/components/MobileOnly";
import Header from "@/components/tracking/Header";
import Footer from "@/components/tracking/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Smartphone } from "lucide-react";

export default function PagamentoPage() {
  const [, setLocation] = useLocation();
  
  // Busca dados da última consulta para preencher automaticamente
  const { data: ultimaConsulta } = useQuery({
    queryKey: ["/api/ultima-consulta"],
    retry: false,
  });

  const [dadosUsuario, setDadosUsuario] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: ''
  });

  const [showEmailSuggestions, setShowEmailSuggestions] = useState(false);
  const [emailSuggestions] = useState([
    '@gmail.com',
    '@hotmail.com',
    '@outlook.com',
    '@yahoo.com.br',
    '@uol.com.br'
  ]);

  // Preenche automaticamente nome e CPF quando os dados da consulta estão disponíveis
  useEffect(() => {
    if (ultimaConsulta?.data) {
      setDadosUsuario(prev => ({
        ...prev,
        nome: ultimaConsulta.data.nome,
        cpf: ultimaConsulta.data.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
      }));
    }
  }, [ultimaConsulta]);

  const valorTaxa = 47.59; // Taxa alfandegária total

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDadosUsuario(prev => ({ ...prev, email: value }));
    
    // Mostra sugestões se o usuário digitou @ e não tem domínio completo
    if (value.includes('@') && !value.includes('.')) {
      setShowEmailSuggestions(true);
    } else {
      setShowEmailSuggestions(false);
    }
  };

  const handleEmailSuggestionClick = (suggestion: string) => {
    const userPart = dadosUsuario.email.split('@')[0];
    setDadosUsuario(prev => ({ ...prev, email: userPart + suggestion }));
    setShowEmailSuggestions(false);
  };

  const formatTelefone = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos
    const limitedNumbers = numbers.slice(0, 11);
    
    // Aplica formatação para celular brasileiro (11) 99999-9999
    if (limitedNumbers.length <= 2) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 7) {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`;
    } else {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7)}`;
    }
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatTelefone(e.target.value);
    setDadosUsuario(prev => ({ ...prev, telefone: formattedValue }));
  };

  const formatCPF = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '');
    
    // Limita a 11 dígitos
    const limitedNumbers = numbers.slice(0, 11);
    
    // Aplica formatação XXX.XXX.XXX-XX
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

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCPF(e.target.value);
    setDadosUsuario(prev => ({ ...prev, cpf: formattedValue }));
  };

  // Fecha sugestões quando clica fora do campo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.email-input-container')) {
        setShowEmailSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
                <span className="text-gray-600">Imposto de Importação</span>
                <span className="font-medium">R$ 30,15</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">ICMS</span>
                <span className="font-medium">R$ 8,22</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Despacho Postal</span>
                <span className="font-medium">R$ 7,12</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Multa</span>
                <span className="font-medium">R$ 2,10</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Valor Complementar</span>
                <span className="font-medium">R$ 0,00</span>
              </div>
              <div className="flex justify-between items-center py-3 font-bold text-lg border-t">
                <span>Total</span>
                <span className="text-blue-600">R$ 47,59</span>
              </div>
            </CardContent>
          </Card>

          {/* Dados do Usuário */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Confirme seus dados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    type="text"
                    value={dadosUsuario.nome}
                    onChange={(e) => setDadosUsuario(prev => ({ ...prev, nome: e.target.value }))}
                    placeholder="Nome completo"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    type="text"
                    value={dadosUsuario.cpf}
                    onChange={handleCPFChange}
                    placeholder="000.000.000-00"
                    maxLength={14}
                    required
                  />
                </div>
                <div className="relative email-input-container">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={dadosUsuario.email}
                    onChange={handleEmailChange}
                    placeholder="seu@email.com"
                    required
                  />
                  {showEmailSuggestions && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-10 mt-1">
                      {emailSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleEmailSuggestionClick(suggestion)}
                          className="w-full text-left px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none text-sm border-b border-gray-100 last:border-b-0"
                        >
                          {dadosUsuario.email.split('@')[0]}{suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    type="tel"
                    value={dadosUsuario.telefone}
                    onChange={handleTelefoneChange}
                    placeholder="(11) 99999-9999"
                    maxLength={15}
                    required
                  />
                </div>
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