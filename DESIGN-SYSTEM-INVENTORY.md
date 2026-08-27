# Nexleaf Design System v2.1 — component inventory

**File `y4XdS2kaiS8eMHY3z8wORP` · 82 components across 64 pages · read 2026-08-26.**

This exists because I kept "discovering" components by tripping over them — I told Raphael there was
no `Tag` component when it has 18 variants, and used `Badge` for chips. **Check this list before
claiming something is missing, and before hand-composing anything.**

Format: `Name | key (16) | variants | properties`. `=` marks a variant dimension, `:T/:B/:I` are
text / boolean / instance-swap properties.

## Reach for these first

| Need | Component |
|---|---|
| chip / token / removable pill | **`Tag`** — never `Badge` |
| status pill, count, "Added" | `Badge` |
| list row (icon + title + badge + description + action) | **`Cell`** |
| text input | `Text field` · numeric `Number field` · multiline `Multiline field` |
| dropdown | `Select` |
| radio / checkbox group | `Choice list` · singles `Radio button`, `Checkbox` |
| inline validation message | `Inline error` |
| page-level message | `Banner` (`In card` boolean) |
| transient confirmation | `Toast` |
| dialog | `Modal` (`Size = small/large/fullscreen`) |
| empty state | `Empty state` · `Exception list` for per-row problems |
| loading | `Spinner` · `Skeleton body text` / `display text` / `thumbnail` · `Progress bar` |
| paging | `Pagination` (`Type = page/table`) |
| tabular | `Data table` · `Index table` · `Resource list` (each has a `Mobile/` twin) |

## Full list

### Layout & page
```
Page                     | 24b29c3f06f93c00 | 1
Page actions             | 229b1a2e98a3dbd1 | 1   | Secondary action:B · Tertiary action:B
Top bar                  | e93063e1497cc29f | 3v  | Width=large screens/medium screens/small screens
Navigation               | d4dc11794ee4c5b5 | 1
Mobile/Navigation        | 6484c71980f00b61 | 1
Breadcrumb               | 9f68747f71cf0cfe | 1   | Crumb 1:B · Crumb 2:B · Page List:B · Crumb 3:B · Crumb 4:B · Crumb 5:B
Divider                  | 3de42106b3482ab2 | 1
Fullscreen bar           | d7b720de3c065fb0 | 1   | Has content:B · Content:I
Contextual save bar      | b6e17b796e26d131 | 5v  | Full width / Align content flush / In overlay
Footer help              | 004b4950cb17b118 | 1   | Content:T
```

### Actions
```
Button                   | 948893e290c1b1e3 | 119v | Icon:B · Disclosure:B · Label content:T ·
                                                     State=rest/hover/active/focus/disabled/loading/pressed ·
                                                     Variant=default/primary/tertiary/plain ·
                                                     Tone=default/critical/success · Size=medium (default)/large/micro
Icon button              | 4e110d9a8cd96b25 | 108v | same State/Variant/Tone/Size axes
Button group             | 5b2b9c713155db34 | 3v  | Gap=tight/extra tight/loose
Button group segmented   | a324e72f7db52131 | 2v
Link                     | 3c2d205e9f2c46ff | 3v  | State=rest/hover/active
Action List              | af4e799f999a7b2b | 1   | 10 items, each with type + show toggle
```

### Inputs
```
Text field               | f3637d27412a13a6 | 26v | Tags:B · Placeholder:B · Label:B · Help text:B ·
                                                     Prefix:B · Suffix:B · Clear button:B · Label action:B ·
                                                     State=rest/hover/active/focus/disabled/read only/error ·
                                                     Tone=default/magic · Borderless · Size=default/slim
Number field             | e1f440219d9065f6 | 8v
Multiline field          | 48905f9fd6698689 | 9v  | Has WYSIWYG:B · Max length:B
Select                   | 745fe6592a9138b7 | 24v | Label=default/inline/hidden
Checkbox                 | 0bba33e09e372159 | 20v | Checked=false/true/indeterminate
Radio button             | a4cb75ca16922030 | 12v
Choice list              | 422c79eaa2a1f57f | 2v  | Allow multiple · up to 8 choices
Toggle                   | e2b2d18eb64f24a1 | 10v
Range slider             | f9fe817970c56eb9 | 10v | Type=dual thumb/single thumb
Color picker             | 100862f93d0a72b6 | 2v
DatePicker               | 22aaecb749c5a332 | 4v  | the calendar SURFACE, not a date field
Inline error             | 829b728811426b40 | 1   | Message:T
Listbox                  | 2d88d7f01b1ce56d | 1
Option list              | f087159f60fa6e32 | 4v  | Allow multiple · Media
Title Option list        | 633edc17e73b5937 | 2v
```

