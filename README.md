M SVG sprite loader
======================

A simple SVG sprites loader inspired by [svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader)


## Why M SVG sprite loader

The original SVG sprite loader has an 13KB (uglified) runtime, which is a little heavy for mobile.
And there are some bugs ([#179](https://github.com/kisenka/svg-sprite-loader/issues/179), [#183](https://github.com/kisenka/svg-sprite-loader/issues/183)) working with raster image on IE9.

So I create this loader, which is basically compatible with the original SVG sprite loader, aimed to having a very lightweight runtime.

## How to use

Add m-svg-sprite-loader to webpack.config.js

```javascript
{
  test: /\.svg$/,
  loader: 'm-svg-sprite-loader',
  options: {
    symbolId: 'icon-[name]',
  },
},
```

Import SVGs

```javascript
import './a.svg'
import './b.svg'
```

This will auto insert a hidden `<svg>` to `<body>`:

```html
<svg [hidden]>
  <symbol id="icon-a"></symbol>
  <symbol id="icon-b"></symbol>
</svg>
```

Then you can use `<use>` to use Icon:

```html
<svg xmlns="http://www.w3.org/2000/svg">
  <use xlink:href="#icon-a"></use>
</svg>
```
