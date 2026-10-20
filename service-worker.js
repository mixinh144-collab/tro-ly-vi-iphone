const CACHE="tro-ly-vi-iphone-59";
const CACHE_PREFIX="tro-ly-vi-iphone-";
const ACTIVE_CACHE="tro-ly-vi-active";
const ACTIVE_KEY=new URL("./__mimi_active_release__",self.registration.scope).href;
const FILES=["./","./index.html","./manifest.webmanifest","./version.json","./logo.png","./apple-touch-icon-white.png","./push-client.js"];
// Safari rejects redirected cached responses for some navigation requests.
function navigationResponse(response){
  if(!response||!response.redirected)return response;
  return new Response(response.body,{status:response.status,statusText:response.statusText,headers:response.headers});
}
async function setActiveCache(name){const cache=await caches.open(ACTIVE_CACHE);await cache.put(ACTIVE_KEY,new Response(name,{headers:{"Content-Type":"text/plain"}}))}
async function selectedCache(){
  const names=await caches.keys(),control=await caches.open(ACTIVE_CACHE),saved=await control.match(ACTIVE_KEY);
  if(saved){const name=(await saved.text()).trim();if(names.includes(name))return name}
  const older=names.filter(name=>name.startsWith(CACHE_PREFIX)&&name!==CACHE).sort((a,b)=>Number(a.slice(CACHE_PREFIX.length))-Number(b.slice(CACHE_PREFIX.length)));
  const name=older[older.length-1]||CACHE;await setActiveCache(name);return name;
}
async function initializeActiveCache(){
  const control=await caches.open(ACTIVE_CACHE);if(await control.match(ACTIVE_KEY))return;
  const names=(await caches.keys()).filter(name=>name.startsWith(CACHE_PREFIX)&&name!==CACHE).sort((a,b)=>Number(a.slice(CACHE_PREFIX.length))-Number(b.slice(CACHE_PREFIX.length)));
  await control.put(ACTIVE_KEY,new Response(names[names.length-1]||CACHE,{headers:{"Content-Type":"text/plain"}}));
}
self.addEventListener("install",event=>event.waitUntil((async()=>{await caches.open(CACHE).then(cache=>cache.addAll(FILES));await initializeActiveCache()})()));
self.addEventListener("message",event=>{
  if(!["APPLY_UPDATE","SKIP_WAITING"].includes(event.data?.type))return;
  event.waitUntil((async()=>{await setActiveCache(CACHE);await self.skipWaiting();event.ports?.[0]?.postMessage({ok:true})})());
});
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  const requestUrl=new URL(event.request.url);
  if(requestUrl.origin!==self.location.origin)return;
  if(requestUrl.pathname.endsWith("/push-config.json")||requestUrl.pathname.endsWith("/version.json"))return;
  if(event.request.mode==="navigate"){
    event.respondWith((async()=>{
      const name=await selectedCache(),cache=await caches.open(name);
      const cached=await cache.match("./index.html")||await cache.match("./");
      if(cached)return navigationResponse(cached);
      const response=await fetch(new Request(event.request,{cache:"no-store"}));
      if(response.ok)await cache.put("./index.html",response.clone());
      return navigationResponse(response);
    })());
    return;
  }
  event.respondWith((async()=>{
    const cache=await caches.open(await selectedCache()),cached=await cache.match(event.request,{ignoreSearch:true});
    if(cached)return cached;
    try{const response=await fetch(event.request);if(response.ok)await cache.put(event.request,response.clone());return response}
    catch{return cache.match("./index.html")}
  })());
});
self.addEventListener("push",event=>{
  let message={};
  try{message=event.data?.json()||{}}catch{}
  const title=String(message.title??"Thông báo từ Mimi Studio").slice(0,100);
  const body=String(message.body||"").slice(0,1000);
  event.waitUntil(self.registration.showNotification(title,{
    body,icon:"./logo.png",badge:"./apple-touch-icon-white.png",data:{url:"./"},tag:typeof message.tag==="string"&&message.tag.startsWith("mimi-event-")?message.tag.slice(0,120):"mimi-studio-notice"
  }));
});
self.addEventListener("notificationclick",event=>{
  event.notification.close();
  event.waitUntil((async()=>{
    const url=new URL("./",self.registration.scope).href;
    const windows=await clients.matchAll({type:"window",includeUncontrolled:true});
    const existing=windows.find(client=>client.url.startsWith(url));
    if(existing){await existing.focus();return}
    await clients.openWindow(url);
  })());
});

