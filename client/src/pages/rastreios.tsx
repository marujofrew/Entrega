import MobileOnly from "@/components/MobileOnly";
import Header from "@/components/tracking/Header";
import Footer from "@/components/tracking/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import caixaPacImage from "@/assets/image_1752461563401.png";

export default function RastreiosPage() {
  const [, setLocation] = useLocation();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  
  // Calcula data de amanhã para previsão de entrega
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const deliveryDate = tomorrow.toLocaleDateString("pt-BR");

  // Busca dados da última consulta
  const { data: ultimaConsulta, isLoading } = useQuery({
    queryKey: ["/api/ultima-consulta"],
    retry: false,
  });

  // Função para verificar se a imagem foi carregada
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Efeito para definir quando a página está pronta
  useEffect(() => {
    if (!isLoading && imageLoaded) {
      // Adiciona um pequeno delay para garantir que tudo foi renderizado
      const timer = setTimeout(() => {
        setPageReady(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isLoading, imageLoaded]);

  // Pré-carrega a imagem
  useEffect(() => {
    const img = new Image();
    img.onload = handleImageLoad;
    img.src = caixaPacImage;
  }, []);

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

  // Exibe loading enquanto dados ou imagem não foram carregados
  if (isLoading || !pageReady) {
    return (
      <MobileOnly>
        <div className="bg-gray-50 flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">
              {isLoading ? "Carregando dados..." : "Carregando a página..."}
            </p>
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
      <div className="bg-gray-50">
        <Header />

        <main className="container mx-auto px-4 py-6">
          {/* Cabeçalho da página */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Rastreamento
            </h1>
            <p className="text-gray-600">
              Acompanhe todos os seus objetos em um só lugar
            </p>
          </div>

          {/* Informações do usuário */}
          <Card className="mb-6">
            &nbsp;
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
              </div>
            </CardContent>
          </Card>

          {/* Imagem da caixa PAC */}
          <div className="mb-6 relative">
            <img
              src={caixaPacImage}
              alt="Caixa PAC dos Correios"
              className="w-full h-auto shadow-sm"
            />

            {/* Nome do destinatário sobre a imagem */}
            <div className="absolute top-[190px] left-[75px] text-sm text-black leading-tight">
              {(() => {
                const nomeCompleto = userData.nome.toUpperCase();
                const palavras = nomeCompleto.split(" ");

                if (palavras.length > 3) {
                  const primeiraLinha = palavras
                    .slice(0, Math.ceil(palavras.length / 2))
                    .join(" ");
                  const segundaLinha = palavras
                    .slice(Math.ceil(palavras.length / 2))
                    .join(" ");
                  return (
                    <>
                      <div>{primeiraLinha}</div>
                      <div>{segundaLinha}</div>
                    </>
                  );
                }
                return nomeCompleto;
              })()}
            </div>

            {/* CPF do destinatário sobre a imagem */}
            <div className="absolute top-[242px] left-[100px] text-sm text-black">
              {userData.cpf}
            </div>
          </div>

          {/* Botão Regularizar Encomenda */}
          <div className="mb-6 text-center">
            <button 
              onClick={() => setLocation('/pagamento')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-sm uppercase tracking-wide transition-colors"
            >
              REGULARIZAR MINHA ENCOMENDA
            </button>
          </div>

          {/* Rastreamento da Encomenda */}
          <div className="bg-white rounded-lg shadow-sm border p-4">
            {/* Imagem de rastreamento com texto sobreposto */}
            <div className="w-full relative">
              <img
                src="https://www.libere-envio.site/localizar-encomenda/rastreio/images/15850-3aeaa092368e52344c66b50a36527aa0.png"
                alt="Status de rastreamento da encomenda"
                className="w-full h-auto"
              />

              {/* Texto sobre a imagem - exemplo na área de previsão */}
              <div className="absolute top-[45px] left-[70px] text-xs text-gray-700">
                <p className="font-medium">
                  Receber até dia {deliveryDate} após o pagamento
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </MobileOnly>
  );
}
