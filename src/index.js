export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Serve AASA file
    if (url.pathname === "/.well-known/apple-app-site-association") {
      return new Response(JSON.stringify({
        "applinks": {
          "details": [{
            "appIDs": ["PFJ48242H5.com.circlemaster.mawsika"],
            "components": [
              { "/": "/join*" }
            ]
          }]
        }
      }), {
        headers: {
          "content-type": "application/json",
          "cache-control": "no-cache"
        }
      });
    }

    // Fallback page for /join when Universal Links don't intercept
    if (url.pathname === "/join" || url.pathname === "/join/") {
      const room = url.searchParams.get("room") || "";
      const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Join Circle Master</title>
  <script>
    const room = "${room}";
    if (room) {
      const ua = navigator.userAgent || "";
      if (/iPad|iPhone|iPod/.test(ua)) {
        window.location.href = "circlemaster://join?room=" + encodeURIComponent(room);
      } else if (/android/i.test(ua)) {
        window.location.replace(
          "intent://join?room=" + encodeURIComponent(room)
          + "#Intent;scheme=circlemaster;package=com.circlemaster.mawsika"
          + ";S.browser_fallback_url=" + encodeURIComponent("https://play.google.com/store/apps/details?id=com.circlemaster.mawsika")
          + ";end"
        );
      }
    }
  </script>
</head>
<body style="font-family:Arial;text-align:center;padding:50px">
  <h1>Opening Circle Master...</h1>
  <p>If the app doesn't open:</p>
  <p><a href="https://apps.apple.com/app/id6745800816">App Store</a> |
     <a href="https://play.google.com/store/apps/details?id=com.circlemaster.mawsika">Play Store</a></p>
</body>
</html>`;
      return new Response(html, {
        headers: { "content-type": "text/html;charset=UTF-8" }
      });
    }

    return env.ASSETS.fetch(request);
  }
};