### Feedback & status
```
Banner                   | 675d5fe741d8600f | 12v | Tone=info/success/warning/critical · In card · Title
Toast                    | cdbbd95ce283e4ce | 2v  | Type=default/error
Badge                    | a6f279056633e85f | 112v | Tone=14 options · Size=medium/large · Progress Indicator · Icon · Cancel
Tag                      | 273eaf2c4ec0b5fd | 18v | Removable=false/true · Tone=default/magic · State=5
Exception list           | 4c34c8ddc4c2341a | 6v  | Status=default/warning/critical
Empty state              | 975245add6b585ff | 1
Spinner                  | f25c83925aa7a5b2 | 2v
Progress bar             | 45bcd4dda95beb0c | 12v
Skeleton body text       | 7a5daf3c3e4bd03d | 6v  | Lines=1..6
Skeleton display text    | 37f646333393e6a6 | 3v
Skeleton thumbnail       | b3d475ce8b65da07 | 4v
Tooltip                  | 15614bbfe6b78647 | 2v  | Position=below/above
```

### Containers & data
```
Card                     | be7c7d58a119c6fe | 1   | Show Slot:B · Content:I
Metric Card              | a2f5f09a4e95ff73 | 7v
Card display text        | ad517808e103bf9b | 3v  | type=with icon/without icon/map
Card display image       | 6bac85bace78be54 | 3v
Callout card             | 7162dda5494144e8 | 1
Media card               | 5c1cd30be0cb859e | 4v  | Media type=video/image · Portrait
Cell                     | d8b23b411b463dd9 | 5v  | Tone=success/critical/warning/info/neutral ·
                                                     Icon:B · Description:B · Badge:B · Button:B · Chevron:B
Modal                    | cd2443c7756a2683 | 3v  | Size=small/large/fullscreen
Popover                  | f7a3404c683f1787 | 2v
Data table               | 15129ea3bbe24606 | 6v  | + Mobile/Data table d7ae4b475799e638
Index table              | 05fe04455984d804 | 6v  | + Mobile/Index table 7cc58ef98c832f4c
Resource list            | 08b387d4a72efae3 | 20v | + Mobile/Resource list fd12777c942b1c34
Description list         | b0c8b3f8bf9bb5c1 | 2v
Pagination               | 97f9ff94371a1f0d | 8v  | Type=page/table · Has previous · Has next · Label
Filters / Index filter   | cb09f22df57ef2a4 / ccf3bf97c4f34e08
Tabs                     | ae9dc11a6342b418 | 2v  | Fitted · 8 tabs
```

### Media & misc
```
Avatar                   | 867d13533361f4a2 | 60v | Size=xs..xl · Color=one..five · Type=customer/default/image/initials
Thumbnail                | 6a119e961755b2c1 | 16v | Size=xs/sm/md/lg · Source=image/icon · Transparent
Video thumbnail          | a4a9574dcf2b30f6 | 1
QR code                  | 60fa70ab10c98a66 | 3v  | Size=192 (preview)/88/40 · Caption:B
Keyboard key             | 4a795d7626a1e4d1 | 2v
Account Connection       | 151fa980a85dba5f | 2v
Drop zone                | 0d74fd249363a9ba | 21v | State=rest/hover/focus/disabled/dragging/error/Uploaded Image/Option Uploaded/Select Uploaded · Size=default/medium/small
Toggle_main              | f1fc3dc44840af38 | 10v | State=rest/hover/focus/error/disabled · Checked=false/true
.slot examples           | 336dc8bf882aa1b4 | 4v  | Type=Card/Modal/modal-2/Popover — slots DO accept real instances
```

## Gotchas

- **`Drop zone` and `Toggle_main` were broken and are now fixed (2026-08-26).** Both threw
  *"Component set has existing errors"*. Causes and repairs:
  - `Drop zone` — three variants (`Uploaded Image`, `Option Uploaded`, `Select Uploaded`) declared
    only `State`, while the other 18 declared `State` + `Size`. **A variant missing an axis breaks
    the whole set.** All three are 590x120, so they were renamed `…, Size=default`.
  - `Toggle_main` — two variants both named `State=rest, Checked=true`, and no `Checked=false` rest
    state at all. Index 5 had a light `#e3e3e3` track with the knob at x=2, i.e. the off state
    mislabelled. Renamed to `State=rest, Checked=false`, which also completes the matrix.
  - Diagnosing a broken set: parse every variant name into key/value pairs, then look for (a) a
    property missing from some variants, (b) duplicate combinations, (c) children that aren't
    `COMPONENT`. Verify the value against the artwork before renaming — don't guess which duplicate
    is wrong.
- **Property keys carry a literal `↪️ ` prefix** for exposed nested properties. Resolve by regex,
  never hardcode.
- **`DatePicker` is the calendar surface**, not a date field. A date input is a `Text field` with a
  suffix icon.
- **Colour variables are remote**, not local — harvest handles off a component that already binds
  them. Check the resolved value after binding; names can match while values don't.
- Mobile twins exist for Data table, Index table, Resource list, Filters, Navigation, Tabs — use
  them at 375 rather than shrinking the desktop one.
