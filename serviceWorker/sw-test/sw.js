this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/serviceWorker/sw-test/',
        '/serviceWorker/sw-test/index.html',
        '/serviceWorker/sw-test/style.css',
        '/serviceWorker/sw-test/app.js',
        '/serviceWorker/sw-test/image-list.js',
        '/serviceWorker/sw-test/star-wars-logo.jpg',
        '/serviceWorker/sw-test/gallery/bountyHunters.jpg',
        '/serviceWorker/sw-test/gallery/myLittleVader.jpg',
        '/serviceWorker/sw-test/gallery/snowTroopers.jpg'
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  var response;
  event.respondWith(
    caches.match(event.request)

      .catch(function() {
        console.log("File not found in cache " + event.request);
        return fetch(event.request);
      })

      .then(function(r) {
        response = r;

        caches.open('v1').then(function(cache) {
          console.log("Caching response for request before returning response " + event.request);
          cache.put(event.request, response);
        });

        return response.clone();
      })

      .catch(function() {
        console.log("Returning default object as error occurred while obtained object from cache " + event.request);
        return caches.match('/serviceWorker/sw-test/gallery/myLittleVader.jpg');
      })
  );
});
