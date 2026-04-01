import Navbar from './components/Navbar';
import HeroSearch from './components/HeroSearch';
import LastMinuteDeals from './components/LastMinuteDeals';
import CourseCatalog from './components/CourseCatalog';
import HowItWorks from './components/HowItWorks';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="font-sans bg-tee-white">
      <Navbar />
      <HeroSearch />
      <LastMinuteDeals />
      <CourseCatalog />
      <HowItWorks />
      <Newsletter />
      <Footer />
    </main>
  );
}
