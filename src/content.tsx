import "./index.css";

import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import Content from "./components/content";
import Providers from "./components/providers";

// import ContentPage from '@/content/content'

const root = document.createElement("div");
root.id = "_leetcode_helper_bot";
document.body.append(root);

createRoot(root).render(
  <StrictMode>
    <Providers>
      <Content />
    </Providers>
  </StrictMode>
);
