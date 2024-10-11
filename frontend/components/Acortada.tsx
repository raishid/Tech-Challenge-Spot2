import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { AlertCircle, Copy } from "lucide-react";
import { useStore } from "@tanstack/react-store";
import useAcortadorStore from "@/stores/acortador";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { useUrl } from "nextjs-current-url";
import { useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Acortada() {
  const { shorten, error } = useStore(useAcortadorStore);
  const notify = () =>
    toast("Enlace copiado al portapapeles", {
      autoClose: 3000,
      position: "top-center",
      type: "success",
    });

  const { hostname, protocol, port } = useUrl() ?? {};

  const shorteUrl = useMemo(() => {
    if (!shorten) return "";
    return `${protocol}//${hostname}${port ? `:${port}` : ""}/${shorten}`;
  }, [shorten, protocol, hostname, port]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shorteUrl).then(() => notify());
  };
  return (
    <>
      <ToastContainer />
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-xl text-muted-foreground">
            URL Acortada, link corto
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {shorten && (
            <div className="w-full space-y-2">
              <Label>Enlace acortado:</Label>
              <div className="flex items-center space-x-2">
                <Input value={shorteUrl} readOnly />
                <Button
                  className="bg-second hover:bg-third"
                  size="icon"
                  onClick={copyToClipboard}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="w-full flex justify-center mt-4 lg:mt-12">
        <Link
          href="/"
          className="bg-third px-4 py-2 rounded text-white hover:bg-second"
        >
          Acortar otra url o enlace
        </Link>
      </div>
    </>
  );
}
