---
layout: post
title:  "用有限状态自动机解决字符串翻译问题"
author: Xu Chi
toc: true
math: true
tags: [Tech, Algo]
---

有限状态自动机--让复杂的字符串处理告别臃肿代码，拥抱清晰。

# 问题情景

很多时候我们需要进行字符串的转换，其中会涉及到非常多的特殊情况，且根据每个位置字符的不同，我们对后续字符的处理也要有所区别。
比如将一段包含科学记数法表示的字符串转换成整数，或者我们即将讨论的从包含空格、其他字符等复杂的字符串中提取出整数。

这类题涉及非常多的状态，且他们之间的转换关系、边界条件复杂。如果直接用模拟的方式，`if-else`地去解决问题，很容易写出臃肿复杂且错误丛生的代码。
即使花了非常多的精力，分析了各种边界情况后使得代码可以暂时工作，随着需求改变的引入，维护的难度也会让人望而却步。

因此为了将各种不同的状态清晰地拆分表达出来，并且以每个状态为立足点，根据新的输入决定下一个状态，我们很容易画出状态及他们之间变换关系的有向图。
自然地，我们可以用一个结点来表示一个状态，而用边来表示各个状态之间的相互转换关系。
其实我们这样构造的结构就是有限状态自动机(Deterministic Finite Automation)。
编译器中词法分析其实也会采用DFA来对源代码进行处理，它很适合用于解决涉及各种复杂状态及流程的问题。

## 字符串转换整数问题

