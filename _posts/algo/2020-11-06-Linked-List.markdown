---
layout: post
title:  "Linked List - 链表"
author: Xu Chi
toc: true
math: true
tags: [Tech, Algo]
---

链表的基础知识。

# Introduction

尽管链表在进行索引的时候性能并非十分优越，但在执行插入及删除操作时性能很好。

链表可以分为**单链表**和**双链表**。
单链表中的节点应该具有两个属性：val 和 next。val 是当前节点的值，next 是指向下一个节点的指针/引用。如果要使用双向链表，则还需要一个属性 prev 以指示链表中的上一个节点。


## 双指针技巧


双指针主要有两类技巧：

* [双指针]两个指针从不同位置出发：一个从始端开始，另一个从末端开始，只适用于双向链表
* [快慢指针] 两个指针以不同速度移动：一个指针快一些，另一个指针慢一些，两种链表均适用

快慢指针的主要适用场景
* 判断链表中是否有环

快慢指针的主要优势
* 节约空间，不需要记忆已经走过那些节点

# 典型例题

## 707. 设计链表

单链表的实现，单链表需要使用一个`ListNode`类作为基本节点，其中维护`next`和`val`两个基本元素。

在单链表中，除了维护链表本身以外，可以单独维护一个`size`变量，有助于在查找、插入、删除操作真正进行之前排除一些指针超限的情况。

```java
class MyLinkedList {

    private static class ListNode {
        ListNode next;
        int val;

        ListNode(int val) {
            this.val = val;
        }
    }

    int size;
    // head is a sudo node
    ListNode head;
    
    /** Initialize your data structure here. */
    public MyLinkedList() {
        this.size = 0;
        this.head = new ListNode(0);
    }
    
    /** Get the value of the index-th node in the linked list. If the index is invalid, return -1. */
    public int get(int index) {
        if (index >= size) return -1;
        ListNode curr = head;
        for (int i = 0; i <= index; i++) {
            curr = curr.next;
        }
        return curr.val;
    }
    
    /** Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. */
    public void addAtHead(int val) {
        addAtIndex(0, val);
    }
    
    /** Append a node of value val to the last element of the linked list. */
    public void addAtTail(int val) {
        addAtIndex(size, val);
    }
    
    /** Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. */
    public void addAtIndex(int index, int val) {
        if (index < 0 || index > size) {
            return;
        }

        ListNode newNode = new ListNode(val);
        ListNode curr = head;
        for (int i = 0; i < index; i++) {
            curr = curr.next;
        }

        newNode.next = curr.next;
        curr.next = newNode;
        size++;
    }
    
    /** Delete the index-th node in the linked list, if the index is valid. */
    public void deleteAtIndex(int index) {
        if (index < 0 || index >= size) {
            return;
        }

        ListNode curr = head;
        for (int i = 0; i < index; i++) {
            curr = curr.next;
        }
        curr.next = curr.next.next;
        size--;
    }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * MyLinkedList obj = new MyLinkedList();
 * int param_1 = obj.get(index);
 * obj.addAtHead(val);
 * obj.addAtTail(val);
 * obj.addAtIndex(index,val);
 * obj.deleteAtIndex(index);
 */
```

## 141. 环形链表

> 给定一个链表，判断链表中是否有环。
> 
> 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。
> 
> 如果链表中存在环，则返回 true 。 否则，返回 false 。

适用快慢指针即可，在处理快指针的时候需要注意下对于`next`需要进行下特别判断，不能为`null`。
```java
public class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null) return false;

        ListNode fast = head.next;
        ListNode slow = head;

        while (fast != null && slow != null) {
            if (fast == slow) return true;
            if (fast.next == null) return false;
            fast = fast.next.next;
            slow = slow.next;
        }
        return false;
    }
}

// 稍微整理下逻辑
public class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null) return false;

        ListNode fast = head.next;
        ListNode slow = head;

        while (fast != slow) {
            if (fast == null || fast.next == null) return false;
            fast = fast.next.next;
            slow = slow.next;
        }
        return true;
    }
}
```

## 142. 环形链表II


> 给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
> 
> 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意，pos 仅仅是用于标识环的情况，并不会作为参数传递到函数中。
> 
> 说明：不允许修改给定的链表。

假设一般情况，有环链表如下所示:
```
1 -> 2 -> 3 -> 4 -> 5
          ^         |
          |         |
          <- 7 <- 6 -
```
假设从起点1到入环点3的长度为a，快指针速度为2，慢指针速度为1，两者相遇的点为6，记其从入环点已经走了b步，且环长为c。
我们可以知道相遇的时候快指针套了慢指针一圈(为什么一圈内肯定可以遇到呢:当慢指针入环的时候，要么恰好遇到快指针，要么快指针离入环点不到c步，在慢指针绕完第一圈即走了c步的时候，快指针走了2c步，一定已经追上了慢指针)，列式如下:

$$

slow = a + b

\\

fast = a + b + c

\\

fast = 2 * slow

$$

据此我们可以推断`c=a+b`，且慢指针到入环点的距离为`c-b=a`。
这意味着如果慢指针向前再走`a`步即完成一圈，到达入环点。
如果我们在快慢指针相遇的时候，另建一个指针`sentinel`指向`head`，且与慢指针同步移动。
因为从起点到入环点的长度也是`a`，两者即可在入环点相遇。

需要注意的是，通常我们在判断环形链表的时候，为了方便起见我们会让快指针先走一步，可以避免在起始阶段快慢指针重合的情形。
但是在这一题的情形中，快慢指针相遇的位置，对于我们找到入环点是很重要的，因此我们需要额外维护一个flag，记录是不是第一次出发。

```java
public class Solution {
    public ListNode detectCycle(ListNode head) {
        if (head == null) return null;

        ListNode slow = head;
        ListNode fast = head;
        boolean start = true;

        while (slow != fast || start) {
            start = false;
            if (fast == null || fast.next == null) return null;
            slow = slow.next;
            fast = fast.next.next;
        }

        ListNode sentinel = head;
        while (sentinel != slow) {
            slow = slow.next;
            sentinel = sentinel.next;
        }

        return sentinel;
    }
}
```

## 206. 反转链表

> 反转一个单链表。

反转单链表的思路很简单，就是按照链表的顺序进行遍历，每次将当前节点的`next`指向前一个元素。但是此时当前节点在未翻转前的`next`节点会找不到，因此需要用一个`tmp`临时记录，并将其作为下一次循环所要处理的节点即可。

```java
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode pre = null;
        ListNode curr = head;
        while(curr != null) {
            ListNode tmp = curr.next;
            curr.next = pre;
            pre = curr;
            curr = tmp;
        }
        return pre;
    }
}
```