import Header from './components/layout/Header';
import ResumeBuilder from './components/ResumeBuilder';
import { ResumeProvider } from './context/ResumeContext';

function App() {
  return (
    <ResumeProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1">
          <ResumeBuilder />
        </main>
        <footer className="bg-white py-4 border-t border-gray-200">
          <div className="container mx-auto px-4 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Resume Builder. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </ResumeProvider>
  );
}

export default App;