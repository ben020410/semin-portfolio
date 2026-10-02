import { homeViews } from "@/lib/view-counter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function json(data: object, status = 200) {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
}

export async function GET() {
  try {
    return json({ views: await homeViews() });
  } catch {
    return json({ error: "View count is temporarily unavailable" }, 503);
  }
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (request.headers.get("x-view-counter") !== "1" ||
      (origin && origin !== new URL(request.url).origin)) {
    return json({ error: "Forbidden" }, 403);
  }
  let visitId: unknown;
  try {
    ({ visitId } = await request.json());
  } catch {
    return json({ error: "Invalid request" }, 400);
  }
  if (typeof visitId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(visitId)) {
    return json({ error: "Invalid visit ID" }, 400);
  }
  try {
    // Local development and Vercel previews must not inflate the live count.
    const countVisit = process.env.VERCEL_ENV === "production" ||
      (!process.env.VERCEL_ENV && process.env.NODE_ENV === "production");
    return json({ views: await homeViews(countVisit ? visitId : undefined) });
  } catch {
    return json({ error: "View count is temporarily unavailable" }, 503);
  }
}
