# Felttyper

*Updated: 2026-03-29*
*Language: da*

Komplet reference for alle 22 felttyper — text, richtext, image, blocks, relation og mere.

## Fælles feltegenskaber

Alle felter understøtter disse egenskaber:

```typescript
{
  name: string;          // Påkrævet: feltnøgle i dokumentdata
  type: FieldType;       // Påkrævet: en af typerne nedenfor
  label?: string;        // Visningslabel i admin
  required?: boolean;    // Skal have en værdi
  defaultValue?: unknown;
  ai?: {                 // AI-genereringshints
    hint?: string;       // f.eks. "Skriv i en venlig tone"
    maxLength?: number;
    tone?: string;
  };
}
```

## Grundlæggende typer

### text
Enkeltlinje tekstinput.
```typescript
{ name: 'title', type: 'text', required: true, maxLength: 120 }
```

### textarea
Flerlinjet ren tekst.

### number, boolean, date
Standardtyper for tal, sand/falsk og datoer.

## Indholdstyper

### richtext
Rich text / Markdown-indhold med blokeditor i admin. Valgfri `features`-array styrer værktøjslinjen.

### htmldoc
Fuld HTML-dokumenteditor (visuel WYSIWYG).

## Medietyper

**image**, **image-gallery**, **video**, **audio**, **file** — til alle medietyper.

> **Vigtigt:** Billedgalleriværdier skal være `{ url, alt }[]`-objekter, ikke plain strings.

## Strukturtyper

**select** — dropdown fra foruddefinerede valgmuligheder.
**tags** — frie tags gemt som `string[]`.
**relation** — reference til dokumenter i en anden collection.
**array** — gentagelige elementer med underfelter.
**object** — indlejret feltgruppe.
**blocks** — dynamiske indholdssektioner via bloksystemet.

## Specialtyper

**map** — OpenStreetMap med trækbar pin.
**interactive** — reference til en Interaktiv komponent.
**column-slots** — flerkolonne-layout med indlejrede felter.