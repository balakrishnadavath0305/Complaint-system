import { useLocation } from 'react-router-dom';
import GovTopbar from './GovTopbar';
import GovHeader from './GovHeader';
import GovMainNavbar from './GovMainNavbar';
import GovCarousel from './GovCarousel';
import QuickAccessSection from './QuickAccessSection';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;
  const isHomePage = path === '/';


  return (
      <div className="flex flex-col bg-gray-100">
        <GovTopbar />
      <GovHeader />
      <GovMainNavbar />
      {isHomePage && <GovCarousel />}
      <div className="flex-grow">{children}</div>
      {isHomePage && <QuickAccessSection />}
      <Footer />
    </div>
  );
};

export default MainLayout;