LeetCode [8. 字符串转换整数 (atoi)](https://leetcode-cn.com/problems/string-to-integer-atoi/)即是这类问题的一个很典型的代表，题目如下。

> 请你来实现一个 myAtoi(string s) 函数，使其能将字符串转换成一个 32 位有符号整数（类似 C/C++ 中的 atoi 函数）。
> 
> 函数 myAtoi(string s) 的算法如下：
> 
> * 读入字符串并丢弃无用的前导空格
> * 检查下一个字符（假设还未到字符末尾）为正还是负号，读取该字符（如果有）。 确定最终结果是负数还是正数。 如果两者都不存在，则假定结果为正。
> * 读入下一个字符，直到到达下一个非数字字符或到达输入的结尾。字符串的其余部分将被忽略。
> * 将前面步骤读入的这些数字转换为整数（即，"123" -> 123， "0032" -> 32）。如果没有读入数字，则整数为 0 。必要时更改符号（从步骤 2 开始）。
> * 如果整数数超过 32 位有符号整数范围 [−231,  231 − 1] ，需要截断这个整数，使其保持在这个范围内。具体来说，小于 −231 的整数应该被固定为 −231 ，大于 231 − 1 的整数应该被固定为 231 − 1 。
> * 返回整数作为最终结果。
> 
> 注意：
> 
> 本题中的空白字符只包括空格字符 ' ' 。
> 
> 除前导空格或数字后的其余字符串外，请勿忽略 任何其他字符。
> 
> 来源：力扣（LeetCode）
> 
> 链接：https://leetcode-cn.com/problems/string-to-integer-atoi
> 
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法

在本题解法中，我们的确也发现了有直接根据题目所提出的条件，直接处理字符串的解法。比如先利用`trim()`函数去除最前面的空格，此后进行符号位的判断，然后循环向后解析数字。（示例代码可见文末）
虽然这样做非常直观，甚至能够达到比较好的时间复杂度表现，但是由于其糟糕的可读性，不仅会让我们在解题的过程中消耗很多的精力来排除其中因为复杂边界情况或状态转移引起的错误，而且最终写成的代码可读性不佳。
此外，如果本题进一步引入一些条件，如数字中也可能夹杂空格或其他字符但可以忽略、或者有一种特殊的符号`|`能够让其后一位的数字无效等要求，那么在上述代码基础上进行扩展将会变得非常具有挑战性。

因此我们可以从状态着手，分析出本题到底涉及多少种状态，再建立起他们之间的转换关系，来使得复杂的逻辑变得清晰。
针对本题，我们可以识别出如下四种状态：
* START：当我们尚未开始进行任何符号或者数字的处理时，处于START状态
* SIGNED：当我们遇到了第一个非空字符且为`+`或`-`号时，为SIGNED状态
* NUMBER：当我们从前述两种状态遇到了数字的时候，进入此状态，且会不断地向后尝试获取数字
* END：不符合上述的状态时，进入END状态

在上述状态的基础上我们也很快能够分析出他们之间的转移方式，如下图所示。

![状态转移图](/img/algo/state-transform-diagram.png){:height="75%" width="75%" }

当我们厘清了状态及其转移方式后，我们可以利用一个二维表来记录这个有向图。
每一行代表从行首的状态出发，在接收到了列首的字符后它将去到的状态，如下表所示。

|  | space | +/- | number | other |
|:--:|:--:|:--:|:--:|:--:|
| START | START | SIGNED | NUMBER | END |
| SIGNED | END | END | NUMBER | END |
| NUMBER | END | END | NUMBER | END |
| END | END | END | END | END| 

对应的程序如下所示，我们使用`enum State`来表示四种状态，在自动机中定义状态间的转换关系。
调用状态机的客户端只需要不断向状态机输入字符。
因为本题中在很多情形下并不需要遍历完整个字符串，便进入了`END`状态。
因此自动机提供了一个`end()`方法供客户端调用，从而可以在必要的时候尽早中断后续的无效输入，提升解题表现。

```java
class Solution {
    public int myAtoi(String s) {
        Automation automation = new Automation();
        for (int i = 0; i < s.length(); i++) {
            automation.get(s.charAt(i));
            if (automation.end()) return automation.currentRes();
        }
        return automation.currentRes();
    }
}

public class Automation {
        
    private static final Map<State, State[]> transform;
    private int signed;
    private long res;
    private boolean end;
    State state;
        
    static {
        transform = new HashMap();
        transform.put(State.START, new State[]{State.START, State.SIGNED, State.NUMBER, State.END});
        transform.put(State.SIGNED, new State[]{State.END, State.END, State.NUMBER, State.END});
        transform.put(State.NUMBER, new State[]{State.END, State.END, State.NUMBER, State.END});
        transform.put(State.END, new State[]{State.END, State.END, State.END, State.END});
    }

    public Automation() {
        signed = 1;
        res = 0;
        end = false;
        state = State.START;
    }

    public boolean end() {
        return end;
    }

    public int currentRes() {
        return (int)(signed * res);
    }

    public void get(char c) {
        state = nextState(state, c);
        if (state == State.SIGNED) {
            signed = c == '+' ? 1 : -1;
        } else if (state == State.NUMBER) {
            res = res * 10 + c - '0';
            res = signed > 0 ? Math.min((long)Integer.MAX_VALUE, res) : Math.min(-(long)Integer.MIN_VALUE, res);
        } else if (state == State.END) {
            end = true;
        }
    }

    private State nextState(State current, char input) {
        return transform.get(current)[getColumn(input)];
    }

    private int getColumn(char input) {
        if (input == ' ') {
            return 0;
        } else if (input == '+' || input == '-') {
            return 1;
        } else if (input >= '0' && input <= '9') {
            return 2;
        }
        return 3;
    }        
}

enum State {
    START, SIGNED, NUMBER, END
}
```

我们注意到上述解法最大的优势就是将**状态**与**状态转移**的代码分开，不再将它们混在在同一段`if-else`块中，从而达成解耦，提高可读性的同时降低程序的编写难度。

# 状态模式

本题的解题步骤也让我们很容易想起设计模式中的**状态模式**，它允许对象在内部状态改变的时候改变它的行为。
我们可以利用状态模式，对本题的解法进行改写，我们将字符的处理利用多态放到每个状态的内部。
让我们看看用状态模式可以写出怎样的长篇大论:)

![状态类图](/img/algo/state-pattern-UML.png){:height="75%" width="75%" }

