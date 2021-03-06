---
layout: post
title:  "Attack Lab"
author: Xu Chi
toc: true
tags: [Tech, 深入理解计算机系统]
---

CSAPP Lab 3. Attack lab

### 系统环境

在之前data lab的实验中，需要32位的操作系统，而在bomb lab中，需要64位操作系统才可以正常进行。我们这次使用的是ubuntu1604x64。如何查看你的Linux系统是32位还是64位，可以用`getconf LONG_BIT`检查。

---

### 下载实验包并关联repo

需要更新下系统中的相关工具。

```
apt-get update
apt-get install git
apt-get install gdb
```
---

### 一些有用的命令

* 生成symbol table: `objdump -t bomb`

* 生成bomb disasemble code: `objdump -d bomb`

```
OBJDUMP(1)                                                                                                
GNU Development Tools                                                                                               

NAME
       objdump - display information from object files.

SYNOPSIS
       objdump [-a|--archive-headers]
               [-d|--disassemble]
               [-t|--syms]
               objfile...
```

### gdb

```
break 
run
info registers
print $rsp
stepi // 向前执行一步
nexti // jump over the function calls
step  // 到下一个端点
backtrace(bt) // backtrace
```
---

### Assembly commands

| command | description |
|:--|:--|
| test | `testl %eax, %eax` 检查`%eax`是正数，负数还是0 |
| je | jump if equals to zero |
| sub | |
| push | 压栈 |
| lea | load effective address，即利用通用的操作数表示格式读取数值后放入寄存器的操作 |

---

### 操作数表示格式

P113

---

### Registers

There're 16 registers and one stack pointer

```
rax(eax)       return
rbx            
rcx            
rdx            
rsi(esi)       
rdi            
rbp            
rsp            stack pointer，栈顶指针
r8             
r9             
r10            
r11            
r12            
r13            
r14            
r15            
rip            程序指令寄存器，指向下一条执行指令
```

* rsp为栈顶指针，栈底画在图的顶部，地址最大；栈顶画在图的底部，地址逐渐减小。因此当rsp减小时，意味着元素进栈，rsp增大时则相反，意味着出栈。

将一个双字压入栈中，栈顶指针减4。（原因？）

???如`sub    $0x8,%rsp`表示在%rsp减小一个立即数（immediate）8。如果是32位系统，压入一个元素地址减4（4*8=32），而64位操作系统，压入数据为64（8\*8=64）位，因此栈顶地址减4。

# 解题

## Phase 1

```
Welcome to my fiendish little bomb. You have 6 phases with
which to blow yourself up. Have a nice day!
test

Breakpoint 2, 0x0000000000400ee0 in phase_1 ()
(gdb) disas
Dump of assembler code for function phase_1:
=> 0x0000000000400ee0 <+0>:     sub    $0x8,%rsp
   0x0000000000400ee4 <+4>:     mov    $0x402400,%esi
   0x0000000000400ee9 <+9>:     callq  0x401338 <strings_not_equal>
   0x0000000000400eee <+14>:    test   %eax,%eax
   0x0000000000400ef0 <+16>:    je     0x400ef7 <phase_1+23>
   0x0000000000400ef2 <+18>:    callq  0x40143a <explode_bomb>
   0x0000000000400ef7 <+23>:    add    $0x8,%rsp
   0x0000000000400efb <+27>:    retq   
End of assembler dump.
(gdb) info registers
rax            0x603780 6305664
rbx            0x0      0
rcx            0x4      4
rdx            0x1      1
rsi            0x603780 6305664
rdi            0x603780 6305664
rbp            0x402210 0x402210 <__libc_csu_init>
rsp            0x7fffffffe558   0x7fffffffe558
r8             0x604425 6308901
r9             0x7ffff7fef700   140737354069760
r10            0x519    1305
r11            0x7ffff7a3b0f0   140737348088048
r12            0x400c90 4197520
r13            0x7fffffffe640   140737488348736
r14            0x0      0
r15            0x0      0
rip            0x400ee0 0x400ee0 <phase_1>
eflags         0x202    [ IF ]
cs             0x33     51
ss             0x2b     43
ds             0x0      0
es             0x0      0
fs             0x0      0
gs             0x0      0
k0             0x0      0
k1             0x0      0
k2             0x0      0
k3             0x0      0
k4             0x0      0
k5             0x0      0
k6             0x0      0
k7             0x0      0
```


