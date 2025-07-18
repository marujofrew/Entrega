import headerImagePath from "@assets/image_1752358689127.png";

export default function Header() {
  return (
    <header className="w-full flex justify-center">
      <div className="max-w-md w-full">
        <img 
          src={headerImagePath} 
          alt="Correios Header" 
          className="w-full h-auto"
        />
      </div>
    </header>
  );
}
