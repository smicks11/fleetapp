'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "7a3d5c5fa79749da960baaa5f94fb753",
"version.json": "4b781d5e3a9f5a60a5d09441d26185bf",
"index.html": "4b94495ed294aa80878019bb8d983ea0",
"/": "4b94495ed294aa80878019bb8d983ea0",
"main.dart.js": "728d979ecc40dd369586205ac09340df",
"flutter.js": "4b2350e14c6650ba82871f60906437ea",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "ae9f51c51a401de7533def307d69dcd9",
"assets/AssetManifest.json": "aea2538753cbe31ce36faaa5a9983ae8",
"assets/NOTICES": "049a937904e7de35ea6b5a4f468d640e",
"assets/FontManifest.json": "aa6fcf495b0d93e5aa3c4cef0acaf4d4",
"assets/AssetManifest.bin.json": "42fbf14f116a283d04ecb40dd3de8aff",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "9102e2f1c1849442c0883d4579a34b0a",
"assets/fonts/MaterialIcons-Regular.otf": "3acdf23afcbe96feaffcf7f3d81c6a7e",
"assets/assets/svg/search.svg": "ab29dbf9b3cc40e1d2e0eae3c9557b14",
"assets/assets/svg/User.svg": "a22c371ced2564437f12d6bf64642e53",
"assets/assets/svg/overview.svg": "9a1327149f72f2eb3b9dea0a067c695c",
"assets/assets/svg/settings.svg": "4a0ee3aecdcdb9d2960ea4df50ab29eb",
"assets/assets/svg/Bell.svg": "123cb467e82793438b29c5570ab68be4",
"assets/assets/svg/reload.svg": "4d3bf6a206893fe98123b394daae7194",
"assets/assets/svg/no_search.svg": "d0b9e1af0f1df03b932883efcdb335a2",
"assets/assets/svg/edit.svg": "88087d904e20910aebccbd9badf6fcea",
"assets/assets/svg/integration.svg": "4f1011bc738b5ef6f545c701e7d8b8ec",
"assets/assets/svg/car.svg": "42ebaad23844ff643ae36af22f1491c6",
"assets/assets/svg/filter.svg": "b575cdd9741f4347622aa478102503ee",
"assets/assets/svg/menu.svg": "4f744b78aa5a48fc30975d9007188d52",
"assets/assets/png/login_bg.png": "854a983bdb7730cb6ba2c5ff66dd23cb",
"assets/assets/png/user.png": "6162536bd15ffd0d8dc072f2bbe01428",
"assets/assets/png/logo.png": "d63f695ba95ae91d1edbe32c48195d84",
"assets/assets/png/car.png": "8e71f60ee0cf0a9ee23f3178ee0c556f",
"assets/assets/fonts/Geist-Regular.ttf": "41b7da1f55a8011278ad4b5e5dd0cc11",
"assets/assets/fonts/Geist-Black.ttf": "35c301fcbe347760920a1ab9e9df03a4",
"assets/assets/fonts/Geist-ExtraLight.ttf": "d26e81a5fea8cee90ebfa19c61090192",
"assets/assets/fonts/Geist-Bold.ttf": "a226bc6bd1c377fec1e27cc38e0727fe",
"assets/assets/fonts/Geist-ExtraBold.ttf": "0263bdfcb3cf3df9caa3529460457d79",
"assets/assets/fonts/Geist-Thin.ttf": "ed5662e45c6ac0df1fba6a1f3dc19740",
"assets/assets/fonts/Geist-Medium.ttf": "c953421d52409d141c096bbee4ba99a7",
"assets/assets/fonts/Geist-Light.ttf": "af6f645491037b4973ed2c7c665a6716",
"assets/assets/fonts/Geist-SemiBold.ttf": "9f5cccc0e090c297bcfdff052bec4a75",
"canvaskit/skwasm.js": "ac0f73826b925320a1e9b0d3fd7da61c",
"canvaskit/skwasm.js.symbols": "96263e00e3c9bd9cd878ead867c04f3c",
"canvaskit/canvaskit.js.symbols": "efc2cd87d1ff6c586b7d4c7083063a40",
"canvaskit/skwasm.wasm": "828c26a0b1cc8eb1adacbdd0c5e8bcfa",
"canvaskit/chromium/canvaskit.js.symbols": "e115ddcfad5f5b98a90e389433606502",
"canvaskit/chromium/canvaskit.js": "b7ba6d908089f706772b2007c37e6da4",
"canvaskit/chromium/canvaskit.wasm": "ea5ab288728f7200f398f60089048b48",
"canvaskit/canvaskit.js": "26eef3024dbc64886b7f48e1b6fb05cf",
"canvaskit/canvaskit.wasm": "e7602c687313cfac5f495c5eac2fb324",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
