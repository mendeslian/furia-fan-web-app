// Assets
import Adidas from "../../assets/brands/adidas.svg";
import CruzeiroDoSul from "../../assets/brands/cruzeiro-do-sul.svg";
import RedBull from "../../assets/brands/redbull.svg";
import HellManns from "../../assets/brands/hellmanns.svg";
import Lenovo from "../../assets/brands/lenovo.svg";
import PokerStars from "../../assets/brands/pokerstars.svg";

export default function BrandSection() {
  const brands = [
    { alt: "Adidas Logo", path: Adidas },
    { alt: "Cruzeiro Do Sul Logo", path: CruzeiroDoSul },
    { alt: "Red Bull Logo", path: RedBull },
    { alt: "HellManns Logo", path: HellManns },
    { alt: "Lenovo Logo", path: Lenovo },
    { alt: "PokerStars Logo", path: PokerStars },
  ];

  const brandsCount = brands.length;

  return (
    <section className="w-full h-48 flex items-center">
      <div
        className="w-full max-w-5xl h-16 mx-auto relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0))",
        }}
      >
        {brands.map((brand, index) => (
          <div
            key={index}
            className="w-40 h-16 scroll-animation"
            style={{
              left: "calc(200px * 6 )",
              animationDelay: `calc(20s / ${brandsCount} * (${brandsCount} - ${
                index + 1
              }) * -1)`,
            }}
          >
            <img
              src={brand.path}
              alt={brand.alt}
              draggable={false}
              className="w-full h-full select-none object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
