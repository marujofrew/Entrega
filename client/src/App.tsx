import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import TrackingPage from "@/pages/tracking";
import RastreiosPage from "@/pages/rastreios";
import PagamentoPage from "@/pages/pagamento";
import MobileOnly from "@/components/MobileOnly";

function Router() {
  return (
    <Switch>
      <Route path="/" component={TrackingPage} />
      <Route path="/rastreamento" component={TrackingPage} />
      <Route path="/rastreios" component={RastreiosPage} />
      <Route path="/pagamento" component={PagamentoPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <MobileOnly>
          <Router />
        </MobileOnly>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