callq <explode_bomb> at <+18>, before that, <+16> will jump to <+23> which will bypass the explosion.

To fulfill the condition, the test result at <+14> must equals to 0.

In <+9> it compares whether the strings are equal. The strings are stored in the first two registers for function parameters which are `%rdi(%edi)` and `%rsi(%esi)`. 

The string of `%rdi(%edi)` is from our input and `%rsi(%esi)` is from `$0x402400`.

And we need to get the string at address `$0x402400` (Why is not the value `$0x402400` itself?) and with command `x /s 0x402400` and we can know the string in `%rsi(%esi)` is "Border relations with Canada have never been better."

Problem solved.

为了简便，不需要重复输入每个阶段的结果，我们可以创建一个solution文件，把每个阶段的结果写进去。在`gdb bomb`后，每次执行运行程序命令`run`之前，可以输入命令行参数，即`run solution`，可以避免重复输入。

## Phase 2


```
Dump of assembler code for function read_six_numbers:
=> 0x000000000040145c <+0>:     sub    $0x18,%rsp
   0x0000000000401460 <+4>:     mov    %rsi,%rdx
   0x0000000000401463 <+7>:     lea    0x4(%rsi),%rcx
   0x0000000000401467 <+11>:    lea    0x14(%rsi),%rax
   0x000000000040146b <+15>:    mov    %rax,0x8(%rsp)
   0x0000000000401470 <+20>:    lea    0x10(%rsi),%rax
   0x0000000000401474 <+24>:    mov    %rax,(%rsp)
   0x0000000000401478 <+28>:    lea    0xc(%rsi),%r9
   0x000000000040147c <+32>:    lea    0x8(%rsi),%r8
   0x0000000000401480 <+36>:    mov    $0x4025c3,%esi
   0x0000000000401485 <+41>:    mov    $0x0,%eax
   0x000000000040148a <+46>:    callq  0x400bf0 <__isoc99_sscanf@plt>
   0x000000000040148f <+51>:    cmp    $0x5,%eax
   0x0000000000401492 <+54>:    jg     0x401499 <read_six_numbers+61>
   0x0000000000401494 <+56>:    callq  0x40143a <explode_bomb>
   0x0000000000401499 <+61>:    add    $0x18,%rsp
   0x000000000040149d <+65>:    retq   
```

这一段是read_six_numbers的汇编

`<+0>:     sub    $0x18,%rsp` 将栈顶指针向下移动了24，新增了


## Phase 3

```
=> 0x0000000000400f43 <+0>:     sub    $0x18,%rsp
   0x0000000000400f47 <+4>:     lea    0xc(%rsp),%rcx
   0x0000000000400f4c <+9>:     lea    0x8(%rsp),%rdx
   0x0000000000400f51 <+14>:    mov    $0x4025cf,%esi
   0x0000000000400f56 <+19>:    mov    $0x0,%eax
   0x0000000000400f5b <+24>:    callq  0x400bf0 <__isoc99_sscanf@plt>
   0x0000000000400f60 <+29>:    cmp    $0x1,%eax
   0x0000000000400f63 <+32>:    jg     0x400f6a <phase_3+39>
   0x0000000000400f65 <+34>:    callq  0x40143a <explode_bomb>
   0x0000000000400f6a <+39>:    cmpl   $0x7,0x8(%rsp)
   0x0000000000400f6f <+44>:    ja     0x400fad <phase_3+106>
   0x0000000000400f71 <+46>:    mov    0x8(%rsp),%eax
   0x0000000000400f75 <+50>:    jmpq   *0x402470(,%rax,8)
   0x0000000000400f7c <+57>:    mov    $0xcf,%eax
   0x0000000000400f81 <+62>:    jmp    0x400fbe <phase_3+123>
   0x0000000000400f83 <+64>:    mov    $0x2c3,%eax
   0x0000000000400f88 <+69>:    jmp    0x400fbe <phase_3+123>
   0x0000000000400f8a <+71>:    mov    $0x100,%eax
   0x0000000000400f8f <+76>:    jmp    0x400fbe <phase_3+123>
   0x0000000000400f91 <+78>:    mov    $0x185,%eax
   0x0000000000400f96 <+83>:    jmp    0x400fbe <phase_3+123>
   0x0000000000400f98 <+85>:    mov    $0xce,%eax
   0x0000000000400f9d <+90>:    jmp    0x400fbe <phase_3+123>
   0x0000000000400f9f <+92>:    mov    $0x2aa,%eax
   0x0000000000400fa4 <+97>:    jmp    0x400fbe <phase_3+123>
   0x0000000000400fa6 <+99>:    mov    $0x147,%eax
   0x0000000000400fab <+104>:   jmp    0x400fbe <phase_3+123>
   0x0000000000400fad <+106>:   callq  0x40143a <explode_bomb>
   0x0000000000400fb2 <+111>:   mov    $0x0,%eax
   0x0000000000400fb7 <+116>:   jmp    0x400fbe <phase_3+123>
   0x0000000000400fb9 <+118>:   mov    $0x137,%eax
   0x0000000000400fbe <+123>:   cmp    0xc(%rsp),%eax
   0x0000000000400fc2 <+127>:   je     0x400fc9 <phase_3+134>
   0x0000000000400fc4 <+129>:   callq  0x40143a <explode_bomb>
   0x0000000000400fc9 <+134>:   add    $0x18,%rsp
   0x0000000000400fcd <+138>:   retq
```

