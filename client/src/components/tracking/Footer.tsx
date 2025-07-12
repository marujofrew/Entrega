import footerImagePath from "@assets/image_1752358494326.png";

export default function Footer() {
  return (
    <footer className="w-full flex justify-center">
      <div className="max-w-md w-full">
        <img 
          src={footerImagePath} 
          alt="Footer Correios" 
          className="w-full h-auto"
        />
      </div>
    </footer>
  );
}