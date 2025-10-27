# Tailwind v4 Breaking Changes

## Removed deprecated utilities

We've removed any utilities that were deprecated in v3 and have been
undocumented for several years. Here's a list of what's been removed along with
the modern alternative:

| **Deprecated**       | **Replacement**          |
| -------------------- | ------------------------ |
| bg-opacity-          | use bg-black/50          |
| text-opacity-        | use text-black/50        |
| border-opacity-      | use border-black/50      |
| divide-opacity-      | use divide-black/50      |
| ring-opacity-        | use ring-black/50        |
| placeholder-opacity- | use placeholder-black/50 |
| flex-shrink-         | shrink-                  |
| flex-grow-           | grow-                    |
| overflow-ellipsis    | text-ellipsis            |
| decoration-slice     | box-decoration-slice     |
| decoration-clone     | box-decoration-clone     |

## Renamed utilities

We've renamed the following utilities in v4 to make them more consistent and
predictable:

| **v3**           | **v4**           |
| ---------------- | ---------------- |
| shadow-sm        | shadow-xs        |
| shadow           | shadow-sm        |
| drop-shadow-sm   | drop-shadow-xs   |
| drop-shadow      | drop-shadow-sm   |
| blur-sm          | blur-xs          |
| blur             | blur-sm          |
| backdrop-blur-sm | backdrop-blur-xs |
| backdrop-blur    | backdrop-blur-sm |
| rounded-sm       | rounded-xs       |
| rounded          | rounded-sm       |
| outline-none     | outline-hidden   |
| ring             | ring-3           |
