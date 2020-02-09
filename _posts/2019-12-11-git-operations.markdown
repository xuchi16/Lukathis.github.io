---
layout: post
title:  "Git Operations"
author: Xu Chi
toc: true
tags: [tech, git]
date:   2019-12-11 20:00:00 +0800
---

Cover some frequently used commands and complex scenario.

# Git clear .gitignore cache

      git rm -r --cached <filename or .>

# Split 1 commit into 2

Sometimes, we mistakely commit multiple files in one single commit while it actually did 2 things.
In this case, if we only hope to cherry-pick part of them to another branch, we have to split this commit into 2.
To realize this, we can use rebase command with the interactive mode.

The overall logic is just reoccur the whole change journey and you can arrange the stages as you want.

Here're steps which can also be found here:
Break a previous commit into multiple commits <https://stackoverflow.com/questions/6217156/break-a-previous-commit-into-multiple-commits>

* Start an interactive rebase with below command where <commit> is the commit you want to split. In fact, any commit range will do, as long as it contains that commit

      git rebase -i <commit>^

* Mark the commit you want to split with the action "edit", yes, just change it in vim mode from "pick" to "edit"

* Input "x" to trigger the rebase

* When it comes to editing that commit, run this command. The effect is that the HEAD is rewound by one, and the index follows suit. However, the working tree stays the same

      git reset HEAD^

* Now add the changes to the index that you want to have in the first commit. You can use git add (possibly interactively) or git gui (or both) to do that

* Commit the now-current index with whatever commit message is appropriate now

* Repeat the last two steps until your working tree is clean

* Continue the rebase with command

      git rebase --continue
