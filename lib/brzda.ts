/**
 * Jednoduchá brzda na zaplavenie formulárov.
 *
 * ── Prečo vznikla ───────────────────────────────────────────────────────
 * Na jednom z našich webov (jutrstol.sk) bot zneužil formulár ako
 * rozosielač spamu a za jeden deň vyčerpal denný limit Resendu, ktorý
 * zdieľa viac projektov. Prestali fungovať formuláre všetkým klientom.
 *
 * ── Čo táto brzda je a čo nie je ────────────────────────────────────────
 * Počítadlo je v pamäti inštancie. Serverless beží na viacerých
 * inštanciách a po chvíli nečinnosti sa uspáva, takže to NIE JE tvrdý
 * limit — odhodlaný útočník ho obíde.
 *
 * Zastaví ale naivné zaplavenie z jednej adresy, čo je presne to, čo sa
 * stalo. Je to lacná prvá vrstva, nie náhrada za to, aby formulár vôbec
 * nevedel poslať e-mail na adresu zadanú návštevníkom.
 *
 * Tvrdé riešenie (Vercel KV / Upstash, prípadne captcha) má zmysel až
 * vtedy, keď toto prestane stačiť.
 */

const OKNO_MS = 60_000;
const MAX_V_OKNE = 3;
/** Strop na veľkosť mapy, nech pamäť inštancie nerastie donekonečna. */
const MAX_ADRIES = 500;

const stopy = new Map<string, number[]>();

/** IP odosielateľa podľa hlavičiek Vercelu. Nie `adresa` — ten názov
 * už v routách označuje adresu stavby od zákazníka. */
export function ipZiadosti(request: Request) {
  const fwd = request.headers.get("x-forwarded-for");
  return fwd?.split(",")[0].trim() || request.headers.get("x-real-ip") || "neznama";
}

/** `true` = v tomto okne už poslal priveľa, požiadavku zahoď. */
export function prilisCasto(ip: string) {
  const teraz = Date.now();
  const cerstve = (stopy.get(ip) ?? []).filter((t) => teraz - t < OKNO_MS);
  cerstve.push(teraz);
  stopy.set(ip, cerstve);

  if (stopy.size > MAX_ADRIES) {
    for (const [k, v] of stopy) {
      if (v.every((t) => teraz - t >= OKNO_MS)) stopy.delete(k);
    }
  }

  return cerstve.length > MAX_V_OKNE;
}
