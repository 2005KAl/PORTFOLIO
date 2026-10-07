"""Screenshot the local site at desktop + mobile and check for horizontal overflow.
Usage: python scripts/shoot.py <out_dir> [url]"""
import sys, asyncio
from playwright.async_api import async_playwright

OUT = sys.argv[1]
URL = sys.argv[2] if len(sys.argv) > 2 else "http://localhost:3100"

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch()
        for name, w, h in [("desktop", 1440, 900), ("mobile", 390, 844)]:
            pg = await b.new_page(viewport={"width": w, "height": h}, device_scale_factor=1)
            errors = []
            pg.on("console", lambda m: m.type == "error" and errors.append(m.text))
            pg.on("pageerror", lambda e: errors.append(str(e)))
            await pg.goto(URL, wait_until="networkidle")
            await pg.wait_for_timeout(2200)
            await pg.screenshot(path=f"{OUT}/{name}-hero.png")
            # scroll through so reveal animations fire, then shoot each section
            total = await pg.evaluate("document.documentElement.scrollHeight")
            y = 0
            while y < total:
                await pg.evaluate(f"window.scrollTo(0,{y})"); await pg.wait_for_timeout(150); y += h // 2
            for sid in ["about", "skills", "work", "certifications", "experience", "achievements", "contact"]:
                el = await pg.query_selector(f"#{sid}")
                if not el: continue
                await pg.evaluate(f"document.getElementById('{sid}').scrollIntoView()")
                await pg.wait_for_timeout(1300)
                await pg.screenshot(path=f"{OUT}/{name}-{sid}.png")
            ov = await pg.evaluate("[document.documentElement.scrollWidth, innerWidth]")
            print(name, "scrollWidth/innerWidth", ov, "overflow" if ov[0] > ov[1] else "ok", "errors:", errors)
        await b.close()

asyncio.run(main())
