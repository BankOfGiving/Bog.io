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
Much of the client interface is broken into two portions:  View Templates and Modules

Modules are a single unit of functionality that can be used multiple times on a single view.

The module concept consists of a few basic parts:
  - Module Base Class
  - Manifest
  - Api
The modules derive from a "module base"

##I18N
Each module in each view generates a unique key that identifies it on the server.  This key is used to retrieve the specific text in the desired language for that module.  If client-side caching is enabled, the text will be stored in browser local storage for 24 hours.

The text is currently stored in JSON files on the server
