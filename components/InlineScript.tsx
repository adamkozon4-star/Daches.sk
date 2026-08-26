/**
 * Inline skript, ktorý beží synchrónne počas parsovania HTML — teda ešte pred
 * prvým vykreslením aj pred hydratáciou.
 *
 * `type` sa na klientovi prepína na `text/plain`, aby React v dev režime
 * nehlásil varovanie o `<script>` vnútri komponentu; `suppressHydrationWarning`
 * pokrýva rozdiel v tomto atribúte. Postup podľa dokumentácie Next.js
 * (Preventing flash before hydration).
 */
export default function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
