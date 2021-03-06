---
layout: post
title:  "Hazelcast vs Redis"
author: Xu Chi
toc: true
tags: [Tech, Java]
---

Hazelcast和Redis有什么不同，我们应该如何选型？

# Caching pattern

There're multiple caching patterns
* cache-aside
* read-through/write-through
* read-through/write-behind

# Clustering

* Redis - single thread, multiple cores
* Hazelcast - multi-thread and distribution native

Concepts: sharding/partitioning, primary/replica

# Querying

common: K/V
Hazelcast:
- support store complex objects and understand the object graph(?)
- support predicate and SQL like where clause when querying
- support flexible namespace e.g. Maps
- support indexes (via config or API)

# Streaming

* Redis - supports pub/sub
* Hazelcast
    - messaging to distribute streaming data(pub/sub)
    - processing API to build continuous application over data streams
    - connectors to integrate with legacy non-streaming systems

# Compute 

Hazelcast supports "Entry Processor" pattern, supports a function to be run against data in a Map