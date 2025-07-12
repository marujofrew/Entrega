import footerImagePath from "@assets/image_1752358494326.png";

export default function Footer() {
  return (
    <footer className="w-full">
      <img 
        src={footerImagePath} 
        alt="Footer Correios" 
        className="w-full h-auto"
      />
    </footer>
  );
}