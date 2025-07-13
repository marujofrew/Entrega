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
      id: "BR123456789BR",
      status: "Objeto entregue",
      lastUpdate: "12/07/2025 14:30",
      location: "São Paulo/SP",
      recipient: userData.nome,
      events: [
        {
          date: "12/07/2025",
          time: "14:30",
          status: "Objeto entregue",
          location: "São Paulo/SP",
          details: "Objeto entregue ao destinatário"
        },
        {
          date: "12/07/2025",
          time: "08:15",
          status: "Objeto saiu para entrega",
          location: "CDD São Paulo/SP",
          details: "Objeto saiu para entrega ao destinatário"
        },
        {
          date: "11/07/2025",
          time: "16:45",
          status: "Objeto em trânsito",
          location: "CTE São Paulo/SP",
          details: "Objeto em trânsito - por favor aguarde"
        },
        {
          date: "10/07/2025",
          time: "09:20",
          status: "Objeto postado",
          location: "São Paulo/SP",
          details: "Objeto postado pelos Correios"
        }
      ]
    },
    {
      id: "BR987654321BR",
      status: "Objeto em trânsito",
      lastUpdate: "12/07/2025 10:15",
      location: "Rio de Janeiro/RJ",
      recipient: userData.nome,
      events: [
        {
          date: "12/07/2025",
          time: "10:15",
          status: "Objeto em trânsito",
          location: "CTE Rio de Janeiro/RJ",
          details: "Objeto em trânsito - por favor aguarde"
        },
        {
          date: "11/07/2025",
          time: "14:30",
          status: "Objeto postado",
          location: "Rio de Janeiro/RJ",
          details: "Objeto postado pelos Correios"
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'objeto entregue':
        return 'bg-green-100 text-green-800';
      case 'objeto em trânsito':
        return 'bg-blue-100 text-blue-800';
      case 'objeto saiu para entrega':
        return 'bg-yellow-100 text-yellow-800';
      case 'objeto postado':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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

          {/* Lista de objetos */}
          <div className="space-y-4">
            {trackingData.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center text-lg">
                      <Package className="w-5 h-5 mr-2 text-blue-600" />
                      {item.id}
                    </CardTitle>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    Última atualização: {item.lastUpdate}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {item.location}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-800 border-b pb-2">
                      Histórico de movimentação
                    </h4>
                    
                    {item.events.map((event, index) => (
                      <div key={index} className="flex gap-4 relative">
                        {/* Timeline dot */}
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full ${
                            index === 0 ? 'bg-blue-600' : 'bg-gray-400'
                          }`} />
                          {index < item.events.length - 1 && (
                            <div className="w-px h-8 bg-gray-300 mt-1" />
                          )}
                        </div>
                        
                        {/* Event content */}
                        <div className="flex-1 pb-4">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-gray-800">
                              {event.status}
                            </p>
                            <p className="text-sm text-gray-500">
                              {event.date} {event.time}
                            </p>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {event.location}
                          </p>
                          <p className="text-sm text-gray-500">
                            {event.details}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
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