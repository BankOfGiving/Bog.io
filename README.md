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
- [Modules](#modules)
- [API](#api)
- [Domain Logic (BLL)](#bll)
- [Data Layer](#overview-dal)
- [Build and Deployment](#overview-ci)
##Apps
The **applications** in this project represent independently functional areas that come together to make up an "enterprise style" system.  Each app is designed to be updated, removed, or replaced without severely impacting the rest of the system.  Each app consists of a set of **views**, and a corresponding **API**.

####Public App
The goal of the public app is to create a functional platform with is populated and configured almost exclusively by manifest files referencing predefined templates and modules.


######Frameworks
---
Styling - Bootstrap
Client-side Frameworks:  Backbone, RequireJS, PostalJS


####Auth App
The core concept for this app was taken from the [Hackathon Starter](https://github.com/sahat/hackathon-starter) project.
####Dashboard App
####Admin App
_Coming soon!_
##API
The API layer is a thin gateway allowing the client to access to hidden domain logic.  It is designed to be application and module specific client app has a corresponding server app.  The server app hosts only the api calls that are allowed to that application and implements basic authorization checks where necessary.


##Modules
Much of the client interface is broken into two portions:  View Templates and Modules.  The template provides a basic layout for the page and the hard containers to be filled with modules and content.

Modules are a single unit of functionality that can be used as many times on as many views as is necessary.  Each module has a **manifest** which provides the **module base class** with the specific configuration for that module instance.

The manifest can be generated dynamically in the view using the referenced template, or stored as a file to be loaded from the server.  By keeping the settings in a JSON formatted manifest file, the intent is to move all configuration to the server and ultimately the database.

A module consists of a few basic parts:
  - Template(s)
  - Execution Script
  - Corresponding API (as needed)

**The execution script** inherits a base set of functionality from a _base class_.  This helps to keep the module script light weight and specific to the module itself.  The functionality is derived from a standard **Backbone View**, and, as such, follows all applicable conventions.


For more details on the module manifest, see the wiki page here.


To learn more about the module manifest see the wiki page: [here](#)

####I18N
Each module instance generates a unique key that identifies it on the server.  This key is used to retrieve the specific text in the desired language for that module.  If client-side caching is enabled, the text will be stored in browser local storage after first download for 24 hours.

To learn more about the module manifest see the wiki page: [here](#)

##API
##Domain Logic
##Data Layer
##Build and Deployment

