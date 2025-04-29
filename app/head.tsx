export default function Head() {
  return (
    <>
      <title>Resonance - Official Music Club of HITK</title>
      <meta name="description" content="The Official Music Club of HITK" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="UTF-8" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />

      <link
        rel="preload"
        as="style"
        href="https://fonts.googleapis.com/css2?family=Tagesschrift&display=swap"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Tagesschrift&display=swap"
        rel="stylesheet"
      />

      <link
        rel="preload"
        href="/fonts/Sanskrit/sansk.ttf"
        as="font"
        type="font/ttf"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/Gothic/Gothic.ttf"
        as="font"
        type="font/ttf"
        crossOrigin="anonymous"
      />

      <link rel="preload" as="image" href="/images/background.png" />
    </>
  );
}
