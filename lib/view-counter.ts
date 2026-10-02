// Keep this key unchanged across redesigns, repository changes and deployments.
export const HOME_VIEWS_KEY = "site:views:home";

// Only request IDs expire. The cumulative counter never gets an expiry.
const INCREMENT_ONCE = `
if redis.call('SET', KEYS[2], '1', 'NX', 'EX', 86400) then
  return redis.call('INCR', KEYS[1])
end
return tonumber(redis.call('GET', KEYS[1]) or '0')
`;

export class CounterUnavailable extends Error {}

export async function homeViews(visitId?: string): Promise<number> {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_URL
    ? process.env.UPSTASH_REDIS_REST_TOKEN
    : process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new CounterUnavailable("Counter is not configured");

  const command = visitId
    ? ["EVAL", INCREMENT_ONCE, 2, HOME_VIEWS_KEY, `site:views:request:${visitId}`]
    : ["GET", HOME_VIEWS_KEY];
  const response = await fetch(url.replace(/\/+$/, ""), {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
    signal: AbortSignal.timeout(5000),
  });
  const data = await response.json();
  if (!response.ok || data.error) throw new CounterUnavailable("Counter storage failed");
  const views = Number(data.result ?? 0);
  if (!Number.isSafeInteger(views) || views < 0) throw new CounterUnavailable("Invalid counter value");
  return views;
}
