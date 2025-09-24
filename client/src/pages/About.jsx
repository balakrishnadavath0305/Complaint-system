import GovTopbar from '../components/GovTopbar';
import GovHeader from '../components/GovHeader';
import GovMainNavbar from '../components/GovMainNavbar';
import GovCarousel from '../components/GovCarousel';
import AboutSection from '../components/AboutSection';
import QuickAccessSection from '../components/QuickAccessSection';

function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <GovTopbar /> {/* Government Header */}
      <GovHeader />
      <GovMainNavbar/>  
      <GovCarousel/>
      <AboutSection/>
      <QuickAccessSection/>
    </div>
  );
}

export default About;
