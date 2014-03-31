BOG
===
BOG is a test site assembled to test various concepts and provide a functional model for the demonstration of those concepts.  While this is a functional app it's likely to be a little rough around the edges as new concepts are introduced and rounded out.

The overall goal of this project is to demonstrate the extents to which an application can be modularized and functionality decoupled.

Table of Contents
-----------------
- [Apps](#app-overview)
    - [Public](#app-public)
    - [Auth](#app-auth)
    - [Dashboard](#app-dash)
    - [Admin](#app-admin)
- [Modules](#overview-modules)
- [API](#overview-api)
- [Domain Logic (BLL)](#overview-bll)
- [Data Layer](#overview-dal)
- [Build and Deployment](#overview-ci)

##<a id="app-overview">Apps</a>
---
The "applications" in this project represent independently functional units that come together to make up an "enterprise style" system.  Each app is designed to be updated, removed, or replaced without impacting the rest of the system.

###<a id="app-public">Public</a>
The Public app consists of several module pages which return publicly available information.  The
###<a id="app-auth">Auth</a>
The core concept for this app was taken from the [Hackathon Starter](https://github.com/sahat/hackathon-starter) project.
### Dashboard<a id="app-dash"></a>
### Admin<a id="app-admin"></a>
    *Coming soon!*

API
===

Modules

CLIENT
===
* Frameworks
* Modules
The module concept is an abstracted Backbone view
The modules derive from a "module base"

* Lib

SERVER
====
* Lib
    * Bog

* Data
* Domain
* i18n

DATA
===

Resources
===
The Authorization portion was

BOG
