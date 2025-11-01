import { useState } from "react";
import Header from "./components/Header";
import StatusPopup from "./components/StatusPopup";
import { languages } from "./assets/languages";

function App() {
  return (
    <main>
      <Header />
      <StatusPopup />
      <section className="languages">
        {languages.map((lang) => (
          <div
            key={lang.name}
            className="language-card"
            style={{
              backgroundColor: lang.backgroundColor,
              color: lang.color,
            }}
          >
            {lang.name}
          </div>
        ))}
      </section>
    </main>
  );
}

export default App;
