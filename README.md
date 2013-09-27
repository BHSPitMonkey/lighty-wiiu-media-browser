# Lighty WiiU Media Browser

A simple JavaScript web application to help with browsing a Lighty media server on a Wii U gamepad.


## Overview

This is a simple, static (HTML+CSS+JS) web application that can be dropped into
a web server running Lighttpd and which is navigated using Lighty's builtin
directory listing pages.  The web app makes HTTP GET requests to the server it's
living on, parses the response, and renders the file listings in a way that's
easy and fun to use with the Wii U gamepad.


## Installation

Install the files in this repo to somewhere in your Lighty docroot.
For example, I have it living at `/var/www/wiiu` on my media server.


## License

Until this code is more finished and I've made up my mind, all rights reserved.
Just shoot me an email if you're interested in using or contributing to the code.
