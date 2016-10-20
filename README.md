iFrame Security Policy
======================

Introduction
------------
Each iframe loaded on a non-whitelisted site will be sandboxed according to the options.

Options
-------
By default, all sandbox options are checked except "allow-top-navigation."
-   allow-forms:  Enables form submission within iframe
-   allow-pointer-lock:  Allows locking of mouse pointer within iframe
-   allow-popups:  Allows new windows to be opened by iframe
-   allow-same-origin:  Allows the iframe document to maintain its origin
-   allow-scripts:  Allows javascript execution within iframe
-   allow-top-navigation:  Allows frame-busting by iframe

Each checkbox that is unchecked will be removed from the sandbox attribute.  In other words, iframes will always have sandbox attributes with __AT MOST__ the options you have checked.  For example, if only "allow-forms" and "allow-popups" are checked, then:
-   If a site has an unsandboxed iframe, then the resulting iframe with have a sandbox attribute of "allow-forms allow-popups"
-   If a site has an sandboxed iframe with value "allow-forms allow-scripts", then the resulting iframe with have a sandbox attribute of "allow-forms"

This behavior ensures that iframes maintain __AT LEAST__ the original security limitations page developers intend, while allowing users of this extension to enforce a more stringent policy on untrusted pages.

Whitelisting
------------
Any iframes loaded by whitelisted sites will be exempt from sandboxing by this extension.  By default, the whitelist is empty.

Troubleshooting
---------------
It is possible for this extension to enforce a more stringent security policy than a site requires.  If you trust a site to use iframes properly, whitelist it.

Privacy
-------
This extension does not send any information to the author.  It may send data to the browser vendor (check their policy).

License (MIT)
-------------
Copyright (c) 2016 Jeff Hawley

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.