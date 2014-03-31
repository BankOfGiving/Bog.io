BOG
===
BOG is a test site assembled to test various concepts and provide a functional model for the demonstration of those concepts.  While this is a functional app it's likely to be a little rough around the edges as new concepts are introduced and rounded out.

The overall goal of this project is to demonstrate the extents to which an application can be modularized and functionality decoupled.

Table of Contents
-----------------
- [Apps](#apps)
    - [Public App](#public-app)
    - [Auth App](#auth-app)
    - [Dashboard](#dash-app)
    - [Admin App](#admin-app)
- [Modules](#overview-modules)
- [API](#overview-api)
- [Domain Logic (BLL)](#overview-bll)
- [Data Layer](#overview-dal)
- [Build and Deployment](#overview-ci)

##Apps
The **applications** in this project represent independently functional areas that come together to make up an "enterprise style" system.  Each app is designed to be updated, removed, or replaced without severely impacting the rest of the system.

####Public App
The Public app consists of several module pages which return publicly available information.  The
Styling - Bootstrap
Client-side Frameworks:  Backbone, Require,
####Auth App
The core concept for this app was taken from the [Hackathon Starter](https://github.com/sahat/hackathon-starter) project.
####Dashboard App
####Admin App
_Coming soon!_
##API
The API layer is application and module specific.  It is designed to be nothing more than a thin gateway allowing access to hidden domain logic.  Each client app has a corresponding server app.  The server app hosts only the api calls that are allowed to that application and implements basic authorization checks where necessary.

##Modules
---
The module concept consists of a few basic parts:
  - Module Base Class
  - Manifest
  - Api
The modules derive from a "module base"

##CLIENT

####Frameworks

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
