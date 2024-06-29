
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme.tsx';
import './global.css'
import { Provider, useDispatch } from "react-redux";
import { Toaster, toast } from 'sonner'
import AppRouter from './Router';
import { useDocumentTitle } from '@mantine/hooks';

export default function App() {

  return (
    // <Provider store={store}>
      <MantineProvider theme={theme}>
        <AppRouter />
      </MantineProvider>
    // </Provider>
  );


}
