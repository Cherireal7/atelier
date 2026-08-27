"""Render the Etege system-design sandbox architecture as a detailed PNG.

Regenerate with:
    python docs/render_architecture.py

Outputs:
    docs/architecture.png  — full stack architecture (client → DB)
    docs/routes.png        — route/transport/rendering map
"""

from __future__ import annotations

from pathlib import Path

import matplotlib.pyplot as plt
from matplotlib.patches import FancyArrowPatch, FancyBboxPatch, Rectangle

# Etege brand palette (from the Mesafint research report §22)
IVORY = "#FBF8F3"
CREAM = "#F1E9D8"
BLACK = "#0A0A0A"
GOLD = "#C9A55B"
WINE = "#7B2E3C"
SAGE = "#97A582"
INK = "#2A2A2A"
MUTED = "#6B6B6B"
FAINT = "#D9D2C2"


def box(
    ax,
    x: float,
    y: float,
    w: float,
    h: float,
    title: str,
    subtitle: str = "",
    body: list[str] | None = None,
    facecolor: str = IVORY,
    edgecolor: str = BLACK,
    title_color: str = BLACK,
    title_size: float = 11,
    tag: str = "",
    tag_color: str = GOLD,
    body_size: float = 8.2,
) -> None:
    """Draw a rounded rectangle with a title, optional subtitle, and body lines."""
    patch = FancyBboxPatch(
        (x, y),
        w,
        h,
        boxstyle="round,pad=0.02,rounding_size=0.10",
        linewidth=1.4,
        edgecolor=edgecolor,
        facecolor=facecolor,
        zorder=2,
    )
    ax.add_patch(patch)

    if tag:
        tag_w = 0.055 * len(tag) + 0.38
        tag_h = 0.32
        tag_x = x + w - tag_w - 0.14
        tag_y = y + h - tag_h - 0.14
        ax.add_patch(
            FancyBboxPatch(
                (tag_x, tag_y),
                tag_w,
                tag_h,
                boxstyle="round,pad=0.0,rounding_size=0.12",
                linewidth=0,
                facecolor=tag_color,
                zorder=3,
            )
        )
        ax.text(
            tag_x + tag_w / 2,
            tag_y + tag_h / 2,
            tag,
            ha="center",
            va="center",
            fontsize=8.2,
            color=IVORY,
            fontweight="bold",
            zorder=4,
        )

    ax.text(
        x + 0.22,
        y + h - 0.36,
        title,
        ha="left",
        va="top",
        fontsize=title_size,
        fontweight="bold",
        color=title_color,
        zorder=4,
    )
    if subtitle:
        ax.text(
            x + 0.22,
            y + h - 0.68,
            subtitle,
            ha="left",
            va="top",
            fontsize=8.5,
            color=MUTED,
            style="italic",
            zorder=4,
        )

    if body:
        start_y = y + h - (0.98 if subtitle else 0.72)
        for i, line in enumerate(body):
            ax.text(
                x + 0.22,
                start_y - i * 0.30,
                line,
                ha="left",
                va="top",
                fontsize=body_size,
                color=INK,
                zorder=4,
            )


def arrow(
    ax,
    src: tuple[float, float],
    dst: tuple[float, float],
    label: str = "",
    color: str = INK,
    style: str = "-|>",
    linestyle: str = "-",
    label_pos: tuple[float, float] | None = None,
    fontsize: float = 8,
    lw: float = 1.3,
) -> None:
    arr = FancyArrowPatch(
        src,
        dst,
        arrowstyle=style,
        mutation_scale=14,
        linewidth=lw,
        color=color,
        linestyle=linestyle,
        zorder=1,
    )
    ax.add_patch(arr)
    if label:
        if label_pos is None:
            mx = (src[0] + dst[0]) / 2
            my = (src[1] + dst[1]) / 2
        else:
            mx, my = label_pos
        ax.text(
            mx,
            my,
            label,
            ha="center",
            va="center",
            fontsize=fontsize,
            color=color,
            fontweight="bold",
            bbox=dict(facecolor=IVORY, edgecolor="none", pad=2),
            zorder=5,
        )


