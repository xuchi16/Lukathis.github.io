---
layout: post
title:  "Registers"
author: Xu Chi
toc: true
tags: [Tech, 深入理解计算机系统]
---

CSAPP: Register summarize

# Register conventions

### Argument passed in registers

* Parameters: %rdi, %rsi, %rdx, %rcx, %r8, %r9

### Caller saved / Callee saved registers

对于callee-saved寄存器，被调函数如果想使用上述寄存器，它需要负责拷贝并保存上述寄存器的内容。并确保将控制权交还给caller的时候上述寄存器值被恢复。 

对于caller-saved寄存器，调用其他函数时，需要将这些寄存器内容保存下来，当调用结束后，需要恢复这些寄存器的值。

* Callee saved: %rbx, %r12, %r13, %r14, %rbp, %rsp
* Caller saved: %rdi, %rsi, %rdx, %rcx, %r8, %r9, %r10, %r11

### Registers with special functionality

* return value: %rax
* stack pointer: %rsp
* instruction pointer: %rip
