import BuilderPage from './components/builder/BuilderPage';
import LandingPage from './components/landing/LandingPage';
import { ToastProvider } from './components/ui/Toast';
import { ResumeProvider } from './context/ResumeContext';
import { useHashRoute } from './hooks/useHashRoute';

function App() {
  const { route, navigate } = useHashRoute();

  return (
    <ResumeProvider>
      <ToastProvider>
        {route === 'builder' ? <BuilderPage /> : <LandingPage onStart={() => navigate('builder')} />}
      </ToastProvider>
    </ResumeProvider>
  );
}

export default App;
