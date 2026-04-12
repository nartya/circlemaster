export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/.well-known/apple-app-site-association") {
      return new Response(JSON.stringify(
        {
                "applinks": {
                    "apps": [],
                    "details": [{
                    "appID": "PFJ48242H5.com.circlemaster.mawsika",
                    "paths": ["/circlemaster/join/*"]
                    }]
            }
        }
      ), {
        headers: {
          "content-type": "application/json"
        }
      });
    }

    return env.ASSETS.fetch(request);
  }
};