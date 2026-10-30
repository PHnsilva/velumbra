import Script from 'next/script';
import Cabin from './cabin';

export default function Home() {
  return (
    <>
      <Cabin />
      <Script src="/runtime/prologue.js" type="module" strategy="afterInteractive" />
    </>
  );
}