```
(gdb) x 0x4025cf
0x4025cf:       "%d %d"
```

```
(gdb) x/16gx 0x402470
0x402470:       0x0000000000400f7c      0x0000000000400fb9
0x402480:       0x0000000000400f83      0x0000000000400f8a
0x402490:       0x0000000000400f91      0x0000000000400f98
0x4024a0:       0x0000000000400f9f      0x0000000000400fa6
0x4024b0 <array.3449>:  0x737265697564616d      0x6c796276746f666e
0x4024c0:       0x7420756f79206f53      0x756f79206b6e6968
0x4024d0:       0x6f7473206e616320      0x6f62206568742070
0x4024e0:       0x206874697720626d      0x202c632d6c727463
```

according to:
```
   0x0000000000400f75 <+50>:    jmpq   *0x402470(,%rax,8)
```

here're the pairs:

| %rax | address | jump to address | value(Hex) | value(Dec) |
|:--:|:--:|:--:|:--:|:--:|
| 0 | 0x402470 | 0x0000000000400f7c | $0xcf  | 207 |
| 1 | 0x402478 | 0x0000000000400fb9 | $0x137 | 311 |
| 2 | 0x402480 | 0x0000000000400f83 | $0x2c3 | 707 |
| 3 | 0x402488 | 0x0000000000400f8a | $0x100 | 256 |
| 4 | 0x402490 | 0x0000000000400f91 | $0x185 | 389 |
| 5 | 0x402498 | 0x0000000000400f98 | $0xce  | 206 |
| 6 | 0x4024a0 | 0x0000000000400f9f | $0x2aa | 682 |
| 7 | 0x4024a8 | 0x0000000000400fa6 | $0x147 | 327 |

本题的重点是：跳转表

## Phase 4

```
Dump of assembler code for function phase_4:
=> 0x000000000040100c <+0>:     sub    $0x18,%rsp
   0x0000000000401010 <+4>:     lea    0xc(%rsp),%rcx
   0x0000000000401015 <+9>:     lea    0x8(%rsp),%rdx
   0x000000000040101a <+14>:    mov    $0x4025cf,%esi
   0x000000000040101f <+19>:    mov    $0x0,%eax
   0x0000000000401024 <+24>:    callq  0x400bf0 <__isoc99_sscanf@plt>
   0x0000000000401029 <+29>:    cmp    $0x2,%eax
   0x000000000040102c <+32>:    jne    0x401035 <phase_4+41>
   0x000000000040102e <+34>:    cmpl   $0xe,0x8(%rsp)
   0x0000000000401033 <+39>:    jbe    0x40103a <phase_4+46>
   0x0000000000401035 <+41>:    callq  0x40143a <explode_bomb>
   0x000000000040103a <+46>:    mov    $0xe,%edx
   0x000000000040103f <+51>:    mov    $0x0,%esi
   0x0000000000401044 <+56>:    mov    0x8(%rsp),%edi
   0x0000000000401048 <+60>:    callq  0x400fce <func4>
   0x000000000040104d <+65>:    test   %eax,%eax
   0x000000000040104f <+67>:    jne    0x401058 <phase_4+76>
   0x0000000000401051 <+69>:    cmpl   $0x0,0xc(%rsp)
   0x0000000000401056 <+74>:    je     0x40105d <phase_4+81>
   0x0000000000401058 <+76>:    callq  0x40143a <explode_bomb>
   0x000000000040105d <+81>:    add    $0x18,%rsp
   0x0000000000401061 <+85>:    retq   
```

