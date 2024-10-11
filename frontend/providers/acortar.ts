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
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "https://localhost:8000/api";

  const response = fetch(`${apiUrl}/shorten/${shorten}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  return (await response).json();
}
