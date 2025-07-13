import { 
  FileText, 
  Phone, 
  Briefcase, 
  Users, 
  MessageCircle, 
  Flag,
  Building,
  GraduationCap,
  Shield,
  Search,
  Lock,
  ShoppingCart
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full flex justify-center">
      <div className="max-w-md w-full px-4 py-6" style={{backgroundColor: '#FFE600'}}>
        {/* Fale Conosco Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-blue-900">Fale Conosco</h3>
          <div className="space-y-3">
            <button className="flex items-center space-x-3 text-blue-900 hover:text-blue-800 transition-colors">
              <FileText className="w-4 h-4" />
              <span className="text-sm">Registro de Manifestações</span>
            </button>
            <button className="flex items-center space-x-3 text-blue-900 hover:text-blue-800 transition-colors">
              <Phone className="w-4 h-4" />
              <span className="text-sm">Central de Atendimento</span>
            </button>
            <button className="flex items-center space-x-3 text-blue-900 hover:text-blue-800 transition-colors">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm">Soluções para o seu negócio</span>
            </button>
            <button className="flex items-center space-x-3 text-blue-900 hover:text-blue-800 transition-colors">
              <Users className="w-4 h-4" />
              <span className="text-sm">Suporte ao cliente com contrato</span>
            </button>
            <button className="flex items-center space-x-3 text-blue-900 hover:text-blue-800 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">Ouvidoria</span>
            </button>
            <button className="flex items-center space-x-3 text-blue-900 hover:text-blue-800 transition-colors">
              <Flag className="w-4 h-4" />
              <span className="text-sm">Denúncia</span>
            </button>
          </div>
        </div>

        {/* Sobre os Correios Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-blue-900">Sobre os Correios</h3>
          <div className="space-y-3">
            <button className="flex items-center space-x-3 text-blue-900 hover:text-blue-800 transition-colors">
              <Building className="w-4 h-4" />
              <span className="text-sm">Identidade corporativa</span>
            </button>
            <button className="flex items-center space-x-3 text-blue-900 hover:text-blue-800 transition-colors">
              <GraduationCap className="w-4 h-4" />
              <span className="text-sm">Educação e cultura</span>
            </button>
            <button className="flex items-center space-x-3 text-blue-900 hover:text-blue-800 transition-colors">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Código de ética</span>
            </button>
            <button className="flex items-center space-x-3 text-blue-900 hover:text-blue-800 transition-colors">
              <Search className="w-4 h-4" />
              <span className="text-sm">Transparência e prestação de contas</span>
            </button>
            <button className="flex items-center space-x-3 text-blue-900 hover:text-blue-800 transition-colors">
              <Lock className="w-4 h-4" />
              <span className="text-sm">Política de Privacidade e Notas Legais</span>
            </button>
          </div>
        </div>

        {/* Outros Sites Section */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-blue-900">Outros Sites</h3>
          <div className="space-y-3">
            <button className="flex items-center space-x-3 text-blue-900 hover:text-blue-800 transition-colors">
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm">Loja online dos Correios</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}