---
layout: post
title:  "IntelliJ on Mac"
author: Xu Chi
toc: true
tags: [Tech, env setup]
---

How-to document to set up IntelliJ quickly on Mac OS.

# Configurations for Github, Gradle and IntelliJ

* Step 1. Create an empty repository in Github
* Step 2. Clone the project to local
* Step 3. Open IntelliJ and select open this project
* Step 4. Select "Import project from external model"
* Step 5. Because this is a new project, so we can select "Create directories for empty content roots automatically" and choose "use gradle wrapper task for configuration" and click "Finish"
* Step 6. After gradle finish loading all the configurations. Open the Gradle tab and select "init" task.
* Step 7. If there's no corresponding src module, just right click the projeck and create a new module named 'src'. Gradle will automatically create main and test folder for us.

The environment is ready.

## Tips:
* If you want to run gradle script, please use the gradlew in your project's root folder, e.g. ./gradlew init or use brew to install gradle


# References

* [Working with Gradle in IntelliJ](https://www.youtube.com/watch?v=JwPYjnhah3g)

This is updated from new iPadOS 