# jcg-command-queue (Alpha version)
An **angular** library that implements a way to update the UI inmediatelly while the commands are put in a queue to be processed at the server pace.

# Features
- A local copy of the ViewModel is updated inmediatelly, so the user does not have to wait for the server to respond.
- A roll-back mechanism restores the local ViewModel in the event of an Optimistic concurrency mismatch.
