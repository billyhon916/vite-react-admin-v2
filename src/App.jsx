import React from "react";
import Router from "./Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import withAuthentication from "./components/withAuthentication";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default withAuthentication(App);
