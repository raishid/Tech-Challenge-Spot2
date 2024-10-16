import { getCookie } from "cookies-next";
import { AcortadoResponse } from "@/types";

type payload = {
  user_id: string;
  url: string;
};

type responseAcortar = {
  code: string;
  url: string;
};

export async function Acortar(payload: payload): Promise<responseAcortar> {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "https://localhost:8000/api";

  //create urlencoded form data
  const formData = new URLSearchParams();
  formData.append("user_id", payload.user_id);
  formData.append("url", payload.url);

  const response = fetch(`${apiUrl}/shorten`, {
    method: "POST",
    headers: {
      accept: "application/json",
    },
    body: formData,
  });

  return (await response).json();
}

type responseGet = {
  url: string;
};

export async function get(shorten: string): Promise<responseGet> {
  let apiUrl;

  if (process.env.NEXT_USE_DOCKER === "true") {
    apiUrl = "http://nginx:5000/api";
  } else {
    apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "https://localhost:8000/api";
  }

  const response = await fetch(`${apiUrl}/shorten/${shorten}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  console.log(response);

  return await response.json();
}

export async function getHistory(page = 1): Promise<AcortadoResponse> {
  const u_id = getCookie("u_id");

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "https://localhost:8000/api";

  const query = new URLSearchParams({
    page: page.toString(),
  });

  const response = fetch(`${apiUrl}/${u_id}?${query}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  if ((await response).status === 404) {
    return {
      data: [],
      links: {
        next: null,
        previous: null,
        page: 0,
        total: 0,
        per_page: 0,
      },
      exception: "true",
      isLoading: false,
    };
  }

  return (await response).json();
}
