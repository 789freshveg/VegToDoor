import Hero from "../components/Hero";
import Seasonal from "../components/Seasonal";
import Packages from "../components/Packages";
import Delivery from "../components/Delivery";
import Order from "../components/Order";
import About from "../components/About";

export default function Home() {
  return (
    <main>
      <Hero />
      <Seasonal />
      <Packages />
      <Delivery />
      <Order />
      <About />
    </main>
  );
}