<+0> ~ <+32> 表示读入一个`"%d %d"`类型的字符串，读入的数量放在`%eax`中，必须为2个数字。
其中第一个数字放在`0x8(%rsp),%rdx`中，第二个在`0xc(%rsp),%rcx`中，要求第一个数字即`%rdx`小于等于`$0xe`即14。

假设两个输入分别为：
  * `0x8(%rsp),%rdx`: x
  * `0xc(%rsp),%rcx`: y

其后准备调用func4函数，准备参数：
```
   0x000000000040103a <+46>:    mov    $0xe,%edx
   0x000000000040103f <+51>:    mov    $0x0,%esi
   0x0000000000401044 <+56>:    mov    0x8(%rsp),%edi
   0x0000000000401048 <+60>:    callq  0x400fce <func4>
```

| param1 | param2 | param3 | param4 |
|:------:|:------:|:------:|:------:|
| %rdi | %rsi | %rdx | %rcx |
|   x  | $0x0 | $0xe |  y   |


`test`的一个非常普遍的用法是用来测试一方寄存器是否为空。如果ecx为零，设置ZF零标志为1，跳转。
```
test %ecx, %ecx
```

下面三条指令意味着调用func4函数，测试返回值。
  * 如果返回值为0，则ZF为1，jne的跳转条件是~ZF，不跳转
  * 如果返回值不为0，则ZF为0，jne的跳转条件是~ZF，跳转
跳转至<+76>则会引爆炸弹，因此需要满足的条件是func4返回值为0。

```
    0x0000000000401048 <+60>:    callq  0x400fce <func4>
    0x000000000040104d <+65>:    test   %eax,%eax
    0x000000000040104f <+67>:    jne    0x401058 <phase_4+76>
    ...
    0x0000000000401058 <+76>:    callq  0x40143a <explode_bomb>
```

分析func4的指令。
```
0000000000400fce <func4>:
  400fce:       48 83 ec 08             sub    $0x8,%rsp
  400fd2:       89 d0                   mov    %edx,%eax
  400fd4:       29 f0                   sub    %esi,%eax
  400fd6:       89 c1                   mov    %eax,%ecx
  400fd8:       c1 e9 1f                shr    $0x1f,%ecx
  400fdb:       01 c8                   add    %ecx,%eax
  400fdd:       d1 f8                   sar    %eax
  400fdf:       8d 0c 30                lea    (%rax,%rsi,1),%ecx
  400fe2:       39 f9                   cmp    %edi,%ecx
  400fe4:       7e 0c                   jle    400ff2 <func4+0x24>
  400fe6:       8d 51 ff                lea    -0x1(%rcx),%edx
  400fe9:       e8 e0 ff ff ff          callq  400fce <func4>
  400fee:       01 c0                   add    %eax,%eax
  400ff0:       eb 15                   jmp    401007 <func4+0x39>
  400ff2:       b8 00 00 00 00          mov    $0x0,%eax
  400ff7:       39 f9                   cmp    %edi,%ecx
  400ff9:       7d 0c                   jge    401007 <func4+0x39>
  400ffb:       8d 71 01                lea    0x1(%rcx),%esi
  400ffe:       e8 cb ff ff ff          callq  400fce <func4>
  401003:       8d 44 00 01             lea    0x1(%rax,%rax,1),%eax
  401007:       48 83 c4 08             add    $0x8,%rsp
  40100b:       c3                      retq
```

伪代码如下：

```
func4(x, 0, 14) 

func4(a, b, c) {
   if (c < b) {
      res = c - b + 1;
   } else {
      res = c - b;
   }
   res >>A 1
   d = res + b;

   if (a == d) return 0
   if (a < d) {
      b = d + 1; 
      func4(a, b, c, d)
   }
   if (a > d) {
      c = d - 1; 
      func4(a, b, c, d) 
      return res * 2;
   }
}
```