```java
class Solution {
    public int myAtoi(String s) {
        Automation machine = new Automation();
        for (int i = 0; i < s.length(); i++) {
            machine.handle(s.charAt(i));
            if (machine.getState() instanceof EndState) return machine.getResult();
        }
        return machine.getResult();
    }
}

class Automation {
    private int number;
    private int signed;
    private State state;
    private final State startState;
    private final State signedState;
    private final State numberState;
    private final State endState;

    public Automation() {
        this.startState = new StartState(this);
        this.signedState = new SignedState(this);
        this.numberState = new NumberState(this);
        this.endState = new EndState(this);
        this.state = startState;
        this.number = 0;
        this.signed = 1;
    }

    public void handle(char c) {
        this.state.handle(c);
    }

    public int getResult() {
        return signed * number;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public int getSigned() {
        return signed;
    }

    public void setSigned(int signed) {
        this.signed = signed;
    }

    // States
    public void setState(State state) {
        this.state = state;
    }

    public State getState() {
        return state;
    }

    public State getStartState() {
        return startState;
    }

    public State getSignedState() {
        return signedState;
    }

    public State getNumberState() {
        return numberState;
    }

    public State getEndState() {
        return endState;
    }

}

abstract class State {
    Automation machine;

    public State(Automation machine) {
        this.machine = machine;
    }
    public abstract void handle(char c);
}

class StartState extends State {

    StartState(Automation machine) {
        super(machine);
    }

    @Override
    public void handle(char c) {
        InputType inputType = StateHelper.parseInput(c);
        if (inputType == InputType.SPACE) {
            return;
        } else if (inputType == InputType.OPERATOR) {
            machine.setState(machine.getSignedState());
            int signed = c == '+' ? 1 : -1;
            machine.setSigned(signed);
        } else if (inputType == InputType.NUMBER) {
            machine.setState(machine.getNumberState());
            machine.setNumber(c - '0');
        } else {
            machine.setState(machine.getEndState());
        }
    }
}

class SignedState extends State {
    
    SignedState(Automation machine) {
        super(machine);
    }
    
    @Override
    public void handle(char c) {
        InputType inputType = StateHelper.parseInput(c);
        if (inputType == InputType.SPACE) {
            machine.setState(machine.getEndState());
        } else if (inputType == InputType.OPERATOR) {
            machine.setState(machine.getEndState());
        } else if (inputType == InputType.NUMBER) {
            machine.setState(machine.getNumberState());
            machine.setNumber(c - '0');
        } else {
            machine.setState(machine.getEndState());
        }
    }
}

class NumberState extends State {
    
    NumberState(Automation machine) {
        super(machine);
    }
    
    @Override
    public void handle(char c) {
        InputType inputType = StateHelper.parseInput(c);
        if (inputType == InputType.SPACE) {
            machine.setState(machine.getEndState());
        } else if (inputType == InputType.OPERATOR) {
            machine.setState(machine.getEndState());
        } else if (inputType == InputType.NUMBER) {
            machine.setState(machine.getNumberState());
            int currNumber = machine.getNumber();
            int nextDigit = c - '0';
            if (machine.getSigned() > 0 && ((currNumber > Integer.MAX_VALUE / 10) || (currNumber == Integer.MAX_VALUE / 10 && nextDigit > Integer.MAX_VALUE % 10))) {
                machine.setNumber(Integer.MAX_VALUE);
                machine.setState(machine.getEndState());
            } else if (machine.getSigned() < 0 && ((currNumber > -(Integer.MIN_VALUE / 10)) || (currNumber == -(Integer.MIN_VALUE / 10) && nextDigit > -(Integer.MIN_VALUE % 10)))) {
                machine.setNumber(-Integer.MIN_VALUE);
                machine.setState(machine.getEndState());
            } else {
                currNumber = currNumber * 10 + nextDigit;
                machine.setNumber(currNumber);
            }
        } else {
            machine.setState(machine.getEndState());
        }
    }
}

class EndState extends State {

    EndState(Automation machine) {
        super(machine);
    }
    
    @Override
    public void handle(char c) {
        return;
    }
}

class StateHelper {
    public static InputType parseInput(char c) {
        if (c == ' ') return InputType.SPACE;
        if (c == '+' || c == '-') return InputType.OPERATOR;
        if (c >= '0' && c <= '9') return InputType.NUMBER;
        return InputType.OTHER;
    }
}

enum InputType {
    SPACE, OPERATOR, NUMBER, OTHER
}
```

# 附录

直接处理字符串解法（来自LeetCode)

```java
class Solution {
    public int myAtoi(String s) {

        if (Objects.isNull(s) || s.trim().length() == 0) {
            return 0;
        }

        s = s.trim();
        int index = 0;
        boolean positive = true;
        int result = 0;

        if (s.charAt(index) == '+') {
            ++index;
        }else if (s.charAt(index) == '-') {
            positive = false;
            ++index;
        }

        while (index < s.length()) {

            if (s.charAt(index) > '9' || s.charAt(index) < '0') {
                return positive ? result : -1 * result;
            } else if (result > Integer.MAX_VALUE / 10 || (result == Integer.MAX_VALUE / 10 && s.charAt(index) - '0' > Integer.MAX_VALUE % 10)) {
                return positive ? Integer.MAX_VALUE : Integer.MIN_VALUE;
            } else {
                result = result * 10 + s.charAt(index) - '0';
            }

            ++index;
        }

        return positive ? result : -1 * result;

    }
}
```