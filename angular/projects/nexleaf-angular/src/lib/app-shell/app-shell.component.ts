import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

/**
 * nx-app-shell — responsive application shell scaffold.
 *
 * CSS-driven responsive layout (see AppShell.css): at ≥1024 the docked rail
 * shows and the content reserves its width; below that the rail hides and the
 * top bar's hamburger opens nx-menu-drawer. Project:
 *   • [rail]    — the docked desktop navigation (e.g. your side nav)
 *   • [topbar]  — the sticky top bar (nx-toolbar). Mark the hamburger with
 *                 class="nx-app-shell__hamburger" so it hides on desktop.
 *   • default   — page content.
 * Render nx-menu-drawer alongside (controlled by the hamburger) for tablet/mobile.
 *
 *   <nx-app-shell>
 *     <div rail>…docked nav…</div>
 *     <nx-toolbar topbar …></nx-toolbar>
 *     <main>…page…</main>
 *   </nx-app-shell>
 *   <nx-menu-drawer [open]="drawerOpen" …></nx-menu-drawer>
 */
@Component({
  selector: 'nx-app-shell',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="nx-app-shell" [class.nx-app-shell--auto]="auto" [class.nx-app-shell--docked]="docked">
      <div class="nx-app-shell__rail"><ng-content select="[rail]"></ng-content></div>
      <div class="nx-app-shell__main">
        <div class="nx-app-shell__topbar"><ng-content select="[topbar]"></ng-content></div>
        <main class="nx-app-shell__content"><ng-content></ng-content></main>
      </div>
    </div>
  `,
})
export class NxAppShellComponent {
  /** Use the built-in ≥1024 media query to auto-dock the rail (default). */
  @Input() auto = true;
  /** Force the docked layout regardless of viewport (overrides `auto`). */
  @Input() docked = false;
}
