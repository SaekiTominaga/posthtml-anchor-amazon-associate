# posthtml-anchor-amazon-associate

[![npm version](https://badge.fury.io/js/posthtml-anchor-amazon-associate.svg)](https://badge.fury.io/js/posthtml-anchor-amazon-associate)
[![Build Status](https://app.travis-ci.com/SaekiTominaga/posthtml-anchor-amazon-associate.svg?branch=main)](https://app.travis-ci.com/SaekiTominaga/posthtml-anchor-amazon-associate)
[![Coverage Status](https://coveralls.io/repos/github/SaekiTominaga/posthtml-anchor-amazon-associate/badge.svg)](https://coveralls.io/github/SaekiTominaga/posthtml-anchor-amazon-associate)

<img src="https://posthtml.github.io/posthtml/logo.svg" alt="PostHTML logo" height="100">

Transform Amazon link URLs to associate link using PostHTML

## Transform sample

### Examples of transform

`{ class: 'amazon-associate', associate_id: 'xxx-20' }`

Before:
``` html
<a href="https://www.amazon.com/dp/B01GRDKGZW/" class="amazon-associate">Link</a>
<a href="https://www.amazon.com/dp/B01GRDKGZW/" class="foo amazon-associate bar">Link</a>
```

After:
``` html
<a href="https://www.amazon.com/dp/B01GRDKGZW/ref=nosim?tag=xxx-20">Link</a>
<a href="https://www.amazon.com/dp/B01GRDKGZW/ref=nosim?tag=xxx-20" class="foo bar">Link</a>
```

### Examples of no transform

``` html
<a class="amazon-associate">Link</a><!-- No `href` attribute -->
<a href="/" class="amazon-associate">Link</a><!-- The `href` attribute value must be an absolute URL for this feature to work -->
<a href="https://example.com/" class="amazon-associate">Link</a><!-- URL is not an Amazon page -->
<a href="https://www.amazon.com/dp/B01GRDKGZW" class="amazon-associate">Link</a><!-- A slash is required at the end of the URL -->
<a href="https://www.amazon.com/dp/B01GRDKGZW/?tag=xxx-20" class="amazon-associate">Link</a><!-- Already tagged -->
```

## Install

```bash
npm i -D posthtml-anchor-amazon-associate
```

## Usage

``` js
import posthtml from 'posthtml';
import posthtmlAnchorAmazonAssociate from 'posthtml-anchor-amazon-associate';

const beforeHtml = '<!DOCTYPE html>...';

const result = posthtml([
	posthtmlAnchorAmazonAssociate({
		class: 'amazon-associate',
		associate_id: 'xxx-20',
	})
]).process(beforeHtml);

const afterHtml = result.html;
```

## Options

<dl>
<dt><code>class</code> [Required]</dt>
<dd>Class name of the <code>&lt;a&gt;</code> element to process.</dd>
<dt><code>associate_id</code> [Required]</dt>
<dd>Your associate ID</dd>
</dl>
