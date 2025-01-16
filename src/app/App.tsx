import { Header } from 'widgets/header';
import { Footer } from 'widgets/footer';
import { Theme } from '@radix-ui/themes';
import { AppRouter } from './routers';

import '@radix-ui/themes/styles.css';
import './App.css';

function App() {
  return (
    <Theme
      className="main-container"
      accentColor="crimson"
      grayColor="sand"
      radius="large"
      scaling="100%"
    >
      <Header />

      <main>
        <AppRouter />
      </main>

      <Footer />
    </Theme>
  );
}

export default App;
