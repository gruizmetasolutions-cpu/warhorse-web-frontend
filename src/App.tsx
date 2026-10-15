import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Security } from './pages/Security';
import { Contact } from './pages/Contact';
import { ApplyToday } from './pages/ApplyToday';
import { Resources } from './pages/Resources';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { StyleGuide } from './pages/StyleGuide';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="security" element={<Security />} />
          <Route path="contact" element={<Contact />} />
          <Route path="apply" element={<ApplyToday />} />
          <Route path="resources" element={<Resources />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="styleguide" element={<StyleGuide />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
