# AI-agenter

*Updated: 2026-03-29*
*Language: da*

Indbyggede AI-agenter til indholdsgenerering, SEO-optimering, GEO-optimering og oversættelse.

## Hvad er AI-agenter?

AI-agenter genererer og optimerer indhold baseret på din brandvoice og konfiguration. Hver agent har en specifik rolle:

| Agent | Rolle |
|-------|-------|
| **Content Writer** | Opretter nye blogindlæg, sider, beskrivelser |
| **SEO Optimizer** | Forbedrer metafelter, nøgleord, overskriftsstruktur |
| **GEO Optimizer** | Omstrukturerer indhold til AI-citering (svar-først, statistik, kilder) |
| **Translator** | Oversætter indhold til konfigurerede sprog |
| **Content Refresher** | Opdaterer forældet indhold med aktuel information |

## Sådan fungerer agenter

1. Du konfigurerer agenter i admin (Indstillinger → Agenter)
2. Hver agent har en systemprompt der definerer dens adfærd
3. Agenter producerer **kladder** der lander i **Kurateringskøen**
4. Du gennemgår, godkender eller afviser hver kladde
5. Godkendt indhold publiceres automatisk

## AI-lås

Felter du har redigeret i hånden er **låst** — agenter overskriver dem ikke. Dette sikrer at menneskelige redigeringer bevares selv når agenter kører masseoperationer.

## Brandvoice

Konfigurér en brandvoice i Indstillinger for at sikre at alt AI-genereret indhold matcher din tone:

- **Tone** — professionel, afslappet, venlig, autoritativ
- **Målgruppe** — udviklere, marketingfolk, almen offentlighed
- **Retningslinjer** — specifikke instruktioner som "Brug altid aktiv stemme"