"use client";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import _userAcortados from "@/stores/acortados";
import { getHistory } from "@/providers/acortar";
import { useStore } from "@tanstack/react-store";
import { format } from "date-fns";
import { useUrl } from "nextjs-current-url";
import { ToastContainer, toast } from "react-toastify";
import { copyToClipboard } from "@/lib/utils";
import "react-toastify/dist/ReactToastify.css";

export default function History() {
  const {
    data: enlaces,
    links: { page, next },
    isLoading,
  } = useStore(_userAcortados);
  const { setState } = _userAcortados;
  const [isFetching, setIsFetching] = useState(false);

  const loader = useRef(null);

  const { hostname, protocol, port } = useUrl() ?? {};

  const getUrlShorten = (shorten: string) => {
    return `${protocol}//${hostname}${port ? `:${port}` : ""}/${shorten}`;
  };

  const notify = () =>
    toast("Enlace copiado al portapapeles", {
      autoClose: 3000,
      position: "top-center",
      type: "success",
    });

  useEffect(() => {
    setState(() => ({
      data: [],
      links: {
        next: "1",
        previous: null,
        page: 0,
        total: 0,
        per_page: 0,
      },
      isLoading: false,
    }));
  }, []);

  const fetchHistory = async () => {
    if (isFetching || isLoading) return;
    setIsFetching(true);
    setState((state) => ({ ...state, isLoading: true }));
    const response = await getHistory(page + 1);

    if (response.exception) {
      setIsFetching(false);
      setState(() => ({
        data: [],
        links: {
          next: null,
          previous: null,
          page: 0,
          total: 0,
          per_page: 0,
        },
        isLoading: false,
      }));
      return;
    }

    setState((state) => ({
      ...state,
      data: [...state.data, ...response.data],
      links: response.links,
      isLoading: false,
    }));

    setIsFetching(false);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isFetching && next != null) {
        fetchHistory();
      }
    }, options);

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [next, isFetching]);

  return (
    <>
      <ToastContainer />
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>Enlaces Acortados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>URL Original</TableHead>
                  <TableHead>URL Acortada</TableHead>
                  <TableHead>Fecha de Creación</TableHead>
                  <TableHead>Visitas</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enlaces.map((enlace) => (
                  <TableRow key={enlace.id}>
                    <TableCell
                      className="font-medium truncate max-w-32 lg:max-w-xs"
                      title={enlace.url}
                    >
                      {enlace.url}
                    </TableCell>
                    <TableCell className="truncate max-w-32 lg:max-w-xs">
                      {getUrlShorten(enlace.code)}
                    </TableCell>
                    <TableCell>
                      {format(
                        new Date(enlace.created_at),
                        "yyyy-MM-dd HH:mm:ss"
                      )}
                    </TableCell>
                    <TableCell>{enlace.visits}</TableCell>
                    <TableCell className="flex items-center justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          copyToClipboard(getUrlShorten(enlace.code), notify)
                        }
                      >
                        <Copy className="h-4 w-4" />
                        <span className="sr-only">Copiar enlace acortado</span>
                      </Button>
                      <a
                        href={enlace.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-md"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">Abrir enlace original</span>
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div ref={loader} className="py-4">
            {isLoading && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
