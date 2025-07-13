import MobileOnly from '@/components/MobileOnly';
import Header from '@/components/tracking/Header';
import Footer from '@/components/tracking/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, MapPin, Clock, ArrowLeft, User, Calendar } from 'lucide-react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';

export default function RastreiosPage() {
  // Busca dados da última consulta
  const { data: ultimaConsulta, isLoading } = useQuery({
    queryKey: ['/api/ultima-consulta'],
    retry: false
  });

  // Dados estáticos para demonstração se não houver consulta
  const userData = ultimaConsulta?.data ? {
    nome: ultimaConsulta.data.nome,
    cpf: ultimaConsulta.data.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
    consultadoEm: new Date(ultimaConsulta.data.consultadoEm).toLocaleString('pt-BR')
  } : {
    nome: "Usuário não identificado",
    cpf: "000.000.000-00",
    consultadoEm: "Data não disponível"
  };

  if (isLoading) {
    return (
      <MobileOnly>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando dados...</p>
          </div>
        </div>
      </MobileOnly>
    );
  }

  const trackingData = [
    {
      code: "BR123456789BR",
      events: [
        {
          date: "20/01/2025",
          time: "16:58",
          status: "Objeto saiu para entrega ao remetente",
          location: "BRASÍLIA - DF",
          icon: "📫"
        },
        {
          date: "20/01/2025",
          time: "14:57",
          status: "Objeto não entregue - carteiro não atendido",
          location: "BRASÍLIA - DF",
          details: "Por favor, aguarde. Será realizada nova tentativa de entrega",
          icon: "❌"
        },
        {
          date: "20/01/2025",
          time: "06:54",
          status: "Objeto saiu para entrega ao destinatário",
          location: "BRASÍLIA - DF",
          details: "É preciso ter alguém no endereço para receber o carteiro",
          icon: "📫"
        },
        {
          date: "16/01/2025",
          time: "10:32",
          status: "Objeto em transferência - por favor aguarde",
          location: "da Unidade de Tratamento, BRASÍLIA - DF para Unidade de Distribuição, Brasília - DF",
          icon: "🚚"
        },
        {
          date: "15/01/2025",
          time: "10:32",
          status: "Objeto em transferência - por favor aguarde",
          location: "da Unidade de Distribuição, PALMAS - TO para Unidade de Tratamento, Brasília - DF",
          icon: "🚚"
        },
        {
          date: "14/01/2025",
          time: "10:32",
          status: "Objeto em transferência - por favor aguarde",
          location: "da Agência dos Correios, PALMAS - TO para Unidade de Distribuição, Palmas - TO",
          icon: "🚚"
        },
        {
          date: "14/01/2025",
          time: "09:44",
          status: "Objeto não entregue - prazo de retirada expirado",
          location: "PALMAS - TO",
          icon: "⏰"
        }
      ]
    }
  ];



  return (
    <MobileOnly>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="container mx-auto px-4 py-6">
          {/* Cabeçalho da página */}
          <div className="mb-6">
            <Link href="/">
              <Button variant="ghost" className="mb-4 text-blue-600 hover:text-blue-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao início
              </Button>
            </Link>
            
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Meus Rastreamentos
            </h1>
            <p className="text-gray-600">
              Acompanhe todos os seus objetos em um só lugar
            </p>
          </div>

          {/* Informações do usuário */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Dados do Titular
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Nome</p>
                  <p className="font-medium">{userData.nome}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">CPF</p>
                  <p className="font-medium">{userData.cpf}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Última consulta</p>
                  <p className="font-medium flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {userData.consultadoEm}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Código de rastreamento */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Código: {trackingData[0].code}
            </h2>
          </div>

          {/* Timeline de eventos */}
          <div className="bg-white rounded-lg shadow-sm border">
            {trackingData[0].events.map((event, index) => (
              <div key={index} className={`flex items-start p-4 ${index !== trackingData[0].events.length - 1 ? 'border-b border-gray-100' : ''}`}>
                {/* Ícone */}
                <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl">{event.icon}</span>
                </div>
                
                {/* Conteúdo */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 text-sm">
                      {event.status}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {event.date} {event.time}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-1">
                    {event.location}
                  </p>
                  
                  {event.details && (
                    <p className="text-sm text-gray-500">
                      {event.details}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Botão para novo rastreamento */}
          <div className="mt-8 text-center">
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                <Package className="w-4 h-4 mr-2" />
                Rastrear novo objeto
              </Button>
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </MobileOnly>
  );
}