"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import Header from "./(root)/_components/Header";

function ProvidersLayout({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      {children}
    </QueryClientProvider>
  );
}

export default ProvidersLayout;