进一步简化，类似于如下C代码：
```
int func4(int a, int b, int c) {
	int res = (c - b) / 2;
	int val = res + b;
	if (val == a) return 0;
	if (val < a) {
		return 2 * func4(a, val + 1, c) + 1;
	} else {
		return 2 * func4(a, b, val - 1);
	}
}
```

根据初始的输入`func4(x, 0, 14, y)`可得出`d=7`，则只要输入的第一位为7即可。
进一步可以发现，不能让func4执行`val<a`的分支即必须一直保证`(b+c)/2 >= a`。
又0<=a<=14，所以满足条件的a有a=0，1，3，7共4个答案。


顺利跳转至最后，要求`0xc(%rsp)`也就是输入的第二位等于0即可。
```
   0x0000000000401051 <+69>:    cmpl   $0x0,0xc(%rsp)
   0x0000000000401056 <+74>:    je     0x40105d <phase_4+81>
   0x0000000000401058 <+76>:    callq  0x40143a <explode_bomb>
```

故输入为：7 0

本题重点在于函数的调用及参数传递以及左移操作。

## Phase 5

```
=> 0x0000000000401062 <+0>:     push   %rbx
   0x0000000000401063 <+1>:     sub    $0x20,%rsp
   0x0000000000401067 <+5>:     mov    %rdi,%rbx
   0x000000000040106a <+8>:     mov    %fs:0x28,%rax
   0x0000000000401073 <+17>:    mov    %rax,0x18(%rsp)
   0x0000000000401078 <+22>:    xor    %eax,%eax
   0x000000000040107a <+24>:    callq  0x40131b <string_length>
   0x000000000040107f <+29>:    cmp    $0x6,%eax
   0x0000000000401082 <+32>:    je     0x4010d2 <phase_5+112>
   0x0000000000401084 <+34>:    callq  0x40143a <explode_bomb>
   0x0000000000401089 <+39>:    jmp    0x4010d2 <phase_5+112>
   0x000000000040108b <+41>:    movzbl (%rbx,%rax,1),%ecx
   0x000000000040108f <+45>:    mov    %cl,(%rsp)
   0x0000000000401092 <+48>:    mov    (%rsp),%rdx
   0x0000000000401096 <+52>:    and    $0xf,%edx
   0x0000000000401099 <+55>:    movzbl 0x4024b0(%rdx),%edx
   0x00000000004010a0 <+62>:    mov    %dl,0x10(%rsp,%rax,1)
   0x00000000004010a4 <+66>:    add    $0x1,%rax
   0x00000000004010a8 <+70>:    cmp    $0x6,%rax
   0x00000000004010ac <+74>:    jne    0x40108b <phase_5+41>
   0x00000000004010ae <+76>:    movb   $0x0,0x16(%rsp)
   0x00000000004010b3 <+81>:    mov    $0x40245e,%esi
   0x00000000004010b8 <+86>:    lea    0x10(%rsp),%rdi
   0x00000000004010bd <+91>:    callq  0x401338 <strings_not_equal>
   0x00000000004010c2 <+96>:    test   %eax,%eax
   0x00000000004010c4 <+98>:    je     0x4010d9 <phase_5+119>
   0x00000000004010c6 <+100>:   callq  0x40143a <explode_bomb>
   0x00000000004010cb <+105>:   nopl   0x0(%rax,%rax,1)
   0x00000000004010d0 <+110>:   jmp    0x4010d9 <phase_5+119>
   0x00000000004010d2 <+112>:   mov    $0x0,%eax
   0x00000000004010d7 <+117>:   jmp    0x40108b <phase_5+41>
   0x00000000004010d9 <+119>:   mov    0x18(%rsp),%rax
   0x00000000004010de <+124>:   xor    %fs:0x28,%rax
   0x00000000004010e7 <+133>:   je     0x4010ee <phase_5+140>
   0x00000000004010e9 <+135>:   callq  0x400b30 <__stack_chk_fail@plt>
   0x00000000004010ee <+140>:   add    $0x20,%rsp
   0x00000000004010f2 <+144>:   pop    %rbx
   0x00000000004010f3 <+145>:   retq
```


# Questions

* What's the difference between `%rdi` and `%edi`
