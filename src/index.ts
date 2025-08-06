interface Env {}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === "GET" && path === "/greet") {
      const name = url.searchParams.get("name") || "Guest";
      return new Response(`Hello, ${name}!`, {
        headers: { "Content-Type": "text/plain" },
      });
    }

    if (request.method === "POST" && path === "/submit") {
      const data = await request.json<{ message: string }>();
      return new Response(`Received: ${data.message}`, {
        headers: { "Content-Type": "text/plain" },
      });
    }

	if (request.method === "GET" && path === "/json") {
    const data = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    return new Response(await data.json(), {
      headers: { "Content-Type": "application/json" },
    });
  }

    return new Response("Not found", { status: 404 });
  },
};
