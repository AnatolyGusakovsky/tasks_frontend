
export function ExampleAppsLayout({
                                    title,
                                    children,
                                  }: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="cx-mainLayout cx-mainLayout-mastheadDivider">
      {/*<Head>*/}
      {/*  <link rel="stylesheet" href="/assets/fonts/3/fonts.css" />*/}
      {/*  <link rel="stylesheet" href="/assets/cx/3/cx.min.css" />*/}
      {/*  <style dangerouslySetInnerHTML={{__html: inlineStyle}} />*/}
      {/*</Head>*/}
      {/*<header className="cx-masthead cx-gridPadding cx-sectionSeparator">*/}
      {/*  <h1 className="cx-masthead-title">{title}</h1>*/}
      {/*</header>*/}
      {/*<div className="cx-gridPadding">{children}</div>*/}
    </main>
  );
}
