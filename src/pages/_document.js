import { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';
import theme from '../styles/theme'

const MyDocument = () => {
  return (
    <Html>
      <Head>
        <link href="https://cdn.tailwindcss.com" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400&display=swap"
          rel="stylesheet"
        />
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"></link>
        <meta name="google-site-verification" content="0AtWsFQtTb6gX_GisfjnzI2913zLvBHORLFa1hN9aW4" />

      </Head>
      <body>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
