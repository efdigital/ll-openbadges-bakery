# openbadges-bakery
An OpenBadges image baking library that works with PNGs and SVGs. This forked version has been updated for use with current versions of Node (5.1.1) and other packages. Dependency on streampng was removed as it wasn't working in the new environment.

# Install
```bash
$ npm install openbadges-bakery
```
# CLI Usage

This has been removed due to vulnerabilities in the dependencies.

# Libary Usage

## bakery.bake(options callback);

Bakes some data into an image.

Options are
- `image`: either a buffer or a stream representing the PNG or SVG to bake
- `assertion`: assertion to save into the image (optional)
- `signature`: JSON Web Signature representing a signed OpenBadges assertion (optional)

You must pass either `assertion` or `signature`

`callback` has the signature `function(err, imageData)`

## bakery.extract(image, callback)

Gets the raw data from the badge. This could be a URL, assertion in JSON format or a signature.

`callback` has the signature `function (err, data)`

## bakery.debake(image, callback);
## bakery.getAssertion(image, callback);

Gets the assertion from the badge. If the assertion is remote, this will require an HTTP request. If the assertion is baked into the badge, either directly or as part of a signature, this will pull the local copy.

`image` should be a stream or a buffer

`callback` has the signature `function (err, object)` where `object` is expected to be a OpenBadges assertion.
