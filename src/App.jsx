import Header from './layouts/Header';
import AuthProvider from './context/auth/AuthProvider'
import AppRouter from './routes/AppRouter';
import GoodsProvider from './context/goods/GoodsProvider';

function App() {
  return (
    <>
      <GoodsProvider>
        <AuthProvider>
          <Header />
          <AppRouter />
        </AuthProvider>
      </GoodsProvider>
    </>
  );
}

export default App;
