# CommandQueue
An angular library that adds commands to a queue so they can be processed at the server speed while updating a local copy of the view model
immediately.

## Features
- Implements optimistic concurrency.
- Updates a local copy of the View-Model immediately, so the user doesn't have to wait for the server.
- Because it does not have to read the View-Model after each command, it saves internet bandwidth.
- Rolls back the pending commands when an error occurs, notifying the user and reloading the View-Model.

## Install
> npm install @jcachay/command-queue

## Setup and usage
[See the wiki](https://github.com/jcachayG93/jcg-command-queue/wiki)

