import bannerImagePath from "@assets/image_1752369671032.png";

export default function PromotionalBanner() {
  const handleBannerClick = () => {
    console.log("Banner clicked - Editais reabertos para contrato de lojas parceiras");
  };

  return (
    <div className="px-4 py-4">
      <div className="relative cursor-pointer" onClick={handleBannerClick}>
        <img 
          src={bannerImagePath} 
          alt="Um Correios para chamar de seu - Editais reabertos para contrato de lojas parceiras no Rio Grande do Sul. Clique aqui e saiba mais"
          className="w-full h-auto rounded-lg shadow-sm"
        />
      </div>
    </div>
  );
}
