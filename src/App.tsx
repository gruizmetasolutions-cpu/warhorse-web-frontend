import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Security } from './pages/Security';
import { Contact } from './pages/Contact';
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
          <Route path="styleguide" element={<StyleGuide />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