def render_architecture() -> Path:
    """Panel 1 — full stack architecture, client to DB."""
    fig, ax = plt.subplots(figsize=(20, 14), dpi=200)
    ax.set_xlim(0, 20)
    ax.set_ylim(0, 14)
    ax.set_facecolor(IVORY)
    fig.patch.set_facecolor(IVORY)
    ax.set_axis_off()

    # ---- Header --------------------------------------------------------
    ax.text(0.4, 13.55, "Etege", fontsize=34, fontweight="bold", color=BLACK, va="top")
    ax.text(
        0.4,
        12.90,
        "Frontend System Design Sandbox — architecture, transports, rendering strategies",
        fontsize=12,
        color=MUTED,
        va="top",
        style="italic",
    )
    ax.plot([0.4, 19.6], [12.55, 12.55], color=GOLD, linewidth=1.5, zorder=1)

    # ---- Left rail layer labels ----------------------------------------
    layers = [
        (11.45, "CLIENT"),
        (9.95, "EDGE"),
        (8.45, "GATEWAY + LB"),
        (7.10, "SHELL (host)"),
        (5.30, "MICRO FRONTENDS"),
        (3.45, "BFF"),
        (1.90, "MICROSERVICES"),
        (0.65, "DATA"),
    ]
    for y, name in layers:
        ax.text(
            0.15,
            y,
            name,
            fontsize=8.5,
            color=MUTED,
            fontweight="bold",
            rotation=90,
            va="center",
            ha="center",
        )

    # ---- Row 1: Client -------------------------------------------------
    box(
        ax,
        x=6.5,
        y=10.85,
        w=7.0,
        h=1.20,
        title="Browser (customer / bride)",
        subtitle="Chrome, Safari, mobile Safari — measured via web-vitals",
        body=["Reports LCP · INP · CLS to /api/vitals"],
        facecolor=CREAM,
    )

    # ---- Row 2: CDN edge ------------------------------------------------
    box(
        ax,
        x=6.5,
        y=9.35,
        w=7.0,
        h=1.20,
        title="CDN edge cache",
        subtitle="Cache-Control: immutable · content-hashed bundles · gzip/brotli",
        body=["Static assets · fonts · hero imagery · client JS bundles"],
        facecolor=IVORY,
        tag="static",
        tag_color=SAGE,
    )

    # ---- Row 3: Nginx gateway + LB --------------------------------------
    box(
        ax,
        x=6.5,
        y=7.85,
        w=7.0,
        h=1.20,
        title="Nginx · API Gateway + Load Balancer",
        subtitle="Terminates HTTPS · routes /api → BFF · /* → shell (2 replicas, round-robin)",
        body=["Edge fns: TLS · cookie auth check · rate limit · access log"],
        facecolor=IVORY,
        edgecolor=WINE,
        tag="infra",
        tag_color=WINE,
    )

    # ---- Row 4: Shell (full width) --------------------------------------
    shell_x, shell_y, shell_w, shell_h = 0.7, 6.55, 18.6, 1.10
    box(
        ax,
        x=shell_x,
        y=shell_y,
        w=shell_w,
        h=shell_h,
        title="apps/shell  ·  Next.js 15 host",
        subtitle="Owns global routing, auth session, design-token CSS · Module Federation runtime · lazy-loads each remote below",
        facecolor=CREAM,
        tag="host",
        tag_color=BLACK,
    )

    # ---- Row 5: Four MFEs -----------------------------------------------
    mfe_y = 4.25
    mfe_h = 2.10
    inner_gap = 0.30
    total_w = shell_w
    mfe_w = (total_w - 3 * inner_gap) / 4
    xs = [shell_x + i * (mfe_w + inner_gap) for i in range(4)]

    mfes = [
        (
            "mfe-catalog",
            "Route: /collection",
            [
                "Next.js remote · SSR",
                "getServerSideProps → BFF",
                "Streams pre-rendered HTML",
                "Hydrates in browser",
                "Optimizes LCP (hero image)",
            ],
            "SSR",
            WINE,
        ),
        (
            "mfe-cart",
            "Route: /cart",
            [
                "Vite + React remote · CSR",
                "Empty HTML shell → JS boots",
                "Cart state in Zustand",
                "Contrast SSR: watch the",
                "  white-screen tradeoff",
            ],
            "CSR",
            GOLD,
        ),
        (
            "mfe-checkout",
            "Route: /checkout",
            [
                "Next remote + EventSource",
                "Order status streams via SSE",
                "'confirmed → cutting →",
                "  stitching → shipped'",
                "One-way, chunked, cheap",
            ],
            "SSE",
            SAGE,
        ),
        (
            "mfe-concierge",
            "Route: /concierge",
            [
                "Vite + React + WebSocket",
                "Bride ↔ atelier chat",
                "Persistent duplex socket",
                "Reconnect with backoff",
                "Message framing + heartbeat",
            ],
            "WS",
            BLACK,
        ),
    ]
    for x, (title, sub, body_lines, tag, tag_col) in zip(xs, mfes):
        box(
            ax,
            x=x,
            y=mfe_y,
            w=mfe_w,
            h=mfe_h,
            title=title,
            subtitle=sub,
            body=body_lines,
            facecolor=IVORY,
            tag=tag,
            tag_color=tag_col,
        )

    # ---- Row 6: BFF (full width) ----------------------------------------
    bff_x, bff_y, bff_w, bff_h = 0.7, 2.90, 18.6, 1.10
    box(
        ax,
        x=bff_x,
        y=bff_y,
        w=bff_w,
        h=bff_h,
        title="apps/bff  ·  Hono + GraphQL Yoga",
        subtitle="One entry per client shape — desktop vs mobile queries · DataLoader batching · owned by the frontend team",
        body=["Aggregates product-svc + order-svc so MFEs never blocked on backend team's sprint"],
        facecolor=CREAM,
        edgecolor=WINE,
        tag="BFF",
        tag_color=WINE,
    )

    # ---- Row 7: Microservices side by side ------------------------------
    svc_y = 1.35
    svc_h = 1.05
    svc_w = 9.05
    box(
        ax,
        x=0.7,
        y=svc_y,
        w=svc_w,
        h=svc_h,
        title="services/product-svc  ·  Fastify",
        subtitle="REST · /products · /products/:id · /collections/:slug",
        body=["Imaginary 'catalog' team owns this in the real world"],
        facecolor=IVORY,
        tag="µsvc",
        tag_color=INK,
    )
    box(
        ax,
        x=0.7 + svc_w + 0.5,
        y=svc_y,
        w=svc_w,
        h=svc_h,
        title="services/order-svc  ·  Fastify",
        subtitle="REST + SSE · /orders · /orders/:id/events",
        body=["Emits status ticks every 2s during atelier cycle"],
        facecolor=IVORY,
        tag="µsvc",
        tag_color=INK,
    )

    # ---- Row 8: DBs -----------------------------------------------------
    box(
        ax,
        x=2.7,
        y=0.15,
        w=5.05,
        h=1.00,
        title="Products DB",
        subtitle="SQLite (dev) → Postgres (prod)",
        facecolor=IVORY,
    )
    box(
        ax,
        x=12.25,
        y=0.15,
        w=5.05,
        h=1.00,
        title="Orders DB",
        subtitle="SQLite (dev) → Postgres (prod)",
        facecolor=IVORY,
    )

    # ---- Vertical spine (client → CDN → Nginx → shell) ------------------
    # Labels placed OUTSIDE the box column to avoid landing on body text
    arrow(ax, (10.0, 10.85), (10.0, 10.55), color=WINE)
    ax.text(14.3, 10.70, "HTTPS", fontsize=9, color=WINE, fontweight="bold", ha="left", va="center")
    arrow(ax, (10.0, 9.35), (10.0, 9.05), color=SAGE)
    ax.text(14.3, 9.20, "static fetch (CDN)", fontsize=9, color=SAGE, fontweight="bold", ha="left", va="center")
    arrow(ax, (10.0, 7.85), (10.0, 7.65), color=INK)
    ax.text(14.3, 7.75, "proxy_pass  ·  /* → shell", fontsize=9, color=INK, fontweight="bold", ha="left", va="center")

    # ---- Shell → MFEs: straight verticals from shell bottom to MFE tops -
    shell_bottom = shell_y
    for x in xs:
        center = x + mfe_w / 2
        arrow(
            ax,
            (center, shell_bottom),
            (center, mfe_y + mfe_h),
            color=GOLD,
            lw=1.1,
            style="-|>",
        )
    ax.text(
        10.0,
        6.45,
        "Module Federation — remoteEntry.js loaded on route change",
        ha="center",
        va="center",
        fontsize=9,
        color=GOLD,
        fontweight="bold",
        bbox=dict(facecolor=IVORY, edgecolor=GOLD, boxstyle="round,pad=0.25", linewidth=1),
        zorder=5,
    )

    # ---- MFEs → BFF: horizontal collector bar under MFEs ----------------
    collector_y = 3.90
    ax.plot([1.4, 18.6], [collector_y, collector_y], color=INK, linewidth=1.0, zorder=1)
    # verticals from MFE bottom to collector
    for x in xs:
        center = x + mfe_w / 2
        ax.plot([center, center], [mfe_y, collector_y], color=INK, linewidth=1.0, zorder=1)
    # single arrow from collector to BFF top
    arrow(
        ax,
        (10.0, collector_y),
        (10.0, bff_y + bff_h),
        color=INK,
        lw=1.4,
    )
    ax.text(
        10.0,
        collector_y + 0.15,
        "GraphQL query · POST /api/graphql",
        ha="center",
        va="center",
        fontsize=9,
        color=INK,
        fontweight="bold",
        bbox=dict(facecolor=IVORY, edgecolor="none", pad=2),
        zorder=5,
    )

    # ---- Callouts for SSE + WS on collector -----------------------------
    ax.text(
        xs[2] + mfe_w / 2,
        collector_y - 0.22,
        "+ SSE stream",
        ha="center",
        va="center",
        fontsize=8,
        color=SAGE,
        fontweight="bold",
        bbox=dict(facecolor=IVORY, edgecolor="none", pad=1.5),
        zorder=5,
    )
    ax.text(
        xs[3] + mfe_w / 2,
        collector_y - 0.22,
        "+ WSS socket",
        ha="center",
        va="center",
        fontsize=8,
        color=BLACK,
        fontweight="bold",
        bbox=dict(facecolor=IVORY, edgecolor="none", pad=1.5),
        zorder=5,
    )

    # ---- BFF → services -------------------------------------------------
    arrow(
        ax,
        (5.5, bff_y),
        (5.5, svc_y + svc_h),
        color=INK,
        label="HTTP · REST",
        label_pos=(6.3, (bff_y + svc_y + svc_h) / 2),
    )
    arrow(
        ax,
        (14.5, bff_y),
        (14.5, svc_y + svc_h),
        color=SAGE,
        label="HTTP · REST + SSE upstream",
        label_pos=(15.8, (bff_y + svc_y + svc_h) / 2),
    )

    # ---- services → DBs -------------------------------------------------
    arrow(ax, (5.5, svc_y), (5.2, 1.15), color=MUTED, lw=0.9)
    arrow(ax, (14.5, svc_y), (14.8, 1.15), color=MUTED, lw=0.9)

    # ---- Footer ---------------------------------------------------------
    ax.text(
        0.4,
        -0.15,
        "Etege sandbox · practice ground for micro frontends, BFF, rendering strategies, real-time transports, and edge infrastructure.",
        fontsize=8.5,
        color=MUTED,
        style="italic",
        va="bottom",
    )

    out = Path(__file__).parent / "architecture.png"
    fig.savefig(out, dpi=200, bbox_inches="tight", facecolor=IVORY, pad_inches=0.3)
    plt.close(fig)
    return out


