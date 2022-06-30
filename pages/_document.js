import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* The correct way to add google fonts to a project */}
        <link
          href='https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700&display=swap'
          rel='stylesheet'
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
