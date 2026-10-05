const CACHE="tro-ly-vi-iphone-25";
const FILES=["./","./index.html","./manifest.webmanifest","./version.json","./logo.png","./apple-touch-icon-white.png"];
self.addEventListener("install",event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES))));
self.addEventListener("activate",event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))));
self.addEventListener("message",event=>{if(event.data&&event.data.type==="SKIP_WAITING")self.skipWaiting()});
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  if(new URL(event.request.url).origin!==self.location.origin)return;
  if(event.request.mode==="navigate"){
    event.respondWith(caches.match("./index.html").then(cached=>cached||fetch(new Request(event.request,{cache:"no-store"})).then(response=>{const clone=response.clone();caches.open(CACHE).then(cache=>cache.put("./index.html",clone));return response})).catch(()=>caches.match("./")));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{const clone=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,clone));return response}).catch(()=>caches.match("./index.html"))));
});
