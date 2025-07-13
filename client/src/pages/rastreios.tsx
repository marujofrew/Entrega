import MobileOnly from "@/components/MobileOnly";
import Header from "@/components/tracking/Header";
import Footer from "@/components/tracking/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, ArrowLeft, Calendar } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";

export default function RastreiosPage() {
  // Busca dados da última consulta
  const { data: ultimaConsulta, isLoading } = useQuery({
    queryKey: ["/api/ultima-consulta"],
    retry: false,
  });

  // Dados estáticos para demonstração se não houver consulta
  const userData = ultimaConsulta?.data
    ? {
        nome: ultimaConsulta.data.nome,
        cpf: ultimaConsulta.data.cpf.replace(
          /(\d{3})(\d{3})(\d{3})(\d{2})/,
          "$1.$2.$3-$4",
        ),
        consultadoEm: new Date(ultimaConsulta.data.consultadoEm).toLocaleString(
          "pt-BR",
        ),
      }
    : {
        nome: "Usuário não identificado",
        cpf: "000.000.000-00",
        consultadoEm: "Data não disponível",
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
          date: "13/07/2025",
          status: "Previsão de Entrega",
          details: "Receber até dia 13/07/2025 após o pagamento",
          location: "Curitiba - PR",
          icon: "📅",
          type: "forecast",
          hasPayment: true,
        },
        {
          date: "",
          status: "Objeto aguardando pagamento",
          details: "em Unidade de Fiscalização Aduaneira, Curitiba, PR",
          location: "Curitiba - PR",
          icon: "$",
          type: "payment",
          hasPayment: true,
          paymentLink: "Realizar o pagamento: Efetuar Pagamento",
        },
        {
          date: "",
          status: "Objeto em transferência - por favor aguarde",
          details:
            "de Unidade de Tratamento, Curitiba, PR para Unidade de Fiscalização Aduaneira - Curitiba, PR",
          location: "Curitiba - PR",
          icon: "🚚",
          type: "transit",
        },
        {
          date: "",
          status: "Objeto recebido em território nacional",
          details: "",
          location: "Curitiba - PR",
          icon: "🇧🇷",
          type: "received",
        },
        {
          date: "",
          status: "Objeto em transferência - por favor aguarde",
          details:
            "de Unidade de Tratamento, Shanghai - China para Unidade de Tratamento Internacional, China",
          location: "Shanghai - China",
          icon: "🚚",
          type: "transit",
        },
        {
          date: "",
          status: "Objeto Postado",
          details: "",
          location: "Shanghai - China",
          icon: "📦",
          type: "posted",
        },
      ],
    },
  ];

  return (
    <MobileOnly>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="container mx-auto px-4 py-6">
          {/* Cabeçalho da página */}
          <div className="mb-6">
            <Link href="/">
              <Button
                variant="ghost"
                className="mb-4 text-blue-600 hover:text-blue-700"
              >
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
            <CardHeader></CardHeader>
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
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="relative">
              {trackingData[0].events.map((event, index) => (
                <div key={index} className="flex items-start mb-8 relative">
                  {/* Linha vertical amarela */}
                  {index < trackingData[0].events.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-yellow-400 z-0"></div>
                  )}

                  {/* Ícone */}
                  <div className="flex-shrink-0 w-12 h-12 bg-white border-2 border-yellow-400 rounded-full flex items-center justify-center mr-4 relative z-10">
                    {event.type === "forecast" && (
                      <span className="text-xl">📅</span>
                    )}
                    {event.type === "payment" && (
                      <span className="text-xl">💰</span>
                    )}
                    {event.type === "transit" && (
                      <span className="text-xl">🚚</span>
                    )}
                    {event.type === "received" && (
                      <span className="text-xl">🇧🇷</span>
                    )}
                    {event.type === "posted" && (
                      <span className="text-xl">📦</span>
                    )}
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-base mb-1">
                      {event.status}
                    </h3>

                    {event.details && (
                      <p className="text-sm text-gray-600 mb-1">
                        {event.details}
                      </p>
                    )}

                    {event.paymentLink && (
                      <div className="mb-2">
                        <a
                          href="#"
                          className="text-blue-600 underline text-sm hover:text-blue-800"
                        >
                          {event.paymentLink}
                        </a>
                      </div>
                    )}

                    <p className="text-sm text-gray-500">{event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
