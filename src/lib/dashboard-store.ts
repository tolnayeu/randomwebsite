/**
 * Local JSON persistence at `data/dashboard-store.json`.
 * On serverless hosts (e.g. Vercel) the filesystem is read-only/ephemeral –
 * visits and submissions won’t persist across deploys unless you swap this
 * for KV/Postgres/Blob storage.
 */
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type ReservationSubmission = {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  message: string;
  receivedAt: string;
};

export type AnalyticsEventRow = {
  name: string;
  at: string;
  params?: Record<string, string>;
};

export type DashboardStore = {
  visitsTotal: number;
  /** day key YYYY-MM-DD → count */
  visitsByDay: Record<string, number>;
  /** path → count */
  visitsByPath: Record<string, number>;
  submissions: ReservationSubmission[];
  /** newest last, capped */
  analyticsEvents: AnalyticsEventRow[];
};

const STORE_PATH = path.join(process.cwd(), "data", "dashboard-store.json");
const MAX_EVENTS = 400;
const MAX_SUBMISSIONS = 500;

const defaultStore = (): DashboardStore => ({
  visitsTotal: 0,
  visitsByDay: {},
  visitsByPath: {},
  submissions: [],
  analyticsEvents: [],
});

let chain: Promise<void> = Promise.resolve();

function serialize<T>(fn: () => Promise<T>): Promise<T> {
  const next = chain.then(fn, fn);
  chain = next.then(
    () => undefined,
    () => undefined,
  );
  return next;
}

async function ensureDataDir() {
  await mkdir(path.dirname(STORE_PATH), { recursive: true });
}

export async function readDashboardStore(): Promise<DashboardStore> {
  try {
    const raw = await readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<DashboardStore>;
    const base = defaultStore();
    return {
      visitsTotal:
        typeof parsed.visitsTotal === "number"
          ? parsed.visitsTotal
          : base.visitsTotal,
      visitsByDay: {
        ...base.visitsByDay,
        ...(parsed.visitsByDay ?? {}),
      },
      visitsByPath: {
        ...base.visitsByPath,
        ...(parsed.visitsByPath ?? {}),
      },
      submissions: Array.isArray(parsed.submissions)
        ? parsed.submissions
        : base.submissions,
      analyticsEvents: Array.isArray(parsed.analyticsEvents)
        ? parsed.analyticsEvents
        : base.analyticsEvents,
    };
  } catch {
    return defaultStore();
  }
}

async function writeDashboardStore(store: DashboardStore) {
  await ensureDataDir();
  await writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
}

/** Local calendar day (server/host timezone). */
function dayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export async function recordPageVisit(requestPath: string) {
  const pathNorm = requestPath.split("?")[0] || "/";
  if (
    pathNorm.startsWith("/dashboard") ||
    pathNorm.startsWith("/api") ||
    pathNorm.startsWith("/_next")
  ) {
    return;
  }

  await serialize(async () => {
    const store = await readDashboardStore();
    store.visitsTotal += 1;
    const dk = dayKey();
    store.visitsByDay[dk] = (store.visitsByDay[dk] ?? 0) + 1;
    store.visitsByPath[pathNorm] = (store.visitsByPath[pathNorm] ?? 0) + 1;
    await writeDashboardStore(store);
  });
}

export async function recordAnalyticsEvent(
  name: string,
  params?: Record<string, string>,
) {
  await serialize(async () => {
    const store = await readDashboardStore();
    store.analyticsEvents.push({
      name,
      at: new Date().toISOString(),
      params,
    });
    if (store.analyticsEvents.length > MAX_EVENTS) {
      store.analyticsEvents = store.analyticsEvents.slice(-MAX_EVENTS);
    }
    await writeDashboardStore(store);
  });
}

export async function appendSubmission(entry: ReservationSubmission) {
  await serialize(async () => {
    const store = await readDashboardStore();
    store.submissions.push(entry);
    if (store.submissions.length > MAX_SUBMISSIONS) {
      store.submissions = store.submissions.slice(-MAX_SUBMISSIONS);
    }
    await writeDashboardStore(store);
  });
}

export function summarizeVisits(store: DashboardStore) {
  const today = dayKey();
  let last7 = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    const k = dayKey(d);
    last7 += store.visitsByDay[k] ?? 0;
  }
  const topPaths = Object.entries(store.visitsByPath)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return {
    total: store.visitsTotal,
    today: store.visitsByDay[today] ?? 0,
    last7,
    topPaths,
  };
}
