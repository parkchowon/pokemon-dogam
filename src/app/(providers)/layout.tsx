import { PropsWithChildren } from "react";
import Header from "./(root)/_components/Header";

function ProvidersLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default ProvidersLayout;
