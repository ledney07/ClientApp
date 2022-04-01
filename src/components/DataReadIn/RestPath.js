// Get an ID from an HTTP location.
// e.g. "https://example.com/api/resource/123" --> "123"
function getId(result) {
  var url = result.headers.get("Location");
  var parts = url.split("/");
  return parts.pop();
}

// Get an HTTP response's location header.
// Fix the URL scheme to https if needed.
// This avoids errors where the server returns the wrong URL scheme.
// TODO: Fix on the server.
function getLocation(result) {
  var url = new URL(result.headers.get("Location"));
  var currentProtocol = window.location.protocol;
  if (url.protocol !== currentProtocol) {
    url.protocol = currentProtocol;
  }
  return url.toString();
}

export { getId, getLocation };