def render_routes() -> Path:
    """Panel 2 — routes / transports / rendering / owner map."""
    fig, ax = plt.subplots(figsize=(20, 11), dpi=200)
    ax.set_xlim(0, 20)
    ax.set_ylim(0, 11)
    ax.set_facecolor(IVORY)
    fig.patch.set_facecolor(IVORY)
    ax.set_axis_off()

    ax.text(0.4, 10.55, "Etege — Routes & Transports", fontsize=28, fontweight="bold", color=BLACK, va="top")
    ax.text(
        0.4,
        9.95,
        "What renders where, how it fetches, and which micro frontend owns it",
        fontsize=12,
        color=MUTED,
        va="top",
        style="italic",
    )
    ax.plot([0.4, 19.6], [9.60, 9.60], color=GOLD, linewidth=1.5, zorder=1)

    # ---- Table header ---------------------------------------------------
    columns = [
        ("Route", 0.4, 2.2),
        ("Owner MFE", 2.6, 3.0),
        ("Rendering", 5.6, 2.4),
        ("Transport to BFF", 8.0, 3.8),
        ("Data source", 11.8, 3.6),
        ("Web Vital focus", 15.4, 2.4),
        ("Interactivity", 17.8, 1.7),
    ]
    header_y = 8.65
    row_h = 0.85
    n_rows = 7

    # Header row
    ax.add_patch(
        Rectangle(
            (0.4, header_y),
            19.2,
            0.55,
            facecolor=BLACK,
            edgecolor=BLACK,
            zorder=1,
        )
    )
    for name, x, _ in columns:
        ax.text(
            x + 0.08,
            header_y + 0.27,
            name,
            fontsize=9.5,
            color=IVORY,
            fontweight="bold",
            va="center",
        )

    # ---- Rows -----------------------------------------------------------
    rows = [
        (
            "/",
            "shell",
            ("SSG", SAGE),
            "prebuilt · no BFF call",
            "static JSON",
            "LCP · CLS",
            "low",
        ),
        (
            "/collection",
            "mfe-catalog",
            ("SSR", WINE),
            "getServerSideProps → GraphQL",
            "product-svc via BFF",
            "LCP",
            "medium",
        ),
        (
            "/collection/[slug]",
            "mfe-catalog",
            ("ISR", GOLD),
            "revalidate: 300s",
            "product-svc via BFF",
            "LCP",
            "medium",
        ),
        (
            "/cart",
            "mfe-cart",
            ("CSR", GOLD),
            "fetch on mount",
            "localStorage + BFF sync",
            "INP · CLS",
            "high",
        ),
        (
            "/checkout",
            "mfe-checkout",
            ("SSR + SSE", SAGE),
            "EventSource /orders/:id/events",
            "order-svc via BFF stream",
            "INP",
            "high",
        ),
        (
            "/concierge",
            "mfe-concierge",
            ("CSR + WSS", BLACK),
            "wss://.../concierge/socket",
            "chat store (in-memory + Redis)",
            "INP",
            "very high",
        ),
        (
            "/api/graphql",
            "bff",
            ("N/A", MUTED),
            "POST body",
            "product-svc + order-svc",
            "TTFB",
            "server",
        ),
    ]

    for i, r in enumerate(rows):
        y = header_y - 0.06 - (i + 1) * row_h
        # alternating row fill
        if i % 2 == 0:
            ax.add_patch(
                Rectangle(
                    (0.4, y),
                    19.2,
                    row_h - 0.06,
                    facecolor=CREAM,
                    edgecolor="none",
                    zorder=0,
                )
            )
        # cells
        cells = [
            (r[0], BLACK, "monospace", "bold"),
            (r[1], INK, None, None),
            None,  # rendering pill drawn separately
            (r[3], INK, "monospace", None),
            (r[4], INK, None, None),
            (r[5], INK, None, None),
            (r[6], INK, None, None),
        ]
        for (name, x, _), cell in zip(columns, cells):
            if cell is None:
                continue
            text, color, family, weight = cell
            kwargs = dict(fontsize=9.5, color=color, va="center")
            if family:
                kwargs["family"] = family
            if weight:
                kwargs["fontweight"] = weight
            ax.text(x + 0.08, y + (row_h - 0.06) / 2, text, **kwargs)

        # rendering pill
        pill_label, pill_color = r[2]
        pill_x = columns[2][1] + 0.08
        pill_y = y + (row_h - 0.06) / 2 - 0.20
        pill_w = 0.09 * len(pill_label) + 0.55
        pill_h = 0.40
        ax.add_patch(
            FancyBboxPatch(
                (pill_x, pill_y),
                pill_w,
                pill_h,
                boxstyle="round,pad=0.0,rounding_size=0.14",
                linewidth=0,
                facecolor=pill_color,
                zorder=2,
            )
        )
        ax.text(
            pill_x + pill_w / 2,
            pill_y + pill_h / 2,
            pill_label,
            ha="center",
            va="center",
            fontsize=9,
            color=IVORY,
            fontweight="bold",
            zorder=3,
        )

    # ---- Footer legend -------------------------------------------------
    footer_y = 0.6
    ax.text(
        0.4,
        footer_y + 0.5,
        "Rendering pill colors match the architecture diagram — SSR wine · CSR gold · SSE + ISR sage · WS black",
        fontsize=9,
        color=MUTED,
        style="italic",
    )
    ax.text(
        0.4,
        footer_y,
        "Every route walks through Nginx → shell → federated MFE → BFF. The MFE choice determines rendering; the transport row shows how data actually gets there.",
        fontsize=9,
        color=MUTED,
        style="italic",
    )

    out = Path(__file__).parent / "routes.png"
    fig.savefig(out, dpi=200, bbox_inches="tight", facecolor=IVORY, pad_inches=0.3)
    plt.close(fig)
    return out


if __name__ == "__main__":
    print(f"Wrote {render_architecture()}")
    print(f"Wrote {render_routes()}")
