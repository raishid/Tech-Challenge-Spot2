import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { useUserStore } from "@/stores/user";
import useAcortadorStore from "@/stores/acortador";
import { useStore } from "@tanstack/react-store";
import { Acortar } from "@/providers/acortar";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { isValidUrl } from "@/lib/utils";

const _userStore = useUserStore();

export default function Acortador() {
  const router = useRouter();

  const { url, isLoading, error } = useStore(useAcortadorStore);
  const { setState: setStateAcortador, state: stateAcortador } =
    useAcortadorStore;
  const { u_id } = useStore(_userStore);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isValidUrl(url) === false) {
      setStateAcortador((state) => ({
        ...state,
        error: "La URL no es válida",
      }));
      return;
    }

    setStateAcortador(() => ({
      isLoading: true,
      url: "",
      error: "",
      shorten: "",
    }));

    try {
      const data = await Acortar({
        url,
        user_id: u_id as string,
      });

      setStateAcortador((state) => ({
        ...state,
        url: "",
        shorten: `${data.code}`,
      }));

      router.push("/shorten");
    } catch (err) {
      setStateAcortador((state) => ({
        ...state,
        error:
          err instanceof Error
            ? err.message
            : "Ocurrió un error al acortar el enlace",
      }));
    } finally {
      setStateAcortador((state) => ({
        ...state,
        isLoading: false,
      }));
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardDescription>Ingresa un enlace que desees acortar</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">URL a acortar</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://ejemplo.com/WVVoU01HTklUVFpNZVRsMFdsZGthRXh0TlRaTU1scHdZa2RWZGsxSWIzZFNiRTVLWVVaSmFscFZWbmxhVjNNd1pXdzVjMWRYWkd4ak1EQjNVbGRzUjJRelRUQlZWemw2VlZoQ2VsZHJNSGRPUnpWNVVraENibVF4WkZGa01FWjVZbmM5UFE9PQ=="
              value={url}
              onChange={(e) =>
                setStateAcortador((state) => ({
                  ...state,
                  url: e.target.value,
                }))
              }
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-second"
            disabled={isLoading}
          >
            {isLoading ? "Acortando..." : "Acortar enlace"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
}
