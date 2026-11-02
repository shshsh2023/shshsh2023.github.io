---
layout: default
title: 归档
permalink: /archives/
---

<section class="card post glow">
  <h1 class="post-title">归档</h1>
  <ul class="archive-list">
    {% for post in site.posts %}
    <li>
      <time>{{ post.date | date: "%Y-%m-%d" }}</time>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    </li>
    {% endfor %}
  </ul>
</section>
