---
layout: post
title:  "Configuration of Jekyll"
date:   2016-05-14 17:22:34 +0800
---


#Install Jekyll
{% highlight ruby %}
  $ gem install jekyll
  $ jekyll new myblog
  $ cd myblog
  ~/myblog $ jekyll serve
{% endhighlight %}

  [attention]
  rubygem.org is not available in mainland China.
  Use its mirror site: ruby.taobao.org

  [Deploy method]
{% highlight Terminal %}
  $ gem sources --remove https://rubygems.org/
  $ gem sources -a https://ruby.taobao.org/
  $ gem sources -l #显示最新的地址
{% endhighlight Terminal %}

#Create a new repository in GitHub

#Push the Jekyll project to GitHub
